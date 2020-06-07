import React , { useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import Loading from '../../components/Loading';
import {
    Scrol,
    AreaSafe,
    Container,
    AreaTopoEnd,
    Body,
    TxtTopo,
    AreaDatePicker,
    AreaPicker,
    TextInf,
    Input,
    DataPicker,
    AreaPickerItems,
    AreaButton,
    ButtonSalvar,
    TxtSalvar
} from './styled';

const ContaItem = (props) => {
    const [DtNascimento, setDtNascimento] = useState(props.infoUsuario.InfoUsuario[0].DtNascimento);
    const [sexo, setsexo] = useState(0);
    const [sexos, setsexos] = useState([
                                        {nome:'', id:0},
                                        {nome:'Sexo Masculino', id:1},
                                        {nome:'Sexo Feminino', id:2},
                                        {nome:'Outros', id:3}
                                        ]);

    const [EstadoCivil, setEstadoCivil] = useState(0);
    const [EstadoCivis, setEstadoCivis] = useState([
                                                    {nome:'', id:0},
                                                    {nome:'Solteiro', id:1},
                                                    {nome:'Casado', id:2},
                                                    {nome:'Desquitado', id:3},
                                                    {nome:'Viuvo', id:4},
                                                    {nome:'União Estavel', id:5},
                                                    {nome:'Outros', id:6}
                                                    ]);
                                                    
    useEffect(() =>{
        
    },[]);
    let sexoItens = sexos.map((v, k) =>{
        return <DataPicker.Item  key={k} value={k} label={v.nome} />
    });
    let EstadoCivilItens = EstadoCivis.map((v, k) => {
        return <DataPicker.Item key={k} value={k} label={v.nome} />
    });
    return(
        <AreaSafe>
            <Scrol>
                <Container>
                    <Body>
                        <TextInf>Nome:</TextInf>   
                        <Input value={props.infoUsuario.InfoUsuario[0].NmPessoa} onChangeText={(n) => props.editNmPessoa(n)}/>
                        <TextInf>CPF:</TextInf> 
                        <TextInputMask 
                            //ref={ref => (_myTextInputMask = ref)}
                            type={'datetime'}
                            options={{
                                format: '999.999.999-99'
                            }}
                            value={props.infoUsuario.InfoUsuario[0].CdCPF_CNPJ}
                            // don't forget: the value and state!
                            onChangeText={(v)=>props.editCPF(v)} 
                            style={Styles.Input}
                        />
                        <TextInf>RG:</TextInf>
                        <TextInputMask 
                            //ref={ref => (_myTextInputMask = ref)}
                            type={'datetime'}
                            options={{
                                format:'99.999.999-9'
                            }}
                            value={props.infoUsuario.InfoUsuario[0].NrIdentidade}
                            // don't forget: the value and state!
                            onChangeText={(v)=>{props.editRG(v)}}
                            //value={}
                            style={Styles.Input}
                        />
                        <TextInf>Telefone:</TextInf> 
                        <TextInputMask 
                            //ref={ref => (_myTextInputMask = ref)}
                            type={'datetime'}
                            options={{
                                format: '(99) 99999-9999'
                            }}
                            value={props.infoUsuario.InfoUsuario[0].DsTeleFoneCobranca}
                            // don't forget: the value and state!
                            onChangeText={(v)=>props.editDsTeleFoneCobranca(v)} 
                            style={Styles.Input}
                        />
                        <AreaDatePicker>
                            <TextInf>Data de Nascimento:</TextInf>
                            <DatePicker 
                                style={Styles.TxtDatas} 
                                date={DtNascimento} 
                                mode="date" 
                                format="DD/MM/YYYY"  
                                confirmBtnText="Confirma"
                                cancelBtnText="Cancelar"
                                onDateChange={(v) => {
                                FormataDt(v,'/');
                            }} placeholder='toque para selecionar data'/>
                        </AreaDatePicker>
                        <AreaPickerItems>
                            <AreaPicker>
                                <TextInf style={{marginLeft:0}}>Sexo:</TextInf>
                                <RNPickerSelect selectedValue={props.infoUsuario.InfoUsuario[0].TpSexo == null ? 0 : parseInt(props.infoUsuario.InfoUsuario[0].TpSexo)}  onValueChange={(itemValue, ItemIndex) => {props.editTpSexo(ItemIndex)}}>
                                    {sexoItens}
                                </RNPickerSelect>
                            </AreaPicker>
                            <AreaPicker>
                                <TextInf style={{marginLeft:0}}>Estado Civil:</TextInf>
                                <RNPickerSelect selectedValue={EstadoCivil} onValueChange={(itemValue, ItemIndex) => {setTpEstado(ItemIndex)}}>
                                    {EstadoCivilItens}
                                </RNPickerSelect>
                            </AreaPicker>
                        </AreaPickerItems>
                    </Body>
                    <AreaButton>
                        <ButtonSalvar underlayColor='#CCCCCC' onPress={()=>{
                            props.editloanding(true);
                            props.updateUsuario(props.infoUsuario.InfoUsuario[0].NmPessoa,
                                                props.infoUsuario.InfoUsuario[0].CdCPF_CNPJ,
                                                props.infoUsuario.InfoUsuario[0].NrIdentidade,
                                                props.infoUsuario.InfoUsuario[0].DsTeleFoneCobranca,
                                                DtNascimento == null ? null: FormataDt(DtNascimento, '/'),
                                                props.infoUsuario.InfoUsuario[0].TpEstadoCivil,
                                                props.infoUsuario.InfoUsuario[0].TpSexo);
                        }}>
                            <TxtSalvar >Salvar</TxtSalvar>
                        </ButtonSalvar>
                    </AreaButton>
                </Container>
            </Scrol>
        </AreaSafe>
    )
}

ContaItem.navigationOptions = () =>{
    return{
        headerTitle:'Perfil'
    }
}
const Styles = StyleSheet.create({
    Input:{
        height:30,
        marginRight:10,
        marginLeft:10,
		backgroundColor:'#DDDDDD',
		fontSize:14,
		padding:2,
		backgroundColor:'transparent',
		borderBottomColor:'#CCCCCC',
		borderBottomWidth:1,
		paddingLeft:10
    },
    TxtDatas:{
        width:'100%',
		color:'#FFFF00',
        paddingLeft:10,
        marginTop:5
    },
    PickerSexo:{
        fontSize:10,
        color:'#CCCCCC',
        padding:0,
        height:30,
        marginTop:9
    },
})

const mapStateToProps = (state) => {
	return {
        infoUsuario:state.userReducer.infoUsuario
	};
};

const mapDispatchToProps = (dispatch) => {
    return{
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContaItem);