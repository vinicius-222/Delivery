import styled from 'styled-components/native';

export const Safe = styled.SafeAreaView``;
export const Container = styled.View`
    padding:10px 15px;
`;
export const HeaderTitle = styled.Text`
    font-size:18px;
    color:#3574CB;
`;
export const HeaderFormaDePagamento = styled.ScrollView`
    width:100%;
`;
export const HeaderFormaDePagamentoArea = styled.View`
    border:0.8px solid ${props=>props.active ? '#FF0000' : '#CCC'};
    border-radius:5px;
    margin:10px;
    width:150px;
    justify-content:center;
    align-items:center;
    padding:10px;
`;
export const HeaderFormaDePagamentoButton = styled.TouchableHighlight`
    width:100%;
`;
export const HeaderFormaDePagamentoTitle = styled.Text`
    font-size:12px;
    text-align:center;
    color:${props=>props.active ? '#FF0000' : '#CCC'};
`;
export const Imagem = styled.Image`
    height:100px;
    width:100px;
    resizeMode:contain;
`;


//Inicio da construcao do body
export const BodyFormaDePagamentoArea = styled.View``;
export const BodyFormaDePagamentoSubTotal = styled.Text``;
export const BodyFormaDePagamentoSubTotalText = styled.Text``;
export const BodyFormaDePagamentoTrocoText = styled.TextInput`  
    width:auto;
    text-align:right;
    height:20px;
    padding:0px;
`;
export const BodyFormaDePagamentoSubTotalArea = styled.View`
    border-top-width:0.8px;
    border-top-color:#CCC;
    border-radius:5px;

    justify-content:space-between;
    align-items:center;
    flex-direction:row;
    padding:10px 15px;
    

`;
export const BodyFormaDePagamentoTrocolArea = styled.View`
    flex-direction:row;
`;

export const BottomActionContinuar = styled.TouchableHighlight`
    margin:20px 30px;
    padding:20px 30px;
    border-radius:20px;
    background-color:#32CD32; 
    justify-content:center;
    align-items:center;  
`;
export const BottomActionText = styled.Text`
    color:#FFF;
    font-size:18px;
    font-weight:bold;
`;

