import styled from 'styled-components/native';

export const Safe = styled.SafeAreaView`
    flex:1;
`;
export const Container = styled.View`
    flex:1;
`;
export const TextLocalizacaoProduto = styled.TextInput`
   flex:1;

`;
export const Texto = styled.Text`
    color:#000;
    text-align:center;
    font-size:14px;
`;
export const TextoLocalizacaoArea = styled.View`
    width:100%;
    height:30px;
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