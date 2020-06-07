import React,{ useState, useEffect, useRef } from 'react';
import { Platform, Picker, StyleSheet } from 'react-native'
import styled from 'styled-components/native';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import RNPickerSelect from 'react-native-picker-select';
import MapAddress from './MapAddress';
import Loading from '../Loading';
import { CEPMask } from '../Mask';
const ScroollContainer = styled.ScrollView`
    margin-bottom:20px;
    flex:1;
`;
const Safe = styled.SafeAreaView`
    flex:1;
    background-color:#FFF;
`;
const KeyBordoSafeArea = styled.KeyboardAvoidingView`

`;
const Container = styled.View`
    margin-top:${props=>props.Platform.OS == 'ios' ? '0px' : '10px'};
    padding:0px 15px;
    background-color:#FFF;
`;
const ModalArea = styled.Modal`
    background-color:#FFF;
`;
const Title = styled.Text`
    color:#FFF;
    font-weight:bold;
`;

const ButtonActionClose = styled.TouchableHighlight`
    height:30px;
    width:30px;
    border-radius:15px;
    background-color:#FF0000;
    justify-content:center;
    align-items:center;
`;

const HeaderArea = styled.View`
    height:40px;
    flex-direction:row;
    align-items:center;
`;
const HeaderTextInputSearch = styled.TextInput`
    height:35px;
    width:90%;
    background-color:#EEE;
    margin:0px 10px;
    padding:5px 15px; 
    border-radius:5px;
    color:#000;
`; 
const ModalTitle = styled.Text`
    background-color:transparent;
    font-size:10px;
    color:#CCC;
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
let timer;
let timerMap;
const InsertAddressModal = (props) => {
    const api = useSalatoDeliveryAPI(props);
    const [loading, setLoading] = useState(false);
    const [TpEndereco, setTpEndereco] = useState('');
    const [NmDestinatario, setNmDestinatario] = useState('');
    const [DsLogradouro, setDsLogradouro] = useState('');
    const [NrNumero, setNrNumero] = useState(0);
    const [DsBairro, setDsBairro] = useState('');
    const [DsCidade, setDsCidade] = useState('');
    const [DsCEP, setDsCEP] = useState('');
    const [CdUF, setCdUF] = useState('');
    const [CEPEndereco, setCEPEndereco] = useState('');
    const [DsLatitude, setDsLatitude] = useState('');
    const [DsLongitude, setDsLongitude] = useState('');
    const [NrDistancia, setNrDistancia] = useState(0);
    const [NrTempo, setNrTempo] = useState(0);
    const [VlValor, setVlValor] = useState(0);
    const [DsPontoDeReferencia, setDsPontoDeReferencia] = useState();
    const [NmEndereco, setNmEndereco] = useState();
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
                props.ActionInsertClick(DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, TpEndereco,
                                        NmEndereco, DsPontoDeReferencia, NmDestinatario, DsLatitude, DsLongitude, NrDistancia, NrTempo, VlValor);
                props.visibleAction(false);
                LimpaCampos();
            }
        })
    }
    
    useEffect(() =>{
        if (timer){
            clearTimeout(timer)
        }

        timer = setTimeout(async()=>{
            if (CEPEndereco.length >= 10 ){
                setLoading(true);
                const json = await api.getEnderecoCEP(CEPEndereco);
                if (json.logradouro){
                    setDsLogradouro(`${json.tipo_logradouro} ${json.logradouro} `);
                    setDsBairro(json.bairro);
                    setDsCidade(json.cidade);
                    setDsCEP(CEPEndereco);
                    if (Platform.OS == 'ios'){
                        setCdUF(json.uf)
                    }else{
                        let key = listUf.findIndex((i)=> i.value == json.uf)
                        setCdUF(key);
                    }
                    
                }else{
                    setCEPEndereco('Cep nao encontrado!!');
                    setLoading(false);
                }
            }
        },1000)

    },[CEPEndereco]);

    useEffect(()=>{
        if (timerMap){
            clearTimeout(timerMap);
        }

        setTimeout(async()=>{
            if (DsLogradouro !== ''){
                const end = await api.getPositionEndereco(`${DsLogradouro} ${NrNumero}, ${DsBairro} - ${DsCidade} ${CdUF} ${DsCEP}`);
                setcarregaLatLng(true);
                setGeometry(end.geometry.location);
                setLoading(false);
            }
        },1000)
        

    },[DsLogradouro, DsBairro, DsCidade, DsCEP, CdUF, NrNumero ])
    
    useEffect(()=>{
        if (props.StGeolocation){
            setDsLogradouro(props.data[0]);
            setNrNumero(props.data[1]);
            setDsBairro(props.data[2]);
            setDsCidade(props.data[3]);
            setDsCEP(props.data[5]);
            setCdUF(props.data[4]);
        }
    },[props.StGeolocation]);

    useEffect(()=>{
        if (Platform.OS == 'android'){
            let arrUF = listUf;
            let arrTpEndereco = listTpEndereco;

            arrUF.unshift({label:'',value:''});
            arrTpEndereco.unshift({label:'', value:''}); 

            setCdUF(arrUF);
            setTpEndereco(arrTpEndereco);
        }

    },[])

    const LimpaCampos = () =>{ 
        setTpEndereco('')
        setNmDestinatario('')
        setDsLogradouro('')
        setNrNumero('')
        setDsBairro('')
        setDsCidade('')
        setDsCEP('')
        setCdUF('')
        setCEPEndereco('')
        setDsPontoDeReferencia('')
        setNmEndereco('');
        setcarregaLatLng(false);
        setGeometry({});

    }

    let TpEnderecoItems = listTpEndereco.map((v, k) => {
        return <Picker.Item key={k} value={k} label={v.label} />
    });
    let ListUFItems = listUf.map((v, k) => {
        return <Picker.Item key={k} value={k} label={v.label} />
    });
    return(
        <ModalArea 
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >   
            <Safe>
                <ScroollContainer>
                    <KeyBordoSafeArea>
                        <Container Platform={Platform}>
                            <HeaderArea>
                                <ButtonActionClose onPress={()=>{
                                    LimpaCampos();
                                    props.visibleAction(false);
                                }}>
                                    <Title>X</Title>
                                </ButtonActionClose>
                                <HeaderTextInputSearch value={CEPEndereco} keyboardType="numeric" onChangeText={(i)=>setCEPEndereco(CEPMask(i))} autoFocus={true} placeholder="Digite um CEP ou insira manualmente" placeholderTextColor='#999'/>
                            </HeaderArea>
                            <ModalNmDestinatarioArea>
                                <ModalTitle>Quem Recebe</ModalTitle>
                                <TxtLogradouro value={NmDestinatario} onChangeText={(i)=>setNmDestinatario(i)}/>
                            </ModalNmDestinatarioArea>
                            <ModalTpEnderecoArea>
                                <ModalTitle>Tipo de Endereco</ModalTitle>
                                {Platform.OS == 'ios' ? 
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
                                    pickerSelectStyles={true}
                                    onValueChange={(itemValue, ItemIndex) => {setTpEndereco(itemValue)}}>
                                        {TpEnderecoItems}
                                </DataPicker>}
                            </ModalTpEnderecoArea>
                            <ModalNmEnderecoArea>
                                <ModalTitle>Nome Endereco  ex: Casa da minha tia, Casa do meu irmao</ModalTitle>
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
                                    <TxtLogradouro value={DsCEP} keyboardType="numeric" onChangeText={(i)=>setDsCEP(CEPMask(i))}/>
                                </ModalDsCEPArea>
                                <ModalCdUFArea>
                                    <ModalTitle>UF (*)</ModalTitle>
                                    {Platform.OS == 'ios' ?
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
                                            pickerSelectStyles={true}
                                            onValueChange={(itemValue, ItemIndex) => {setCdUF(itemValue)}}>
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
                </ScroollContainer>
                {loading &&  <Loading background='#000'/>}
            </Safe>
        </ModalArea>
    )       

}

export default InsertAddressModal;

const pickerSelectStylesAndroid = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      }, 
})

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
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    }, 
})