import React, { useState, useEffect} from 'react';
import { Header } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { format, parseISO} from 'date-fns';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import {
    SafeArea,
    KeyBordArea,
    ScrollArea,
    ContainerArea,
    AreaPedido,
    AreaTitle,
    Title,
    Detail,
    TitleTpPedido
} from './styled';


const Pedidos = (props) => {
    const API = useSalatoDeliveryAPI();
    const [pedidoDelivery, setPedidoDelivery] = useState([]);

    const formated = (dt) =>{
        let date =parseISO(dt); 
        return format(date, 'dd/LL/yyyy')
    }
    useEffect(()=> {

        const getPedidoDelivery = async() =>{
            const json = await API.getPedidosDelivery(
                props.jwt,
                props.hash
            )
            setPedidoDelivery(json.Pedidos);
        }

        getPedidoDelivery();

    },[])
    return(
        <SafeArea behavior={Platform.OS === 'ios'?'padding':null} keyboardVerticalOffset = {Header.HEIGHT + 30}>
            <KeyBordArea>
                <ScrollArea>
                    <ContainerArea>
                        {pedidoDelivery.map((i,k)=>
                            <AreaPedido key={k}>
                                <AreaTitle>
                                    <Title>{formated(i.DtPedido)}</Title>
                                    <TitleTpPedido active={i.TpPedido == 'T'}>{i.TpPedido == 'T' ? 'Atendindo' : 'Nao Atendindo'}</TitleTpPedido>
                                    <Title>{'R$ '+parseFloat(i.VlTotalPedido).toFixed(2)}</Title>
                                </AreaTitle>
                                {pedidoDelivery[k].PedidoDeVendaItems.map((i, k)=>
                                    <Detail key={k}>{i.NmProduto}</Detail>
                                )}
                            </AreaPedido>
                        )}
                    </ContainerArea>
                </ScrollArea>
            </KeyBordArea>
        </SafeArea>
    )
}

Pedidos.navigationOptions = ()=>{
    return{
        headerShown:true,
        headerTitle:'Pedidos'
    }
}

const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
    }
}
export default connect(mapStateToProps) (Pedidos);