import React from 'react';
import styled from 'styled-components/native';

const HeaderEnderecoBalon = styled.View`
    display:${props=>props.active ? 'flex' : 'none'}
    background-color:#FFF;
    position:absolute;
    border-radius:5px;
    flex-wrap:wrap;
    top:-55px;
    right:-52px;
    border:0.7px solid #CCC;
    width:300px;
    height:40px;
    z-index:0;
`;
const HeaderEnderecoBalonTriangle = styled.View`
    position:absolute;
    top:37px;
    right:5px;
    width:0;
    height:0;
    border-top-width:15;
    border-top-color:#FFF;
    border-left-color:transparent;
    border-left-width:15;
    border-right-width:15;
    border-right-color:transparent;
    z-index:0;
`;

const HeaderEnderecoBalonTriangleText = styled.Text`
    top:${props=>props.top}
    left:${props=>props.left};
    position:absolute;
    color:#FF0000;
    font-size:12px;
    z-index:-1;
`;

const BalonCaution = (props) => {
    return(
        <HeaderEnderecoBalon active={props.active}>
            <HeaderEnderecoBalonTriangle>
                <HeaderEnderecoBalonTriangleText top={-50} left={-250}>Clique aqui para terminar o cadastro do </HeaderEnderecoBalonTriangleText>
                <HeaderEnderecoBalonTriangleText top={-35} left={-250}>seu endereco</HeaderEnderecoBalonTriangleText>
            </HeaderEnderecoBalonTriangle>
        </HeaderEnderecoBalon>
    )
}
export default BalonCaution;