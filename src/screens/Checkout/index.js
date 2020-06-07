import React, { useEffect, useState } from 'react';
import useSalatoDeliveryAPI, { BASEAPIIMAGE } from '../../useSalatoDeliveryAPI';
import { connect } from 'react-redux';
import {
    Safe,
    KeyBord,
    Title,
    BodyActionsArea,
    BodyAdd,
    BodyAddCarCompra,
    BodyArea,
    BodyCamCarCompra,
    BodyCarTxt,
    BodyImage,
    BodyInfoDetails,
    BodyInfoNmProduto,
    BodyInfoPrice,
    BodyInfoQtProdutoArea,
    BodyMin,
    BodyNmProduto,
    BodyQt,
    BodyTxt,
    BodyCanTxt,
    BodyInfoDsProduto,
    BodyTxtDsProduto,
    Scroll
} from './styled';

const Checkout = (props) =>{
    const api = useSalatoDeliveryAPI(props);
    const [carCompra, setCarCompra] = useState([]);
    const [qtProduto, setQtProduto] = useState(1);

    const decQt = () =>{
        if (qtProduto > 1){
            let q = qtProduto;
            q--;
            setQtProduto(q);
        }
    }

    const incQt = () =>{
        let q = qtProduto;
        q++;
        setQtProduto(q);
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

    const InsertCarCompra = async (idProduto, qtProduto) => {
        
        const json = await api.insertCarCompra(
            props.jwt,
            props.hash,
            idProduto,  
            qtProduto
        );
        return json;
    }
    const addCarCompra = () =>{
        let VlPrecoFinal  = 0;
        VlPrecoFinal = qtProduto * props.VlProduto;
        let key = props.ListCarCompra.findIndex((item) =>item.IdProduto == props.IdProduto);
        if (key > -1){
            let Qt = parseFloat(props.ListCarCompra[key].QtPedida) + parseFloat(qtProduto);
            let VlTotal = Qt * props.ListCarCompra[key].VlUnitario;

            props.changecarCompra({
                "IdProduto":props.IdProduto,  
                "NmProduto":props.NmProduto, 
                "LinckImage":props.LinkImage, 
                "QtPedida":Qt, 
                "VlUnitario":props.VlProduto, 
                "VlTotal":VlTotal,
                "key":key
            })
            UpdateCarCompra(props.ListCarCompra[key].IdProduto, parseFloat(props.ListCarCompra[key].QtPedida));
        }else{
            
            props.pushcarCompra({ 
                "IdProduto":props.IdProduto,  
                "NmProduto":props.NmProduto, 
                "LinckImage":props.LinkImage, 
                "QtPedida":qtProduto, 
                "VlUnitario":props.VlProduto, 
                "VlTotal":VlPrecoFinal});
            InsertCarCompra(props.IdProduto, qtProduto);
        }
        props.navigation.navigate('Search');
        props.navigation.navigate('CarCompra');
    }
    return(
        <Safe>
            <Scroll>
                <BodyArea>
                    <BodyImage source={{uri:BASEAPIIMAGE+props.LinkImage}}/>
                    <BodyInfoNmProduto>
                        <BodyNmProduto>{props.NmProduto}</BodyNmProduto>
                    </BodyInfoNmProduto>
                    <BodyInfoDetails>
                        <BodyInfoPrice>R$ {parseFloat(props.VlProduto).toFixed(2)}</BodyInfoPrice>
                        <BodyInfoQtProdutoArea>
                            <BodyMin onPress={decQt} underlayColor="transparent"> 
                                <BodyTxt>-</BodyTxt>
                            </BodyMin>
                                <BodyQt>{qtProduto}</BodyQt>
                            <BodyAdd onPress={incQt} underlayColor="transparent"> 
                                <BodyTxt>+</BodyTxt>
                            </BodyAdd>
                        </BodyInfoQtProdutoArea>
                    </BodyInfoDetails>
                    <BodyInfoDsProduto>
                        <BodyTxtDsProduto>{props.DsProdutoSite}</BodyTxtDsProduto>
                    </BodyInfoDsProduto>
                    <BodyActionsArea>
                        <BodyAddCarCompra onPress={()=>addCarCompra()}>
                            <BodyCarTxt>Adicionar ao carrinho</BodyCarTxt>
                        </BodyAddCarCompra>
                        <BodyCamCarCompra onPress={()=>props.navigation.goBack()} underlayColor="transparent">
                            <BodyCanTxt>Cancelar</BodyCanTxt>
                        </BodyCamCarCompra>
                    </BodyActionsArea>
                </BodyArea>
            </Scroll>
        </Safe>
    )
}

Checkout.navigationOptions = () =>{
    return{
        headerShown:true,
        headerTitle:'Checkout',
        headerBackTitle:'Back'
    }
}

const MapStateToProps = (state) => {
    return{
        NmProduto:state.carReducer.NmProduto,
        VlProduto:state.carReducer.VlProduto,
        IdProduto:state.carReducer.IdProduto,
        LinkImage:state.carReducer.LinkImage,
        DsProdutoSite:state.carReducer.DsProdutoSite,
        ListCarCompra:state.carReducer.ListCarCompra,
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setcarCompra:(ListCarCompra)=>dispatch({type:'SET_LISTCARCOMPRA', payload:{ListCarCompra}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        pushcarCompra:(ListCarCompra)=>dispatch({type:'PUSH_LISTCARCOMPRA', payload:{ListCarCompra}}),
        changecarCompra:(ListCarCompra)=>dispatch({type:'CHANGE_LISTCARCOMPRA', payload:{ListCarCompra}})
    }
}


export default connect(MapStateToProps, mapDispatchToProps)(Checkout);