import React, { useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import { SignOut } from '../../helpers/AuthHandler';
import { StackActions, NavigationActions } from 'react-navigation';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import { MoneyMask } from '../../components/Mask';
import {
    Safe,
    Container,
    HeaderTitle,
    HeaderFormaDePagamento,
    HeaderFormaDePagamentoArea,
    HeaderFormaDePagamentoButton,
    HeaderFormaDePagamentoTitle,
    Imagem,
    BodyFormaDePagamentoArea,
    BodyFormaDePagamentoSubTotal,
    BodyFormaDePagamentoSubTotalArea,
    BodyFormaDePagamentoSubTotalText,
    BodyFormaDePagamentoTrocoText,
    BodyFormaDePagamentoTrocolArea,
    BottomActionContinuar,
    BottomActionText
} from './styled';

const Pagamento = (props) =>{
    const Api = useSalatoDeliveryAPI(props);
    const ListFormaDePagamentoRef = useRef();
    const [ListFormaDePagamento, setListFormaDePagamento] = useState([]);
    const [active, setActive] = useState('1');
    const [VlEntrega, setVlEntrega] = useState(0);
    const [troco, setTroco] = useState('');
   
    const getFormadePagamento = () =>{
        setListFormaDePagamento(props.ListFormaDePagamento);
    }

    const handleEnviar = async () => {
        let Itens = props.ListCarCompra;
        let IdPedidoDeVenda = await Api.getCode(
            'PedidoDeVenda',
            'IdPedidoDeVenda'
        );

        const json = await Api.sendPedidoDeVenda(
            IdPedidoDeVenda,
            2,
            new Date(),
            new Date(),
            35,
            props.VlTotalProduto,
            "A",
            active,
            props.VlTotalProduto,
            Itens,
            "",
            props.jwt,
        )
            
        
        if (!json.error){
            props.setcarCompra([]);
            props.setImageProduto('');

            props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'home'})
                ]
            }));
            
            alert('Pedido enviado com sucesso!!');
        }else{
            alert('Pedido nao enviado!!');
        }
    }

    const CalculaTroco = () => {
        let t = parseFloat(troco);
        let v = parseFloat(props.VlTotalProduto + parseFloat(VlEntrega)).toFixed(2);
        if (troco == ''){
            t = 0
        }

        let r = (t-v).toFixed(2);

        if (r < 0 ){
            r = 0;
        }
        return parseFloat(r).toFixed(2) 
    }
    useEffect(()=>{
        getFormadePagamento();
        let arr = props.MeusEnderecos;
        let i = arr.findIndex((e)=> e.StEntrega == 1);
        if (props.TpEntrega === 'Entrega' ){
            setVlEntrega(arr[i].Valor);
        }else{
            setVlEntrega(0);
        }
        

    },[])
    return(
        <Safe>
            <Container>
                <HeaderFormaDePagamento
                    ref={ListFormaDePagamentoRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                >
                    {ListFormaDePagamento.map((i,k)=>(
                        <HeaderFormaDePagamentoArea active={i.IdFormaPagamento == active} key={k} >
                            <HeaderFormaDePagamentoButton onPress={()=>setActive(i.IdFormaPagamento)} underlayColor="transparent">
                                <>
                                    <Imagem source={{uri:i.url}}/>
                                    <HeaderFormaDePagamentoTitle active={i.IdFormaPagamento == active}>{i.DsFormaPagamento}</HeaderFormaDePagamentoTitle>
                                </>
                            </HeaderFormaDePagamentoButton>
                        </HeaderFormaDePagamentoArea>
                        
                    ))}
                </HeaderFormaDePagamento>
                <BodyFormaDePagamentoArea>
                    <BodyFormaDePagamentoSubTotalArea>
                        <BodyFormaDePagamentoSubTotalText>Taxa de Entrega</BodyFormaDePagamentoSubTotalText>
                        <BodyFormaDePagamentoSubTotal>R$ {parseFloat(VlEntrega).toFixed(2)}</BodyFormaDePagamentoSubTotal>
                    </BodyFormaDePagamentoSubTotalArea>
                    <BodyFormaDePagamentoSubTotalArea>
                        <BodyFormaDePagamentoSubTotalText>Total dos Produtos</BodyFormaDePagamentoSubTotalText>
                        <BodyFormaDePagamentoSubTotal>R$ {parseFloat(props.VlTotalProduto).toFixed(2)}</BodyFormaDePagamentoSubTotal>
                    </BodyFormaDePagamentoSubTotalArea>
                    <BodyFormaDePagamentoSubTotalArea>
                        <BodyFormaDePagamentoSubTotalText>Total </BodyFormaDePagamentoSubTotalText>
                        <BodyFormaDePagamentoSubTotal>R$ {parseFloat(parseFloat(props.VlTotalProduto) + parseFloat(VlEntrega)).toFixed(2)}</BodyFormaDePagamentoSubTotal>
                    </BodyFormaDePagamentoSubTotalArea>
                    {active == 1 &&
                    <>
                        <BodyFormaDePagamentoSubTotalArea>
                            <BodyFormaDePagamentoSubTotalText>Troco para </BodyFormaDePagamentoSubTotalText>
                            <BodyFormaDePagamentoTrocolArea>
                                <BodyFormaDePagamentoSubTotalText>R$ </BodyFormaDePagamentoSubTotalText>
                                <BodyFormaDePagamentoTrocoText placeholder="digite o valor" keyboardType="numeric" value={troco} onChangeText={(i)=>setTroco(MoneyMask(i))}/>
                            </BodyFormaDePagamentoTrocolArea>
                        </BodyFormaDePagamentoSubTotalArea>

                        <BodyFormaDePagamentoSubTotalArea>
                            <BodyFormaDePagamentoSubTotalText>Troco </BodyFormaDePagamentoSubTotalText>
                            <BodyFormaDePagamentoSubTotal>R$ {CalculaTroco()} </BodyFormaDePagamentoSubTotal>
                        </BodyFormaDePagamentoSubTotalArea>
                    </>
                    }
                </BodyFormaDePagamentoArea>
                <BottomActionContinuar onPress={()=>handleEnviar()}>
                    <BottomActionText>Finalizar Compra</BottomActionText>    
                </BottomActionContinuar>
            </Container>
        </Safe>
    )
}

Pagamento.navigationOptions = () => {
    return{
        headerTitle:'Pagamento'
    }
}
const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        ListCarCompra:state.carReducer.ListCarCompra,
        VlTotalProduto:state.carReducer.VlTotalProduto,
        hash:state.userReducer.hash,
        Endereco:state.carReducer.Endereco,
        VlTotalProduto:state.carReducer.VlTotalProduto,
        ListFormaDePagamento:state.carReducer.ListFormaDePagamento,
        MeusEnderecos:state.enderecoReducer.MeusEnderecos,
        TpEntrega:state.carReducer.TpEntrega

    }
}
 
const mapDispatchToProps = (dispatch) =>{
    return{
        setcarCompra:(ListCarCompra)=>dispatch({type:'SET_LISTCARCOMPRA', payload:{ListCarCompra}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setQtProdutoCar:(QtProdutoCar)=>dispatch({type:'SET_QTPRODUTOCAR', payload:{QtProdutoCar}}),
        setImageProduto:(ImageProduto)=>dispatch({type:'SET_IMAGEPRODUTO', payload:{ImageProduto}}),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);