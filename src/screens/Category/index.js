import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useSalatoDeliveryAPI, { BASEAPIIMAGE } from '../../useSalatoDeliveryAPI';
import { 
    Container,
    HeaderArea,
    HeaderCategoria,
    HeaderCategoriaItem,
    HeaderCategoriaImage,
    HeaderCategoriaTitle,
    HeaderCategoriaDesc,
    HeaderCategoriaAction,
    HeaderCategoriaArea,
    ScrollArea, 
} from './styled';

const BASE = BASEAPIIMAGE;
const Category = (props) =>{
    const api = useSalatoDeliveryAPI(props);
    const [activeCategoria, setActiveCategoria] = useState('Mini-fritos');
    const [listCategoria, setListCategoria] = useState([]);

    const[ProductsInfo, setProductsInfo] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const HandleProdutos = (i) => {
        props.setIdCategoria(i.IdGrupoProduto);
        props.navigation.navigate('Search',{DsGrupoProduto:i.DsGrupoProduto, IdGrupoProduto:i.IdGrupoProduto});
    }

    useEffect(() =>{
        setProductsInfo(props.ListProductsCategory);
        setListCategoria(props.ListCategory);
    },[])

    return(
        <Container>
            <ScrollArea>
                <HeaderArea>
                    <HeaderCategoria>
                        {listCategoria.map((i,k)=>(
                            <HeaderCategoriaArea key={k} active={activeCategoria == i.DsGrupoProduto} >
                                <HeaderCategoriaAction onPress={()=>HandleProdutos(i)} underlayColor="transparent">
                                    <HeaderCategoriaItem active={activeCategoria == i.DsGrupoProduto}>
                                            <HeaderCategoriaImage source={{uri:BASE+i.DsImagemSite}} />
                                            <HeaderCategoriaDesc active={activeCategoria == i.DsGrupoProduto}>{i.DsGrupoProduto}</HeaderCategoriaDesc>
                                    </HeaderCategoriaItem>
                                </HeaderCategoriaAction>
                            </HeaderCategoriaArea>
                        ))}
                    </HeaderCategoria>
                </HeaderArea>
            </ScrollArea>
        </Container>
    )
}


Category.navigationOptions = (props) =>{
    return{
        headerTitle:'Categoria',
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
        setIdCategoria:(IdCategoria)=>dispatch({type:'SET_IDCATEGORIA', payload:{IdCategoria}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);