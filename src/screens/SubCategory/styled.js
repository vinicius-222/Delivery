import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
`;
export const ScrollArea = styled.ScrollView`
    flex:1;
`;

export const HeaderArea = styled.View`
    padding:15px;
    background-color:#FFF;
    flex:1;
`;
export const HeaderEnderecoTitle = styled.Text`
    font-size:16px;
    color:#000;
`;
export const HeaderCategoria = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
`;

export const HeaderCategoriaArea = styled.View`
    height:160px;
    width:45%;
    justify-content:center;
    align-items:center;
    margin:5px 5px;
    border:0.8px solid ${props=>(props.active ? '#FF0000' : '#999')};
    border-radius:5px;
`;

export const HeaderCategoriaAction = styled.TouchableHighlight`
    justify-content:center;
    align-items:center;    
    width:100%;
    height:100%;

`;
export const HeaderCategoriaTitle = styled.Text`
    font-size:20px;
    color:#000;
`;

export const HeaderCategoriaItem = styled.View`
    justify-content:center;
    align-items:center;         
`;
export const HeaderCategoriaImage = styled.Image`
    height:100px;
    width:100px;
    resizeMode:contain;
`;
export const HeaderCategoriaDesc= styled.Text`
    font-size:14px;
    color:${props=>(props.active ? '#FF0000' : '#999')}
`;

export const HeaderForma = styled.View`
    flex-direction:row;
    padding:10px 20px;
    width:100%;
    border-bottom-color:#CCC;
    border-bottom-width:0.8px;
`;
export const HeaderEntrega = styled.TouchableHighlight`

`;
export const HeaderTitle = styled.Text`
    font-size:16px;
    margin:0px 10px;
    color:${props=>(props.active ? '#FF0000' : '#999')};
`; 
export const HeaderRetirada = styled.TouchableHighlight``;

export const HeaderEnderecoArea = styled.View`
    margin-top:10px;
`;

export const HeaderEnderecoAction = styled.TouchableHighlight`
    
`;