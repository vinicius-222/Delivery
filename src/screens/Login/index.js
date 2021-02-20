import React, { useState } from 'react';
import { StatusBar, Platform, Text, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import SendEmailSenha from '../../components/RecuperaSenha/SendEmailSenha'; 
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Header,
  HeaderTitle,
  Menu,
  MenuItem,
  MenuItemText,
  Input,
  ActionButton,
  ActionButtonText,
  LoadingArea,
  ActionLink,
  ActionLinkText
} from './styled';

const Page = (props) => {
  const api = useSalatoDeliveryAPI(props);

  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSignIn = async () => {
    if(email && password) {
      setLoading(true);
      const res = await api.signin(email, password);
      setLoading(false);
      
      if(res.error) {
        alert(res.error);
      } else {
        props.setJwt(res.jwt);
        props.setName(res.name);
        props.setHash(res.hash);
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Lojas'})
            ]
        }));
      }
    }
  }

  const handleSignUp = async () => {
    if(name && email && password) {
      setLoading(true);
      const json = await api.signup(name, email, password);
      setLoading(false);
      
      if(json.error) {
        alert(json.error);
      } else {
        props.setJwt(json.jwt);
        props.setName(json.NmPessoa);
        props.setHash(json.hash);
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Lojas'})
            ]
        }));
      }
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios'?'padding':null}>
      <StatusBar barStyle="light-content" />
      <SendEmailSenha
        visible={visible}
        actionVisible={setVisible}
        actionSetEmail={setEmail}
      />
      <Header>
        <HeaderTitle source={require('../../assets/images/Logo.png')}/>
      </Header>
      <Menu>
        <MenuItem active={activeMenu == 'signin'} onPress={()=>setActiveMenu('signin')} underlayColor="transparent">
          <MenuItemText>Login</MenuItemText>
        </MenuItem>
        <MenuItem active={activeMenu == 'signup'} onPress={()=>setActiveMenu('signup')} underlayColor="transparent">
          <MenuItemText>Cadastrar</MenuItemText>
        </MenuItem>
      </Menu>

      {activeMenu == 'signup' &&
        <Input editable={!loading} value={name} onChangeText={t=>setName(t)} placeholder="Nome" placeholderTextColor="#999" />
      }

      <Input editable={!loading} value={email} onChangeText={t=>setEmail(t)} keyboardType="email-address" autoCapitalize="none" placeholder="E-mail" placeholderTextColor="#999" />

      <Input editable={!loading} value={password} onChangeText={t=>setPassword(t)} placeholder="Senha" placeholderTextColor="#999" secureTextEntry={true} />

      {activeMenu == 'signin' &&
        <>
          <ActionButton disabled={loading} onPress={handleSignIn}>
            <ActionButtonText>Login</ActionButtonText>
          </ActionButton>
          <ActionLink onPress={()=>setVisible(true)} underlayColor="transparent">
            <ActionLinkText>Esqueceu a senha?</ActionLinkText>
          </ActionLink>
        </>
      }


      {activeMenu == 'signup' &&
        <ActionButton disabled={loading} onPress={handleSignUp}>
          <ActionButtonText>Cadastrar</ActionButtonText>
        </ActionButton>
      }
      
      {loading &&
        <LoadingArea>
          <ActivityIndicator size="large" color="#FFF" />
        </LoadingArea>
      }

    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
      jwt:state.userReducer.jwt,
     
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
    setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
    setHash:(hash)=>dispatch({type:'SET_HASH', payload:{hash}}),
    
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);