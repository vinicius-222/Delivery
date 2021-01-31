import styled from 'styled-components/native';

export const Area = styled.View`
    flex:1
`;

export const Button = styled.TouchableHighlight`
    width:20px;
    height:20px;
    background-color:#FF0000;
`;

export const Text = styled.Text`
    color:#FFF;
    font-size:16px;
`;

export const AreaScroll = styled.ScrollView`
    flex:1;
    background-color:#000000;
`;
export const AreaPhoto = styled.View`
    flex:1;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    flex-wrap:wrap;
`; 

export const AreaPhotoItem = styled.View`
    height:${props=>props.width && props.width};
    width:${props=>props.width && props.width};
    background-color:#FFF;
    margin:0px;
`;
export const ImagePhoto = styled.Image`
    height:${props=>props.width && props.width};
    width:${props=>props.width && props.width};
    margin:0px;
    position:absolute;
    align-items:center;
    z-index:-1;
`;

export const ButtonEscolher = styled.TouchableHighlight`
    width:100%;
    height:40px;
    backgroundColor:#3574CB;
    justify-content:center;
    align-items:center;
    
`;

export const Circulo = styled.View`
    width:20px;
    height:20px;
    border-radius:10px;
    border:2px solid #CCC;
    position:relative;
    top:5px;
    left:5px;
    z-index:0;
`;
export const CirculoAtivo = styled.View`
    display:${props=>props.active ? 'flex' : 'none'};
    width:16px;
    height:16px;
    border-radius:8px;
    border:2px solid #3574CB;
    background-color:#3574CB;
    position:relative;
    top:0px;
    left:0px;
    z-index:0;
`;

export const ButtonSelect = styled.TouchableHighlight`
    height:${props=>props.width && props.width};
    width:${props=>props.width && props.width};
`;