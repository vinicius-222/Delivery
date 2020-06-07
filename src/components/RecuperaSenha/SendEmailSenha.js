import React, { useState }from 'react';
import styled from 'styled-components/native';
import { Modal, Platform } from 'react-native';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import Loading from '../Loading';

const SafeArea = styled.SafeAreaView`
    flex:1;
`;
const AreaOpacity = styled.View`
    justify-content:flex-end;
    align-items:flex-end;
    background-color:#000;
    opacity:0.3px;
    height:70px;
`;
const KeyBordArea = styled.KeyboardAvoidingView`
    flex:1;
    padding:0px;
`;
const ScrollArea = styled.ScrollView`
    flex:1;
    background-color:#FFF;
    border-radius:10px;
    margin-top:-5px;

`;
const AreaContainer = styled.View`
    flex:1;
`;
const AreaTopo = styled.View`
    justify-content:center;
    align-items:center;
    height:170px;
    background-color:#FF0000;
`;
const ImageLogo = styled.Image`
    width:200px;
    resizeMode:contain;
`;
const ActionBtn = styled.TouchableHighlight`
background-color:#3574CB;
justify-content:center;
align-items:center;
height:50px;
width:90%;
border-radius:5px;
margin:20px;
box-shadow:0px 2px 2px #999;
`;
const AreaBtnFechar = styled.View`
    height:60px;
    width:100%;
    justify-content:flex-end;
    align-items:flex-end;
`;
const ActionBtnFechar = styled.TouchableHighlight`
background-color:#3574CB;
justify-content:center;
align-items:center;
height:40px;
width:40px;
border-radius:20px;
margin:20px;
box-shadow:0px 2px 2px #999;
`;
const ActionBtnText = styled.Text`
    color:#FFF;
    font-size:18px;
`;
const AreaBody = styled.View`
    justify-content:flex-start;
    align-items:center;
    width:100%;
    height:100%;

`;
const EmailInput = styled.TextInput`
    margin:10px 20px;
    border-bottom-width:2px;
    border-bottom-color:#CCC;
    height:50px;
    width:90%;
    font-size:16px;
    color:#333;
`;


const SendEmailSenha = (props) => {
    const API = useSalatoDeliveryAPI();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);


    const HandleRecuperaSenha = async() =>{
        setLoading(true);
        const json = await API.insertRecuperaSenha(
            email
        )
        if(!json.email){
            alert('Enviamos um e-mail para voçe com informções para redefinir a sua senha!!');
            setEmail('');
            props.actionSetEmail(email);
        }else{
            alert(json.email);
        }
        setLoading(false);
    }
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <KeyBordArea>
                <AreaOpacity></AreaOpacity>
                <ScrollArea>
                    <AreaContainer>
                        <AreaTopo>
                            <ImageLogo source={require('../../assets/images/Logo.png')} />
                        </AreaTopo>
                        <AreaBody>
                            <EmailInput 
                                placeholder="E-mail"
                                value={email}
                                onChangeText={(e)=>setEmail(e)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <ActionBtn onPress={()=>HandleRecuperaSenha()}>
                                <ActionBtnText>Enviar</ActionBtnText>
                            </ActionBtn>
                            <AreaBtnFechar>
                                <ActionBtnFechar onPress={()=>props.actionVisible(false)}>
                                    <ActionBtnText>X</ActionBtnText>
                                </ActionBtnFechar>
                            </AreaBtnFechar>
                        </AreaBody>
                    </AreaContainer>
                </ScrollArea>
            </KeyBordArea>
            {loading && <Loading background='#000'/>}
        </Modal>
    )
}

export default SendEmailSenha;