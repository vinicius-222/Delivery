import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color:#FFF;
`;

export const HeaderArea = styled.View`
    padding:15px;
    background-color:#FFF;
    height:270px;
    width:100%;
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
    height:46%;
    width:28%;
    justify-content:center;
    align-items:center;
    margin:5px 5px;
    border:0.8px solid ${props=>(props.active ? '#FF0000' : '#999')};
    border-radius:5px;
`;

export const HeaderCategoriaAction = styled.TouchableHighlight`
    justify-content:center;
    align-items:center;    
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
    height:80px;
    width:80px;
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

export const BodyArea = styled.View`
    flex:1;
    padding:0px 15px;
    width:100%;
    background-color:#FFF;
    
`;
export const BodyAreaScroll = styled.ScrollView`
`;
export const BodyTitle = styled.Text`
    font-size:20px;
    color:#000;
    margin-top:5px;
`;
export const BodyProdutoAction = styled.TouchableHighlight``;

export const BodyAreaDetail = styled.View`
    width:100%;
    flex-direction:row;
    margin:2px 0px;  
    background-color:#FFF;
    padding:10px 5px;
    border-radius:5px;
    border:0.5px solid #CCC;

`;
export const BodyProdutoAreaImage =  styled.View``;
export const BodyProdutoImage = styled.Image`
    height:90px;
    width:90px;
    resizeMode:contain;
    border-radius:5px;
`;
export const BodyProdutoAreaInfo = styled.View`
    justify-content:flex-start;
    flex-wrap: wrap;
    flex:1;
    width:100%;
    align-Items:center;
`;

export const BodyProdutoAreaDetail = styled.View`
    width:100%;
    justify-content:center;
    align-items:center;
    margin-top:5px;
`;

export const BodyProdutoName = styled.Text`
    font-size:16px;
    margin:0px 10px;

`;
export const BodyProdutoPrice = styled.Text`
    
`;
export const BodyProdutoInfo = styled.Text``;
export const BodyProdutoAdicionar = styled.TouchableHighlight`
    padding:5px;
    background-color:#FF0000;
    border-radius:5px;
`;
export const BodyProdutoText = styled.Text`
    color:#FFF;
    font-size:12px;
`;
export const Imagen = styled.Image`
    height:25px;
    width:25px;
    resizeMode:contain;
`;
export const TextLocalizacao = styled.TextInput`
    width:80%;
    height:30px;
    border:0.8px solid #CCC;
    border-radius:10px;
    padding:2px 10px;
`;
export const ButtonLocalizacao = styled.TouchableHighlight`
    margin-right:15px;
    width:25px;
    height:25px;
    border-radius:12px;
`;
export const ImageButton = styled.Image`
    width:20px;
    height:20px;
    resizeMode:contain;
`;