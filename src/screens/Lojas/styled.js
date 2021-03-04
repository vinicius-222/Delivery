import styled from 'styled-components/native';


export default {
    Container: styled.SafeAreaView`
        flex:1;
        align-items:center;

    `,
    ImageBackgroundArea: styled.ImageBackground`
        flex:1;
        background-color:#FFFAF0;
    `,
    AreaTopo: styled.View`
        width:100%;
        height:60px;
        justify-content:center;
        align-items:center;
    `,
    LogoImage: styled.Image`
        height:70px;
        resize-mode:contain;
    `,
    AreaScroll: styled.ScrollView`
        width:100%;
        padding:10px;
    `,
    ContainerLoja: styled.View`
        width:100%;
        height:160px;
        background-color:#FFF;
        border-radius:20px;
        margin-top:10px;
        justify-content:flex-start;
        align-items:flex-start;
        padding:10px;
        border:1px solid #FF0000;
    `,
    Titulo: styled.Text`
        color:#000000;
        text-align:center;
        font-size:25px;
        text-align:center;
    `,
    Endereco: styled.Text`
        color:#000000;
        text-align:center;
        font-size:15px;
    `,
    AreaButton: styled.View`
        width:100%;
        height:20px;
        justify-content:flex-end;
        align-items:flex-end;

    `,
    ImageButton: styled.Image`
        width:30px;
        height:30px;
        border-radius:10px;
    `,
    BotaoIrPrincipalTabs: styled.TouchableHighlight`
        width:30px;
        height:30px;

    `,
};