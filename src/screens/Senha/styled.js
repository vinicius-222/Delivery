import styled from 'styled-components/native';


export const Scrol = styled.ScrollView`
    flex:1;
`;
export const AreaSafe = styled.ScrollView`
    flex:1;
`;
export const Container = styled.View`
    flex:1;
    margin:10px;
`;
export const AreaTopoEnd = styled.View`
    backgroundColor:#01366a;
    height:30px;
    width:100%;
    borderTopLeftRadius:5px;
    borderTopRightRadius:5px;
    justifyContent:center;
    alignItems:center;
`;
export const TxtTopo = styled.Text`
    color:#CCCCCC;
`;
export const Body = styled.View`
   flex:1;
   height:180px;
`;
export const Line = styled.View`
    marginTop:15px;
    height:2px;
    width:100%;
    backgroundColor:#008000;
`;
export const TextInf = styled.Text`
    fontSize:14px;
    color:#CCCCCC;
    marginTop:5px;
    marginLeft:10px;
`;
export const Input = styled.TextInput`
    height:30px;
	backgroundColor:#DDDDDD;
	fontSize:16px;
    marginRight:10px;
    marginLeft:10px;
    color:#000;
	padding:2px;
	backgroundColor:transparent;
	borderBottomColor:#CCCCCC;
	borderBottomWidth:0.7px;
	paddingLeft:10px;
`;
export const Txt = styled.Text`

`;
export const AreaButton = styled.View`
    flexDirection:row;
    height:50px;
    justifyContent:center;
    alignItems:center;
`;
export const ButtonSalvar = styled.TouchableHighlight`
    backgroundColor:#3574CB;
    box-shadow:0px 2px 2px #999;
    width:350px;
    height:40px;
    margin:10px;
    borderRadius:5px;
    alignItems:center;
    justifyContent:center;
`;
export const TxtSalvar = styled.Text`
    color:#FFFFFF;
    font-size:18px;
`;