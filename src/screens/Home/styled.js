import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
    background-color:#FFF;
`;
export const AreaScroll = styled.ScrollView`
    flex:1;
`;
export const HeaderCategoria = styled.ScrollView`
    width:100%;
`;
export const ImageBackgroundArea = styled.ImageBackground`
    flex:1;
    background-color:#FFFAF0;
`;
export const BodyArea = styled.View`
    flex:1;
    justify-content:center;
    align-items:flex-start;
    flex-direction:row;
`;

export const Imagen = styled.Image`
    height:${props=>props.height && props.height}px;
    width:${props=>props.height && props.height}px;
    resizeMode:center;
    border-radius:5px;
    margin:10px 12px;
`;
export const Logo = styled.Image`
    height:90px;     
    width:90px;
    resizeMode:contain;
`;
export const Texto = styled.Text``;
export const AreaMaps = styled.View`
    height:50px;
    width:100%;
`;
export const ButtonMaps = styled.Button`
    height:100%;
    width:100%;
`;