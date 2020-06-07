import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LocalizacaoProduto from '../../components/ComponentsSearch/LocalizacaoProduto';
import { FlatList } from 'react-native';
import LocalizacaoProdutoItem from '../../components/ComponentsSearch/LocalizacaoProdutosItem';
import Loading from '../../components/Loading';
import {
    Safe,
    Container,
    TextLocalizacaoProduto,
    Texto,
    TextoLocalizacaoArea,
    Imagem,
    ButtonLimpar
} from './styled';

const SearchItem = (props) => {

    const addCarCompra = (i) => {
        props.setNmProduto(i.DsTitulo);
        props.setIdProduto(i.IdProduto);
        props.setVlProduto(i.VlPreco);
        props.setLinkImage(i.LinckImage);
        props.setDsProdutoSite(i.DsProdutoSite);
        props.navigation.navigate('Checkout');
    }

    useEffect(() => {   
        if (props.ListProduto){
            props.changeLoading(false);
        }
    },[props.ListProduto])

    return(
        <Safe>
            {props.Loading &&
                <Loading size="large" color="#FFF"/>
            }
            <Container>
                <FlatList 
                    style={{marginTop:15}}
                    data={props.ListProduto}
                    keyExtractor={(item)=>item.IdProduto}
                    renderItem={({item}) => {
                        return(
                            <LocalizacaoProdutoItem data={item} ClickAddItem={(i)=>addCarCompra(i)}/>
                        )
                    }}
                />
            </Container>
        </Safe>
    )
}

SearchItem.navigationOptions = ({navigation}) => {
    return{
        gesturesEnabled:true,
        headerTitle:<LocalizacaoProduto />,
        headerTitleContainerStyle:{
            backgroundColor:'#FFFFFF'
        },
        headerLeftContainerStyle:{
            backgroundColor:'#FFFFFF',
        }

          
    }
}

const mapStateToProps = (state) => {
    return{
        NmSearchProduto:state.carReducer.NmSearchProduto,
        ListProduto:state.carReducer.ListProduto,
        Loading:state.carReducer.Loading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        changeNmSearchProduto:(NmSearchProduto)=>dispatch({type:'SET_NMSEARCHPRODUTO', payload:{NmSearchProduto}}),
        changeLoading:(Loading)=>dispatch({type:'SET_LOADING', payload:{Loading}}),
        setNmProduto:(NmProduto)=>dispatch({type:'SET_NMPRODUTO', payload:{NmProduto}}),
        setIdProduto:(IdProduto)=>dispatch({type:'SET_IDPRODUTO', payload:{IdProduto}}),
        setVlProduto:(VlProduto)=>dispatch({type:'SET_VLPRODUTO', payload:{VlProduto}}),
        setLinkImage:(LinkImage)=>dispatch({type:'SET_LINKIMAGE', payload:{LinkImage}}),
        setDsProdutoSite:(DsProdutoSite)=>dispatch({type:'SET_DSPRODUTOSITE', payload:{DsProdutoSite}}),
        setRouteName:(RouteName)=>dispatch({type:'SET_ROUTENAME', payload:{RouteName}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);