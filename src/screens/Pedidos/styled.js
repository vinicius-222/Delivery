import styled from 'styled-components/native';


export const SafeArea = styled.SafeAreaView`
    flex:1;
`;
export const KeyBordArea  = styled.KeyboardAvoidingView`
    flex:1;
`;
export const ScrollArea = styled.ScrollView`
    flex:1;
`;
export const ContainerArea = styled.View`
    flex:1;
    padding:10px 5px;
`;
export const AreaPedido = styled.View`
    height:auto;
    width:100%;
    margin:5px 0px;
    border:0.6px solid #FF0000;
    border-radius:5px;
    padding:5px;

`;
export const AreaTitle = styled.View`
    width:auto;
    height:25px;
    flex-direction:row;
    justify-content:space-between;
    margin:0px 10px;
`;
export const Title = styled.Text`
    color:#323232;
    font-size:16px; 
`;
export const TitleTpPedido = styled.Text`
    margin-left:20px;
    color:${props=>props.active ? '#32CD32' : '#FF0000'}
    font-size:16px;
`;
export const Detail = styled.Text`
    color:#323232;
    margin-left:30px;   
`;