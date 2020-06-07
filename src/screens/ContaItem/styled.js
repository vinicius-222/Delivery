import styled from 'styled-components/native';

export const Scrol = styled.ScrollView`
    flex:1;
`;
export const AreaSafe = styled.SafeAreaView`
    flex:1;
`;
export const Container = styled.View`
    flex:1;
    margin:10px;
    borderRadius:5px;
`;
export const AreaTopoEnd = styled.View`
    backgroundColor:#01366a;
    height:30px;
    width:100%;
    justifyContent:center;
    alignItems:center;
`;
export const Body = styled.View`
   flex:1;
   height:360px;
`;
export const TxtTopo = styled.Text`
    color:#CCCCCC;
`;
export const AreaDatePicker = styled.View`
    height:65px;
    width:100%;
`;
export const AreaPicker = styled.View`
    margin-Left:10px;
    margin-Right:10px;
    height:45px;
    width:100%;
    borderBottomColor:#EEEEEE;
    borderBottomWidth:0.8px;
`;
export const TextInf = styled.Text`
    fontSize:12px;
    color:#999999;
    marginTop:5px;
    marginLeft:10px;
`;
export const Input = styled.TextInput`
    height:30px;
	backgroundColor:#DDDDDD;
	fontSize:14px;
    marginRight:10px;
    marginLeft:10px;
	padding:2px;
	backgroundColor:transparent;
	borderBottomColor:#CCCCCC;
	borderBottomWidth:1px;
	paddingLeft:10px;
`;
export const DataPicker = styled.Picker`
    color:#CCCCCC;
    height:20px;
    width:100%;
    marginBottom:20px;
`;
export const AreaPickerItems = styled.View`
    margin-Left:10px;
    margin-Right:10px;
    justify-Content:center;
    align-Items:center;
`;

export const AreaButton = styled.View`
    flexDirection:row;
    height:50px;
    borderBottomColor:#CCCCCC;
    borderBottomWidth:0.8px;
    justifyContent:center;
    alignItems:center;
`;
export const ButtonSalvar = styled.TouchableHighlight`
    backgroundColor:#008000;
    width:350px;
    height:40px;
    margin:10px;
    borderRadius:10px;
    alignItems:center;
    justifyContent:center;
`;
export const TxtSalvar = styled.Text`
    color:#FFFFFF;
`;