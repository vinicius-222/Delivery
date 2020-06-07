import React, { useState, useEffect} from 'react'
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';

export const TextLocalizacaoProduto = styled.TextInput`
   flex:1;
   color:#000;
   height:35px;
   font-size:14px;
`;
export const Texto = styled.Text`
    color:#000;
    text-align:center;
    font-size:14px;
`;
export const TextoLocalizacaoArea = styled.View`
    width:98%;
    height:35px;
    border:0.8px solid #CCC;
    border-radius:15px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;
export const Imagem = styled.Image`
    height:15px;
    width:15px;
    resizeMode:contain;
    margin:0px 10px;
`;
export const ButtonLimpar = styled.TouchableHighlight`
    height:18px;
    width:18px;
    border-radius:8px;
    background-color:#CCC;
    margin:0px 5px;
    justify-content:center;
    align-items:center;
`;
let time;
const LocalizcaoProduto = (props) =>{
    const api = useSalatoDeliveryAPI(props);

    const getInfoProduto = async () => {
        props.changeLoading(true);
        let Limit = 1000;
        let offset = (1-1) * Limit + 1;
        const json = await api.getProdutoBanner(
            props.NmSearchProduto,
            1,
            Limit,
            0,
            offset,
            props.IdCategoria
        );
        props.setListProduto(json.Produtos);
    }

    useEffect(()=>{
        if (time){
            clearTimeout(time);
        }

        time = setTimeout(()=>{
            if (props.NmSearchProduto){
                getInfoProduto();
            }
        },1000)
    },[props.NmSearchProduto])

    return(
        <TextoLocalizacaoArea>
           <Imagem source={require('../../assets/images/lupa.png')} />
           <TextLocalizacaoProduto value={props.NmSearchProduto} onChangeText={(item)=>props.changeNmSearchProduto(item)} autoFocus={true} placeholder='digite um produto para pesquisa' placeholderTextColor="#999"/>
           <ButtonLimpar onPress={()=>{
                props.changeNmSearchProduto('')
                props.setListProduto('');
            }} underlayColor="#EEE">
               <Texto>x</Texto>
           </ButtonLimpar>
        </TextoLocalizacaoArea>
    )
}

const mapStateToProps = (state) => {
    return{ 
        NmSearchProduto:state.carReducer.NmSearchProduto,
        IdCategoria:state.carReducer.IdCategoria
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeNmSearchProduto:(NmSearchProduto)=>dispatch({type:'SET_NMSEARCHPRODUTO', payload:{NmSearchProduto}}),
        setListProduto:(ListProduto)=>dispatch({type:'SET_LISTPRODUTOS', payload:{ListProduto}}),
        changeLoading:(Loading)=>dispatch({type:'SET_LOADING', payload:{Loading}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocalizcaoProduto)