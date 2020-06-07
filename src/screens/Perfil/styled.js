import styled from 'styled-components/native';

export const Safe = styled.SafeAreaView`
    flex:1;
`;
export const Container = styled.View`
    flex:1;
    padding:5px 5px;
`;
export const HeaderArea = styled.TouchableHighlight`
    height:45px;
    border-bottom-color:#FF0000;
    border-bottom-width:0.6px;
    justify-content:center;
    margin:0px 10px;
`;
export const HeaderTitle = styled.Text`
    font-size:17px;
    color:${props=>props.name == 'Sair' ? '#3574CB': '#999'};
    margin-left:5px;
`;
export const Imagem = styled.Image`
    width:250px;
    resizeMode:contain;
`;

export const AreaLogo = styled.View`
    margin-top:10px;
    flex:1;
    justify-content:center;
    background-color:#FF0000;
    border-radius:10px;
    align-items:center;
`;


