import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import BalonCaution from '../../components/BalonCaution';
import DatePicker from 'react-native-datepicker';
import AddressModal from '../../components/Address/AddressModal';
import { parseISO, format, formatRelative, formatDistance , parse} from 'date-fns';
import localeBR from 'date-fns/locale/en-CA';
  
import useSalatoDeliveryAPI, { BASEAPIIMAGE } from '../../useSalatoDeliveryAPI';
import {
    Safe,
    Container,
    HeaderTitle,
    ListItems,
    ScrolArea,
    HeaderArea,
    HeaderTotalArea,
    HeaderTotalPrice,
    HeaderTotalText,
    HeaderEnderecoArea,
    HeaderEnderecoText,
    HeaderEnderecoTitle,
    HeaderForma,
    HeaderEntrega,
    HeaderRetirada,
    BodyHeaderArea,
    HeaderImageProduto,
    HeaderNomeProduto,
    BodyArea,
    BodyInfoQtProdutoArea,
    BodyMin,
    BodyTxt,
    BodyQt,
    BodyAdd,
    BodyPriceUnitario,
    BodyPriceTotal,
    BodyActionRemove,
    BodyPriceImage,
    BottomActionContinuar,
    BottomActionText,
    Imagem,
    ButtonActionPagamento,
    TextoActionPagamento,
    HeaderEnderecoAction,
    HeaderEnderecoIcon,
    HeaderEnderecoAreaItem,
    HeaderEnderecoTextInput,
    HeaderEnderecoActionEditArea,
    HeaderEnderecoTextEdit,
    HeaderEnderecoTextEditArea,
    HeaderEnderecoAreaItemPreenchido,
    HeaderEnderecoTpEntregaText,
    HeaderAgendamentoArea,
    StAgendamento,
    AreaSangriaAgendamento,
    HeaderEnderecoBalon,
    HeaderEnderecoBalonTriangle,
    HeaderEnderecoBalonTriangleText,
    BottonCamera,
    ImageCamera,
    AreaCamera,
    TextCamera
} from './styled';
import { months } from 'moment';

let Timer;
const CarCompra = (props) =>{
    const api = useSalatoDeliveryAPI(props);
    const [VlTotalProdutos, setVlTotalProdutos] = useState(0);
    const [DescEndereco, setDescEndereco] = useState('');
    const [CEPEndereco, setCEPEndereco] = useState('');
    const [stLoading, setStLoading] = useState(true);
    const [activeAgendamento, setactiveAgendamento] = useState(false);
    const [activeButton, setactiveButton] = useState('Retirada');

    const [modalTitle, setModalTitle] = useState('digite seu endereco');
    const [modalVisible, setModalVisible] = useState(false);

    const [NewDate, setNewDate] = useState(new Date());

    const handleModalClick = (field, item) => {
        props.setVisibleBalon(field);
        props.setEndereco(item);
        setModalVisible(false)
    }

    const handleCurrentLocation = () => {
        /*Geolocation.getCurrentPosition(async(info) => {
            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);
            if (geo.results.length > 0){
                const loc = {address:geo.results[0].formatted_address};
                props.setEndereco(loc.address);
            }
        })*/

        setModalVisible(true);
    }

    const getFormadePagamento = async() =>{
        const json = await api.getFormaDePagamento(
            props.jwt,
            props.hash
        );
        if (!json.error){
            props.setListFormaDePagamento(json.FormaPagamento);
        }
    }

    const DeleteItem = (i,k) =>{
        props.delcarCompra({
            "key":k
        });
        UpdateCart();
        deleteCarCompra(i.IdProduto);
    }


    const IncCartQT = (i,k) => {
        props.incCarCompra({
            "key":k
        });
        UpdateCart();
        UpdateCarCompra(i.IdProduto, parseFloat(i.QtPedida));
    }

    const DecCartQT = (i,k) => {
        if (i.QtPedida > 1) {
            props.decCarCompra({
                "key":k
            })
        };
       
        UpdateCart();
        UpdateCarCompra(i.IdProduto, parseFloat(i.QtPedida));
    
    }

    const SomaValoresTotais = () => {
        let promise = new Promise((resolve, reject) =>{
            let v = 0;
            for (let i in props.ListCarCompra){
                v = v + parseFloat(props.ListCarCompra[i].VlTotal);
            }
            resolve(v);
        })
        return promise;
    }

    const SomaItensTotais = () => {
        let promise = new Promise((resolve, reject) =>{
            let q = 0;
            for (let i in props.ListCarCompra){
                q = q + parseFloat(props.ListCarCompra[i].QtPedida);
            }
            resolve(q);
        })
        return promise;
    }
    
    const UpdateCart = () =>{
    
        SomaItensTotais()
        .then((r) => {
            props.setQtProdutoCar(r);
            
        })

        SomaValoresTotais()
        .then((r) => {
            props.setVlTotalProduto(r);
        })   
    }

    const deleteCarCompra = async (tIdProduto) => {
        const json = await api.deleteCarCompra(
            props.jwt,
            props.hash,
            tIdProduto
        )
        return json;
    }

    const UpdateCarCompra = async (tIdProduto, tQtProduto) => {
    
        const json = await api.updateCarCompra(
            props.jwt,
            props.hash,
            tIdProduto,  
            tQtProduto
        );
        return json;
    }
    
    useEffect(()=>{
        UpdateCart();
        setStLoading(false);
    },[props.ListCarCompra]);

    useEffect(() =>{
        if (Timer){
            clearTimeout(Timer)
        }

        Timer = setTimeout(async()=>{
            if (CEPEndereco.length == 8 ){
                const json = await api.getEndereco(CEPEndereco);
                if (json.logradouro){
                    props.setEndereco(`${json.tipo_logradouro} ${json.logradouro} ` +
                    ` Bairro: ${json.bairro} Cidade: ${json.cidade} / UF:${json.uf} `);
                }else{
                    props.setEndereco('Cep nao encontrado!!')
                }
               
            }
        },1000)

    },[CEPEndereco])

    useEffect(() =>{
        props.setTpEntrega(activeButton);
    },[activeButton])

    useEffect(() => {
        getFormadePagamento();
    },[])


    return(
        <Safe>
            <ScrolArea>
                <HeaderArea>
                    <HeaderForma>
                        <HeaderEntrega active={activeButton == 'Entrega'} onPress={() => setactiveButton('Retirada')} underlayColor="transparent">
                            <HeaderTitle active={activeButton == 'Entrega'}>Entrega</HeaderTitle>
                        </HeaderEntrega>
                        <HeaderRetirada active={activeButton == 'Retirada'} onPress={() =>setactiveButton('Retirada')} underlayColor="transparent">
                            <HeaderTitle active={activeButton == 'Retirada'}>Retirada</HeaderTitle>
                        </HeaderRetirada>
                    </HeaderForma>
                    <HeaderTotalArea>
                        <HeaderTotalText>Total</HeaderTotalText>
                        <HeaderTotalPrice>R$ {parseFloat(props.VlTotalProduto).toFixed(2)}</HeaderTotalPrice>
                    </HeaderTotalArea>
                    <AddressModal  
                        title={modalTitle}
                        visible={modalVisible}
                        visibleAction={setModalVisible}
                        clickAction={handleModalClick}
                        visibleBalon={props.visibleBalon}
                    />
                    {props.TpEntrega == 'Entrega' &&  <HeaderEnderecoTpEntregaText>Endereço</HeaderEnderecoTpEntregaText>}
                    {props.TpEntrega == 'Entrega' &&
                        <HeaderEnderecoAreaItem>
                            <HeaderEnderecoArea> 
                                {props.visibleBalon &&  
                                    <BalonCaution active={props.visibleBalon}/>
                                }
                                <HeaderEnderecoTextInput>{props.Endereco}</HeaderEnderecoTextInput>
                            </HeaderEnderecoArea>
                            <HeaderEnderecoAction onPress={()=>handleCurrentLocation()} underlayColor="transparent" >
                                <HeaderEnderecoIcon source={require('../../assets/images/marker.png')}/>
                            </HeaderEnderecoAction>
                        </HeaderEnderecoAreaItem>
                    }  
                    <HeaderEnderecoTpEntregaText style={{color: activeAgendamento ? '#FF0000' : '#999'}}>Agendamento</HeaderEnderecoTpEntregaText>  
                    <HeaderAgendamentoArea>
                        <AreaSangriaAgendamento>
                        
                        </AreaSangriaAgendamento>
                        <DatePicker 
                            disabled={!activeAgendamento}
                            style={{width:'50%',border:0}}
                            date={NewDate}
                            locale='pt-br'
                            mode="datetime"
                            placeholder="agende um horario para entrega ou retirada"
                            format="DD/MM/YYYY hh:mm a"
                            confirmBtnText="Confirma"
                            cancelBtnText="Cancelar"
                            showIcon={false}
                            minDate={format(new Date(), 'dd/LL/yyyy hh:mm a')}
                            maxDate={format(new Date().setDate( new Date().getDate() + 2), 'dd/LL/yyyy 21:00')}
                            minuteInterval={30}
                            is24Hour={true}
                            maxHors='21:00'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    border:0,
                                    borderColor:'transparent',
                                    borderRadius:5,
                                    border:0,
                                
                                },
                                

                               
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(i) =>{
                                let s = parse(i,'dd/LL/yyyy hh:mm a', new Date(), localeBR);
                                setNewDate(s);
                            }}
                        />
                        <StAgendamento value={activeAgendamento} onValueChange={(i)=>setactiveAgendamento(i)}/>
                    </HeaderAgendamentoArea>
                </HeaderArea>
                {props.ListCarCompra.map((i,k) =>(
                    <Container key={i.IdCarrinhoDeCompra}>
                        <BodyHeaderArea>
                            <HeaderImageProduto source={{uri:BASEAPIIMAGE+i.LinckImage}}/>
                            <HeaderNomeProduto>{i.NmProduto}</HeaderNomeProduto>
                        </BodyHeaderArea>
                        <BodyArea>
                            <BodyInfoQtProdutoArea>
                                <BodyMin onPress={()=>DecCartQT(i,k)} underlayColor="#CCCCCC"> 
                                    <BodyTxt>-</BodyTxt>
                                </BodyMin>
                                    <BodyQt>{i.QtPedida}</BodyQt>
                                <BodyAdd onPress={()=>IncCartQT(i,k)} underlayColor="#CCCCCC"> 
                                    <BodyTxt>+</BodyTxt>
                                </BodyAdd>
                            </BodyInfoQtProdutoArea>
                            <BodyPriceUnitario>R$ {parseFloat(i.VlUnitario).toFixed(2)}</BodyPriceUnitario>
                            <BodyPriceTotal>R$ {parseFloat(i.VlTotal).toFixed(2)}</BodyPriceTotal>
                            <BodyActionRemove onPress={()=>DeleteItem(i,k)} underlaycolor="#FFFFFF">
                                <BodyPriceImage source={require('../../assets/images/trash.png')} underlaycolor="#FFFFFF"/>
                            </BodyActionRemove>
                        </BodyArea>
                    </Container>
                ))}
                <AreaCamera>
                    <BottonCamera underlayColor='#CCCCCC' onPress={()=>props.navigation.navigate('Camera')}>
                        <ImageCamera source={require('../../assets/images/apple-camera.png')}/>
                    </BottonCamera>
                    <TextCamera>Enviar Foto</TextCamera>
                </AreaCamera>
                <BottomActionContinuar onPress={()=>{
                    if (!props.visibleBalon){
                        props.navigation.navigate('Pagamento');   
                    }else{
                        alert('Voce precisa inserir um endereco antes de pagar!!');
                    }
                    }}>
                    <BottomActionText>Pagar agora</BottomActionText>
                </BottomActionContinuar>
            </ScrolArea>
            {stLoading &&
                <Loading />
            }
        </Safe>
    )
}

CarCompra.navigationOptions = ({navigation}) =>{
    return{
        headerShown:true,
        headerTitle:'Carrinho'
    }
}

const mapStateToProps = (state) => {
    return{
        ListCarCompra:state.carReducer.ListCarCompra,
        Endereco:state.carReducer.Endereco,
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
        RouteName:state.carReducer.RouteName,
        TpEntrega:state.carReducer.TpEntrega,
        VlTotalProduto:state.carReducer.VlTotalProduto,
        NmCategoria:state.carReducer.NmCategoria,
        IdCategoria:state.carReducer.IdCategoria,
        EnderecoAtivo:state.enderecoReducer.EnderecoAtivo,
        visibleBalon:state.enderecoReducer.visibleBalon
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        delcarCompra:(ListCarCompra)=>dispatch({type:'DELETE_LISTCARCOMPRA', payload:{ListCarCompra}}),
        setGeoLocation:(GeoEndereco)=>dispatch({type:'SET_GEOENDERECO', payload:{GeoEndereco}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        incCarCompra:(ListCarCompra)=>dispatch({type:'INCREMENT_LISTCARCOMPRA', payload:{ListCarCompra}}),
        decCarCompra:(ListCarCompra)=>dispatch({type:'DECREMENT_LISTCARCOMPRA', payload:{ListCarCompra}}),
        setQtProdutoCar:(QtProdutoCar)=>dispatch({type:'SET_QTPRODUTOCAR', payload:{QtProdutoCar}}),
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setTpEntrega:(TpEntrega)=>dispatch({type:'SET_TPENTREGA', payload:{TpEntrega}}),
        setVlTotalProduto:(VlTotalProduto)=>dispatch({type:'SET_VLTOTALPRODUTOS', payload:{VlTotalProduto}}),
        setListFormaDePagamento:(ListFormaDePagamento)=>dispatch({type:'SET_LISTFORMADEPAGAMENTO', payload:{ListFormaDePagamento}}),
        setVisibleBalon:(visibleBalon)=>dispatch({type:'SET_VISIBLEBALON', payload:{visibleBalon}})

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CarCompra);