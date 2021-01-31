import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import styled from 'styled-components/native';

export const Safe = styled.SafeAreaView`
    flex:1;
`;
export const ScrolArea = styled.ScrollView`
    flex:1;
`;
export const Container = styled.View`
    flex:1;
    padding:10px 15px;
    border-bottom-width:0.5px;
    border-bottom-color:#CCC;
`;
export const BodyHeaderArea = styled.View`
    flex-direction:row;
    align-items:center;
`;
export const HeaderImageProduto = styled.Image`
    height:45px;
    width:45px;
    border-radius:5px;
    resizeMode:contain;
`;
export const HeaderNomeProduto = styled.Text`
    margin-left:10px;
    font-size:14px;
`;
export const BodyArea = styled.View`
    margin-top:10px;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;
export const BodyInfoQtProdutoArea = styled.View`
    flex-direction:row;
    height:35px;
    width:90px;
    border-radius:10px;
    background-color:#EEE;
    justify-content:space-between;
    align-items:center;
    margin:0px 0px;
`;
export const BodyMin = styled.TouchableHighlight`
    width:35px;
    height:24px;
    justify-content:center;
    align-items:center;
`;
export const BodyTxt = styled.Text``;
export const BodyQt = styled.Text`
    width:20px;
    text-align:center;
`;
export const BodyAdd = styled.TouchableHighlight`
    width:35px;
    height:24px;
    justify-content:center;
    align-items:center;
`;
export const BodyPriceUnitario = styled.Text``;
export const BodyPriceTotal = styled.Text``;
export const BodyActionRemove = styled.TouchableHighlight``;
export const BodyPriceImage = styled.Image`
    height:20px;
    width:20px;
    resizeMode:contain;
`;
export const HeaderArea = styled.View`
    padding:10px 15px;
    background-color:#F2F2F2;
`;
export const HeaderTotalArea = styled.View`
    flex-direction:row;
    border-radius:5px;
    border:0.7px solid #CCC;
    height:50px;
    justify-content:space-between;
    align-items:center;
    background-color:#FFF;
    padding:0px 15px;
`;
export const HeaderTotalText = styled.Text`
    color:#000;
    font-size:18px;
`;
export const HeaderTotalPrice = styled.Text`
    color:#3574CB;
    font-weight:bold;
    font-size:16px; 
`;  
export const HeaderEnderecoArea = styled.View`
    width:85%;
    border-radius:5px;
    flex-wrap:wrap;
    border:0.7px solid #CCC;
    padding:10px;
    justify-content:center;
    align-items:center;
    background-color:#FFF;
`;
export const HeaderEnderecoTextInput = styled.Text`

`;
export const HeaderEnderecoBalon = styled.View`
    display:${props=>props.active ? 'flex' : 'none'}
    background-color:#FFF;
    position:absolute;
    border-radius:5px;
    top:-55px;
    right:-52px;
    border:0.7px solid #CCC;
    width:300px;
    height:40px;
    z-index:0;
`;
export const HeaderEnderecoBalonTriangle = styled.View`
    background-color:transparent;
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

export const HeaderEnderecoBalonTriangleText = styled.Text`

    color:#000;
    font-size:12px;
    z-index:1;
`;

export const HeaderEnderecoText = styled.Text`

`;
export const HeaderEnderecoTpEntregaText = styled.Text`
    color:#FF0000;
    font-size:16px;
    margin-bottom:5px;
    margin-top:10px;
`;
export const HeaderEnderecoAction = styled.TouchableHighlight`
    height:88%;
    width:45px;
    margin-left:10px;
    border-radius:5px;
    justify-content:center;
    align-items:center;
    background-color:#FFF;
    border:0.8px solid #CCC;
`;
export const HeaderEnderecoTextEditArea = styled.View`
    flex-wrap:wrap;
    flex:1;
`;
export const HeaderEnderecoActionEditArea = styled.TouchableHighlight`
  
`;
export const HeaderEnderecoTextEdit = styled.Text`
    color:#3574CB;
`;

export const HeaderForma = styled.View`
    flex-direction:row;
    width:100%;
    margin-bottom:10px;
`;
export const HeaderEntrega = styled.TouchableHighlight`
    border-bottom-color:${props=>(props.active ? '#FF0000' : 'transparent')};
    border-bottom-width:2px;
    padding-bottom:10px;
`;
export const HeaderTitle = styled.Text`
    font-size:16px;
    margin:0px 10px;
    color:${props=>(props.active ? '#FF0000' : '#999')};
`; 
export const HeaderRetirada = styled.TouchableHighlight`
    border-bottom-color:${props=>(props.active ? '#FF0000' : 'transparent')};
    border-bottom-width:2px;
    padding-bottom:10px;
`;
export const HeaderEnderecoIcon = styled.Image`
    height:25px;
    width:25px;
    resizeMode:contain;
    align-items:center;
`;
export const HeaderEnderecoAreaItem = styled.View`
    flex-direction:row;
    height:60px;
    justify-content:center;
    align-items:center;
    
`;
export const HeaderEnderecoAreaItemPreenchido = styled.View`
    height:70px;
    flex-direction:column;
    flex:1;
    justify-content:center;
    
`;
export const HeaderEnderecoTitle = styled.Text``;
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
export const ButtonActionPagamento = styled.TouchableHighlight`
    margin:0px 10px;
`;
export const TextoActionPagamento = styled.Text`
    color:#3574CB;
    font-size:18px;
`;
export const HeaderAgendamentoArea = styled.View`
    margin-top:5px;
    flex-direction:row;
    border-radius:5px;
    justify-content:space-between;
    align-items:center;
    background-color:#FFF;
    border:0.8px solid #CCC;
`;
export const StAgendamento =  styled.Switch`
    margin-Right:5px;
`;
export const AreaSangriaAgendamento = styled.View`
    height:15px;
    width:40px;
`;
export const AreaCamera = styled.View`
    width:100%;
    height:60px;
    margin-top:10px;
    justify-content:space-between;
    align-items:center;
    flex-direction:row;

`;

export const BottonCamera = styled.TouchableHighlight`
    width:50px;
    height:50px;
    border-radius:6px;
`;

export const ImageCamera = styled.Image`
    width:50px;
    height:50px;

`;

export const TextCamera = styled.Text`
    color:#999;
    font-size:14px;
    text-align:center;
`;

export const AreaPhoto = styled.View`
    width:100%;
    justify-content:center;
    align-items:center;
    height:300px;
    margin-top:15px;
`;

export const ImageProduto = styled.Image`
    width:300px;
    height:300px;
    border-radius:5px;
`;

export const ButtonDelImage = styled.TouchableHighlight`
    width:20px;
    height:20px;
    margin-right:15px;
`;

export const ButtonTrashImage = styled.Image`
    width:20px;
    height:20px;  
`;