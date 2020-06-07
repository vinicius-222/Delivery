import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import  { FlatList } from 'react-native';
import useSalatoDeliveryAPI, { BASEAPIIMAGE } from '../../useSalatoDeliveryAPI';
import FlatListProducts from '../../components/FlatListProducts';

import { 
    Container,
    BodyArea,
    ButtonLocalizacao,
    ImageButton
} from './styled';

const BASE = BASEAPIIMAGE;
const Search = (props) =>{
    const api = useSalatoDeliveryAPI();
    const [activeCategoria, setActiveCategoria] = useState('Mini-fritos');

    const [listCategoria, setListCategoria] = useState([]);

    const[ProductsInfo, setProductsInfo] = useState([])
    const [currentPage, setCurrentPage] = useState(1);


    const handleGetCategoria = async () => {
        const r = await api.getCategoria();
        setListCategoria(r.Itens);
    }

    const getInfoProduto = async () => {
        let Limit = 1000;
        let offset = (currentPage-1) * Limit + 1;
        const json = await api.getProdutoBanner(
            '',
            1,
            Limit,
            0,
            offset,
            props.navigation.state.params.IdGrupoProduto
        );
        setProductsInfo(json.Produtos);
       
    }

    const addCarCompra = (i) =>{
        props.setNmProduto(i.DsTitulo);
        props.setIdProduto(i.IdProduto);
        props.setVlProduto(i.VlPreco);
        props.setLinkImage(i.LinckImage);
        props.setDsProdutoSite(i.DsProdutoSite);
        props.setRouteName('Search');
        props.navigation.navigate('Checkout');
    }

    useEffect(() =>{
        //setProductsInfo(props.ListProductsCategory);
        setListCategoria(props.ListCategory);
        getInfoProduto();
    },[])

    return(
        <Container>
            <BodyArea>
                   <FlatList    
                        data={ProductsInfo}
                        keyExtractor={(item) => item.IdProduto}
                        renderItem={({item})=>{
                            return(
                                <FlatListProducts data={item} key={item.IdProduto} OnAddCarCompra={()=>addCarCompra(item)}/>
                            )
                        }}
                   />
            </BodyArea>
        </Container>
    )   
}


Search.navigationOptions = (props) =>{
    return{
        headerTitle:props.navigation.state.params.DsGrupoProduto,
        headerRight:<ButtonLocalizacao onPress={()=>props.navigation.navigate('SearchItem')} underlayColor='#EEE'>
                        <ImageButton  source={require('../../assets/images/lupa.png')}/>
                    </ButtonLocalizacao>,
        headerBackTitle:' '
    }
}
const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        ListCarCompra:state.carReducer.ListCarCompra,
        hash:state.userReducer.hash,
        Endereco:state.carReducer.Endereco,
        ListProductsCategory:state.carReducer.ListProductsCategory,
        ListCategory:state.carReducer.ListCategory,
    }
}
 
const mapDispatchToProps = (dispatch) =>{
    return{
        setNmProduto:(NmProduto)=>dispatch({type:'SET_NMPRODUTO', payload:{NmProduto}}),
        setIdProduto:(IdProduto)=>dispatch({type:'SET_IDPRODUTO', payload:{IdProduto}}),
        setVlProduto:(VlProduto)=>dispatch({type:'SET_VLPRODUTO', payload:{VlProduto}}),
        setLinkImage:(LinkImage)=>dispatch({type:'SET_LINKIMAGE', payload:{LinkImage}}),
        setDsProdutoSite:(DsProdutoSite)=>dispatch({type:'SET_DSPRODUTOSITE', payload:{DsProdutoSite}}),
        setcarCompra:(ListCarCompra)=>dispatch({type:'SET_LISTCARCOMPRA', payload:{ListCarCompra}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setRouteName:(RouteName)=>dispatch({type:'SET_ROUTENAME', payload:{RouteName}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);