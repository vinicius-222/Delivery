import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker';
import { parseISO, format, formatRelative, formatDistance , parse} from 'date-fns';
import { connect } from 'react-redux';
import localeBR from 'date-fns/locale/en-CA';
import useSalatoDelivery from '../../useSalatoDeliveryAPI';
import { TELMask, CELMask, cpfMask, rgMask, RemoveSinaisGraficos } from '../../components/Mask'
import { Header } from 'react-navigation-stack';
import {
    SafeArea,
    KeyBordAvoidView,
    Container,
    AreaCampos,
    TitleCampos,
    InputCampos,
    AreaButtons,
    ButtonSexo,
    TitleButton,
    ButtonEstadoCivil,
    AreaButtonSalvar,
    ButtonSalvar,
    ScrollArea
} from './styled';

const Conta = (props) =>{
    const api = useSalatoDelivery();
    const [DtAniversario, setDtAniversario] = useState(new Date());
    const [sexo, setsexo] = useState(props.infoUsuario[0].TpSexo == null ? '' : props.infoUsuario[0].TpSexo);
    const [sexos, setsexos] = useState([{nome:'Sexo Masculino', id:1},
                                        {nome:'Sexo Feminino', id:2},
                                        {nome:'Outros', id:3}]);
    const [EstadoCivil, setEstadoCivil] = useState(props.infoUsuario[0].TpEstadoCivil == null ? '' : props.infoUsuario[0].TpEstadoCivil);
    const [EstadoCivis, setEstadoCivis] = useState([{nome:'Solteiro', id:'S'},
                                                    {nome:'Casado', id:'C'},
                                                    {nome:'Desquitado', id:'D'},
                                                    {nome:'Viuvo', id:'V'},
                                                    {nome:'União Estavel', id:'U'},
                                                    {nome:'Outros', id:'O'}]);
    const [NrTelefone, setNrTelefone] = useState(TELMask(props.infoUsuario[0].DsTeleFoneCobranca == null ? '' : props.infoUsuario[0].DsTeleFoneCobranca));
    const [NrCelular, setNrCelular] = useState(CELMask(props.infoUsuario[0].DsFaxCobranca == null ? '' : props.infoUsuario[0].DsFaxCobranca));
    const [NrCPF, setNrCPF] = useState(cpfMask(props.infoUsuario[0].CdCPF_CNPJ == null ? '' : props.infoUsuario[0].CdCPF_CNPJ));
    const [NrRG, setNrRG] = useState(rgMask(props.infoUsuario[0].NrIdentidade == null ? '' : props.infoUsuario[0].NrIdentidade));
    const [NmPessoa, setNmPessoa] = useState(props.infoUsuario[0].NmPessoa == null ? '' : props.infoUsuario[0].NmPessoa);

    const formatedDt = () =>{
        /*let s = new Date('2020-05-01');
        let f = format(s, 'dd/LL/yyyy');
        console.log(f);*/
        if (props.infoUsuario[0].DtNascimento !== null){
            const date = props.infoUsuario[0].DtNascimento;
            const parsedDate = parseISO(date);  
            let formated = format(parsedDate, 'dd/LL/yyyy'); 
            setDtAniversario(parsedDate);
        } 
       
    }

    const updateClienteDelivery = async() => {
        const json = await api.updateClienteDelivery(
            props.jwt,
            props.hash,
            props.infoUsuario[0].CdChamada,
            NmPessoa,
            NrCPF,
            NrTelefone,
            NrCelular,
            DtAniversario,
            EstadoCivil,
            NrRG,
            sexo
        )
       if (!json.error){
            getInfoUsuario();
            alert(json.Cliente);
            props.navigation.goBack();
       }
    }

    const getInfoUsuario = async () =>{
        const json = await api.getClienteDelivery(props.jwt, props.hash);
        props.setInfoUsuario(json.Cliente);
    }     


    useEffect(()=>{
        formatedDt();
    },[])
    return(
        <SafeArea>
            <KeyBordAvoidView behavior={Platform.OS === 'ios'?'padding':null} keyboardVerticalOffset = {Header.HEIGHT + 30}>
                <ScrollArea>
                <Container>
                    <AreaCampos>
                        <TitleCampos>Nome</TitleCampos>
                        <InputCampos 
                            value={NmPessoa}
                            onChangeText={(e)=>setNmPessoa(e)}
                        />
                    </AreaCampos>
                    <AreaCampos>
                        <TitleCampos>CPF</TitleCampos>
                        <InputCampos
                            value={cpfMask(NrCPF)}
                            keyboardType="numeric"
                            onChangeText={(e)=>{
                                let d = e;
                                setNrCPF(RemoveSinaisGraficos(e))}
                            }
                        />
                    </AreaCampos>
                    <AreaCampos>
                        <TitleCampos>RG</TitleCampos>
                        <InputCampos 
                            value={rgMask(NrRG)}
                            keyboardType="numeric"
                            onChangeText={(e)=>setNrRG(RemoveSinaisGraficos(e))}
                        />
                    </AreaCampos>
                    <AreaCampos>
                        <TitleCampos>Telefone</TitleCampos>
                        <InputCampos 
                            value={TELMask(NrTelefone)}
                            keyboardType="phone-pad"
                            onChangeText={(e)=>{setNrTelefone(RemoveSinaisGraficos(e))}}
                        />
                    </AreaCampos>
                    <AreaCampos>
                        <TitleCampos>Celular</TitleCampos>
                        <InputCampos 
                            value={CELMask(NrCelular)}
                            keyboardType="phone-pad"
                            onChangeText={(e)=>setNrCelular(RemoveSinaisGraficos(e))}
                        />
                    </AreaCampos>
                    <AreaCampos style={{height:50}}>
                        <TitleCampos>Data Nascimento</TitleCampos>
                        <DatePicker 
                            style={{width:'100%',fontSize:18,}}
                            locale='pt-br'
                            date={DtAniversario}
                            mode="date"
                            placeholder="Clique para Adiconar"
                            format="DD/MM/YYYY"
                            confirmBtnText="Confirma"
                            cancelBtnText="Cancelar"
                            showIcon={true}
                            customStyles={{
                                dateIcon: {
                                    position:'absolute',
                                    right:0,
                                    top: 4,
                                    marginRight:0
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    border:0,
                                    borderColor:'transparent',
                                    borderRadius:5,
                                    border:0,                                
                                },
                                dateText:{
                                    fontSize:18,
                                    fontWeight:'400'
                                }
                            }}
                            onDateChange={(i) =>{
                                let s = parse(i,'dd/LL/yyyy', new Date(), localeBR);
                                setDtAniversario(s);
                            }}
                        />
                    </AreaCampos>
                    <AreaCampos style={{height:55}}>
                        <TitleCampos>Sexo</TitleCampos>
                        <AreaButtons>
                            {sexos.map((i,k)=>(
                                <ButtonSexo active={i.id == sexo} key={k} onPress={()=>setsexo(i.id)}>
                                    <TitleButton>{i.nome}</TitleButton>
                                </ButtonSexo>
                            ))}
                        </AreaButtons>
                    </AreaCampos>
                    <AreaCampos style={{height:95}}>
                        <TitleCampos>Estado Civil</TitleCampos>
                        <AreaButtons>
                            {EstadoCivis.map((i,k)=>(
                                <ButtonEstadoCivil active={i.id == EstadoCivil} key={k} onPress={()=>setEstadoCivil(i.id)}>
                                    <TitleButton>{i.nome}</TitleButton>
                                </ButtonEstadoCivil>
                            ))}
                        </AreaButtons>
                    </AreaCampos>
                    <AreaButtonSalvar>
                        <ButtonSalvar onPress={()=>updateClienteDelivery()}>
                            <TitleButton style={{fontSize:20}}>Salvar</TitleButton>
                        </ButtonSalvar>
                    </AreaButtonSalvar>
                </Container>
                </ScrollArea>
            </KeyBordAvoidView>
        </SafeArea>
    )
}

Conta.navigationOptions = ()=>{
    return{
        headerShown:true,
        headerTitle:'Perfil',
        gesturesEnabled:true
    }
}

const mapStateToProps = (state) =>{
    return{
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
        infoUsuario:state.userReducer.infoUsuario,
    }
}
 
const mapDispatchToProps = (dispatch) =>{
    return{
        setInfoUsuario:(infoUsuario)=>dispatch({type:'SET_INFOUSUARIO', payload:{infoUsuario}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Conta);