import React, { useEffect }from 'react';
import styled from 'styled-components/native';
import { BASEAPIIMAGE, IMAGE } from '../useSalatoDeliveryAPI';

const BodyProdutoAction = styled.View`
    flex-direction:row;
    margin:2px 0px;  
    border-radius:5px;
    padding:15px 5px;
    border:0.5px solid #CCC;
`;
export const BodyAreaDetail = styled.View`
    width:100%;
    flex-direction:row;
    margin:2px 0px;  
    background-color:#FFF;
    padding:10px 5px;
    border-radius:5px;
    border:0.5px solid #CCC;

`;
export const BodyProdutoAreaImage =  styled.View`
    margin-left:5px;
`;
export const BodyProdutoImage = styled.Image`
    height:90px;
    width:90px;
    border-radius:5px;
`;
export const BodyProdutoAreaInfo = styled.View`
    justify-content:flex-start;
    flex-wrap: wrap;
    flex:1;
    width:100%;
    align-Items:center;
`;
export const BodyProdutoName = styled.Text`
    font-size:16px;
    margin:0px 10px;

`;
export const BodyProdutoAreaDetail = styled.View`
    width:100%;
    justify-content:center;
    align-items:center;
    margin-top:5px;
`;
export const BodyProdutoPrice = styled.Text`
    
`;
export const BodyProdutoInfo = styled.Text``;
export const BodyProdutoAdicionar = styled.TouchableHighlight`
    padding:5px;
    background-color:#FF0000;
    border-radius:5px;
    width:100px;
`;
export const BodyProdutoText = styled.Text`
    color:#FFF;
    font-size:14px;
    text-align:center;
`;

const BASE = BASEAPIIMAGE;
const FlatListProducts = (props) =>{

    const ClickCarCompra = () => {
        props.OnAddCarCompra()
    }
    return(
        <BodyProdutoAction key={props.key} >
            <BodyProdutoAreaImage>
                <BodyProdutoImage  source={{uri:IMAGE+props.data.LinckImage}}/>
            </BodyProdutoAreaImage>
            <BodyProdutoAreaInfo>
                <BodyProdutoName>{props.data.DsTitulo}</BodyProdutoName>
                <BodyProdutoAreaDetail>
                    <BodyProdutoPrice>R$ {parseFloat(props.data.VlPreco).toFixed(2)}</BodyProdutoPrice>
                    <BodyProdutoInfo></BodyProdutoInfo>
                </BodyProdutoAreaDetail>
                <BodyProdutoAdicionar onPress={()=>ClickCarCompra()}>
                    <BodyProdutoText>Adiconar</BodyProdutoText>
                </BodyProdutoAdicionar>
            </BodyProdutoAreaInfo>  
        </BodyProdutoAction>
    )
}
export default FlatListProducts;