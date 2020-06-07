import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import MapAddress from './MapAddress';
const ScrollContainer = styled.ScrollView`
    flex:1;
`;
const Safe = styled.SafeAreaView`
    flex:1;
    background-color:#FFF;
`;
const KeyBordoSafeArea = styled.KeyboardAvoidingView`
    flex:1;
`;
const Container = styled.View`
    margin-top:${props=>props.Platform.OS == 'ios' ? '0px' : '15px'};
    padding:0px 15px;
    background-color:#FFF;
    margin-bottom:20px;
`;
const Title = styled.Text`
    color:#FFF;
`;
const ModalArea = styled.Modal`
    background-color:#FFF;
`;
const ModalAreaListUFView = styled.View`
    height:20px;
    background-color:#FF0000;
`;
const ModalAreaListUF = styled.Modal`
    height:200px;
    justify-content:center;
    background-color:#FF0000;
`;
const ModalTitle = styled.Text`
    font-size:10px;
    padding:0px;
    color:#CCC;
`;
const ButtonActionClose = styled.TouchableHighlight`
    height:30px;
    width:30px;
    border-radius:15px;
    background-color:#FF0000;
    justify-content:center;
    align-items:center;
`;

const ButtonActiveModal = styled.TouchableHighlight`
    height:30px;
    width:30px;
    border-radius:15px;
    background-color:#CCC;
    justify-content:center;
    align-items:center;
`;
const ModalNmDestinatarioArea = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
`;
const ModalTpEnderecoArea = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
`;
const ModalDsLogradouroArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;
const ModalDsLogradouroAreaText = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
    flex:1;
`;

const ModalNrNumeroAreaText = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
    margin-left:10px;
`;

const ModalNmEnderecoArea = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
`;
const TxtLogradouro = styled.TextInput`
    font-size:17px;
    margin-top:5px;
    color:#000;
    padding:0px;
    height:25px;
`;
const ModalDsCidadeDsBairroArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;
const ModalDsBairro = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
    flex:1;
`;
const ModalDsCidade = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
    margin-left:10px;
    flex:1;
`;
const ModalDsCEPCdUFArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;
const ModalDsCEPArea = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
    flex:1;
`;
const ModalCdUFArea = styled.View`
    justify-content:flex-end;
    height:50px;
    width:100px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    margin-left:10px;
    padding:5px 5px;
`;

const DataPicker = styled.Picker`
    color:#000;
    height:25px;
    width:100%;
    font-weight:bold;
    margin-left:-5px;
    font-size:24px;
    margin-bottom:15px;
    margin-top:5px;
`;

const DataPickerUF = styled.Picker`
    color:#000;
    height:25px;
    padding:0px;
    width:100%;
    font-size:17px;
    margin-top:5px;
    margin-bottom:-5px;
`;
const ButtonActionArea = styled.View`
    justify-content:center;
    align-items:center;
    margin-top:20px;
`;
const ButtonActionSalvar = styled.TouchableHighlight`
    height:40px;
    width:80%;
    border-radius:10px;
    background-color:#32CD32; 
    justify-content:center;
    align-items:center;
`;
const ButtonText = styled.Text`
    font-size:14px;
    color:#FFF;
    font-weight:bold;
`;
const ModalDsPontoDeReferenciaArea = styled.View`
    height:50px;
    border-bottom-width:0.5px;
    border-bottom-color:#FF0000;
    padding:5px 5px;
`;
const ModalAraButtonSelect = styled.View`
    height:50px;
    width:50px;

`;
const UpdateAddressModal = (props) => {
    const api = useSalatoDeliveryAPI();
    const [VisibleModalUF, setVisibleModalUF] = useState(false);
    const [DsLogradouro, setDsLogradouro] = useState(props.data.DsLogradouro);
    const [NrNumero, setNrNumero] = useState(props.data.NrNumero);
    const [DsBairro, setDsBairro] = useState(props.data.DsBairro);
    const [DsCidade, setDsCidade] = useState(props.data.DsCidade);
    const [DsCEP, setDsCEP] = useState(props.data.DsCEP);
    const [NmDestinatario, setNmDestinatario] = useState(props.data.NmDestinatario);
    const [DsPontoDeReferencia, setDsPontoDeReferencia] = useState(props.data.DsPontoDeReferencia);
    const [NmEndereco, setNmEndereco] = useState(props.data.NmEndereco);
    const [DsLatitude, setDsLatitude] = useState(props.data.Latitude);
    const [DsLongitude, setDsLongitude] = useState(props.data.Longitude);
    const [NrDistancia, setNrDistancia] = useState(props.data.Distancia);
    const [NrTempo, setNrTempo] = useState(props.data.Tempo);
    const [VlValor, setVlValor] = useState(props.data.Valor);
    const [CdUF, setCdUF] = useState(props.data.CdUF);
    const [geometry, setGeometry] = useState({});
    const [carregaLatLng, setcarregaLatLng] = useState(false);
    const [listUf, setListUF] = useState([{label:'AC', value:'AC'},
                                          {label:'AM', value:'AM'},
                                          {label:'RR', value:'RR'},
                                          {label:'PA', value:'PA'},
                                          {label:'AP', value:'AP'},
                                          {label:'TO', value:'TO'},
                                          {label:'MA', value:'MA'},
                                          {label:'PI', value:'PI'},
                                          {label:'CE', value:'CE'},
                                          {label:'RN', value:'RN'},                 
                                          {label:'PB', value:'PB'},
                                          {label:'PE', value:'PE'},
                                          {label:'AL', value:'AL'},
                                          {label:'SE', value:'SE'},
                                          {label:'BA', value:'BA'},
                                          {label:'MG', value:'MG'},
                                          {label:'ES', value:'ES'},
                                          {label:'RJ', value:'RJ'},
                                          {label:'SP', value:'SP'},
                                          {label:'PR', value:'PR'},
                                          {label:'SC', value:'SC'},
                                          {label:'RS', value:'RS'},
                                          {label:'MS', value:'MS'},
                                          {label:'MT', value:'MT'},
                                          {label:'GO', value:'GO'},
                                          {label:'DF', value:'DF'}]);
    const [TpEndereco, setTpEndereco] = useState(props.data.TpEndereco);
    const [listTpEndereco, setListTpEndereco] = useState([
                                                            {label:'Residencial', value:'Residencial'},
                                                            {label:'Comercial', value:'Comercial'},
                                                            {label:'Outros', value:'Outros'}
    ])

    const VerificaCampos = () =>{
        let r =  new Promise((resolve, reject) =>{
            if (!DsLogradouro){
                resolve(false);
            }else if(!NrNumero){
                resolve(false);
            }else if(!DsBairro){
                resolve(false);
            }else if(!DsCidade){
                resolve(false);
            }else if(!DsCEP){
                resolve(false);
            }else if(!CdUF){
                resolve(false);
            }else if(!DsPontoDeReferencia){
                resolve(false);
            }else{
                resolve(true);
            }
        })
        return r;
    }

    const HandleSalvar = () => {
        VerificaCampos().then((r) =>{
            if(!r){
                alert('Alguns campos nao podem ficar vazio, verifique (*)!!')
                return;
            }else{
                props.ActionUpdate(props.data.IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, props.data.StEntrega, 
                                   TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario, props.k, DsLatitude, DsLongitude, NrDistancia, NrTempo, VlValor);
                props.visibleAction(false);
            }
        })
    }

    useEffect(()=>{
        const getEndereco = async() =>{
            if (DsLogradouro !== ''){
                const end = await api.getPositionEndereco(`${DsLogradouro} ${NrNumero}, ${DsBairro} - ${DsCidade} ${CdUF} ${DsCEP}`);
                setcarregaLatLng(true);
                setGeometry(end.geometry.location);
            }
        }
        if (!carregaLatLng){
            if (DsLatitude !== null){
                setcarregaLatLng(true);
                setGeometry(
                    {"lat":parseFloat(DsLatitude), 
                    "lng":parseFloat(DsLongitude)});
            }else{
                getEndereco();
            }
        }else{
            getEndereco();
        }
       
    },[DsLogradouro, DsBairro, DsCidade, DsCEP, CdUF, NrNumero ])


    let TpEnderecoItems = listTpEndereco.map((v, k) => {
        return <DataPicker.Item key={k} value={k} label={v.label} />
    });
    let ListUFItems = listUf.map((v, k) => {
        return <DataPicker.Item key={k} value={k} label={v.label} />
    });
    return(
        <ModalArea 
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <Safe>
                <ScrollContainer>
                    <KeyBordoSafeArea>
                        <Container Platform={Platform}>
                            <ButtonActionClose onPress={()=>props.visibleAction(false)}>
                                <Title>X</Title>
                            </ButtonActionClose>
                            <ModalNmDestinatarioArea>
                                <ModalTitle>Quem Recebe</ModalTitle>
                                <TxtLogradouro value={NmDestinatario} onChangeText={(i)=>setNmDestinatario(i)}/>
                            </ModalNmDestinatarioArea>
                            <ModalTpEnderecoArea>
                                <ModalTitle>Tipo de Endereco</ModalTitle>
                                {Platform.OS === 'ios' ?
                                <RNPickerSelect
                                placeholder="Tipo de Endereco"
                                style={{...pickerSelectStyles}}
                                value={TpEndereco}
                                onValueChange={(value) => setTpEndereco(value)}
                                items={listTpEndereco}
                                Icon = {() => {return(
                                    <ModalAraButtonSelect
                                        name="caret-down"
                                        color={'black'}
                                        size={35}
                                        style={pickerSelectStyles.icon}
                                        backgroundColor="transparent"
                                        underlayColor="transparent"
                                    >
                                    </ModalAraButtonSelect>)}}
                                />
                                :
                                <DataPicker 
                                    selectedValue={TpEndereco == null ? 0 : parseInt(TpEndereco)}  
                                    pickerSelectStyles={false}
                                    onValueChange={(itemValue, ItemIndex) => {setTpEndereco(ItemIndex)}}>
                                        {TpEnderecoItems}
                                </DataPicker>}
                            </ModalTpEnderecoArea>
                            <ModalNmEnderecoArea>
                                <ModalTitle>Nome Endereco  ex:Minha casa, Casa da minha tia, Casa do meu irmao</ModalTitle>
                                <TxtLogradouro value={NmEndereco} onChangeText={(i)=>setNmEndereco(i)}/>
                            </ModalNmEnderecoArea>
                            <ModalDsLogradouroArea>
                                <ModalDsLogradouroAreaText>
                                    <ModalTitle>Logradouro (*)</ModalTitle>
                                    <TxtLogradouro value={DsLogradouro} onChangeText={(i)=>setDsLogradouro(i)}/>
                                </ModalDsLogradouroAreaText>
                                <ModalNrNumeroAreaText>
                                    <ModalTitle>Numero (*)</ModalTitle>
                                    <TxtLogradouro value={NrNumero} keyboardType="numeric" onChangeText={(i)=>setNrNumero(i)}/>
                                </ModalNrNumeroAreaText>
                            </ModalDsLogradouroArea>
                            <ModalDsCidadeDsBairroArea>
                                <ModalDsBairro>
                                    <ModalTitle>Bairro (*)</ModalTitle>
                                    <TxtLogradouro value={DsBairro} onChangeText={(i)=>setDsBairro(i)}/>
                                </ModalDsBairro>
                                <ModalDsCidade>
                                    <ModalTitle>Cidade (*)</ModalTitle>
                                    <TxtLogradouro value={DsCidade} onChangeText={(i)=>setDsCidade(i)}/>
                                </ModalDsCidade>
                            </ModalDsCidadeDsBairroArea>
                            <ModalDsCEPCdUFArea>
                                <ModalDsCEPArea>
                                    <ModalTitle>CEP (*)</ModalTitle>
                                    <TxtLogradouro value={DsCEP} keyboardType="numeric" onChangeText={(i)=>setDsCEP(i)}/>
                                </ModalDsCEPArea>
                                <ModalCdUFArea>
                                    <ModalTitle>UF (*)</ModalTitle>
                                        {Platform.OS === 'ios' ?
                                        <RNPickerSelect
                                        height={19}
                                        placeholder="selecion UF"
                                        style={{...pickerSelectStyles}}
                                        value={CdUF}
                                        onValueChange={(value) => setCdUF(value)}
                                        items={listUf}
                                        Icon = {() => {return(
                                            <ModalAraButtonSelect
                                                name="caret-down"
                                                color={'black'}
                                                size={35}
                                                style={pickerSelectStyles.icon}
                                                underlayColor="transparent"
                                            >
                                            </ModalAraButtonSelect>)}}
                                        />
                                        :
                                        <DataPickerUF 
                                            selectedValue={CdUF == null ? 0 : parseInt(CdUF)}  
                                            pickerSelectStyles={false}
                                            onValueChange={(itemValue, ItemIndex) => setCdUF(ItemIndex)}>
                                                {ListUFItems}
                                        </DataPickerUF>}
                                </ModalCdUFArea>
                            </ModalDsCEPCdUFArea>
                            <ModalDsPontoDeReferenciaArea>
                                <ModalTitle>Ponto de Referencia (*)</ModalTitle>
                                <TxtLogradouro value={DsPontoDeReferencia} onChangeText={(i)=>setDsPontoDeReferencia(i)}/>
                            </ModalDsPontoDeReferenciaArea>
                            <MapAddress 
                                geometry={geometry} 
                                carregaInfo={carregaLatLng} 
                                setLatitude={(e)=>setDsLatitude(e)}
                                setLongitude={(e)=>setDsLongitude(e)}
                                setDistancia={(e)=>setNrDistancia(e)}
                                setTempo={(e)=>setNrTempo(e)}
                                setValor={(e)=>setVlValor(e)}
                            />
                            <ButtonActionArea>
                                <ButtonActionSalvar onPress={()=>HandleSalvar()}>
                                    <ButtonText>Salvar</ButtonText>
                                </ButtonActionSalvar>
                            </ButtonActionArea>
                            
                        </Container>
                    </KeyBordoSafeArea>
                </ScrollContainer>
            </Safe>
        </ModalArea>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize:17,
      marginTop:5,
      borderRadius: 4,
      color:'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    icon:{
        position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#000',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 10,
		right: 15,
    },
});

export default UpdateAddressModal;