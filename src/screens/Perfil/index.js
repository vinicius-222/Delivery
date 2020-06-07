import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { SignOut } from '../../helpers/AuthHandler';
import { StackActions, NavigationActions } from 'react-navigation';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import HeaderPerfil from '../../components/HeaderPerfil';
import AddressModal from '../../components/Address/AddressModal';
import {
    Safe,
    Container,
    HeaderArea,
    HeaderTitle,
    Imagem,
    AreaLogo
} from './styled';

const Perfil = (props) =>{
    const api = useSalatoDeliveryAPI(props);
    //const [DtNascimento, setDtNascimento] = useState(props.infoUsuario[0].DtNascimento);
    const [sexo, setsexo] = useState(0);
    const [sexos, setsexos] = useState([
                                        {nome:'', id:0},
                                        {nome:'Sexo Masculino', id:1},
                                        {nome:'Sexo Feminino', id:2},
                                        {nome:'Outros', id:3}
                                        ]);

    const [EstadoCivil, setEstadoCivil] = useState(0);
    const [EstadoCivis, setEstadoCivis] = useState([
                                                    {nome:'', id:0},
                                                    {nome:'Solteiro', id:1},
                                                    {nome:'Casado', id:2},
                                                    {nome:'Desquitado', id:3},
                                                    {nome:'Viuvo', id:4},
                                                    {nome:'União Estavel', id:5},
                                                    {nome:'Outros', id:6}
                                                    ]);
    const [modalTitle, setModalTitle] = useState('digite seu endereco');
    const [modalVisible, setModalVisible] = useState(false);
    const [visibleBalon, setVisibleBalon] = useState(false);
  

    const SingOut = () => {
        props.setEndereco('')
        props.setEnderecoAtivo([])
        props.setSignOut();
    }

    const handleModalClick = (field, item) => {
        props.setVisibleBalon(field);
        props.setEndereco(item);
        setModalVisible(false)
    }

    useEffect(()=> {
        if (!props.jwt){
            props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Login'})
                ]
            }));
        }
    },[props.jwt]);

    useEffect(()=>{
        switch(EstadoCivil == 'r'){
            case 'C':
                setEstadoCivil(2);
                break;
            case 'S':
                setEstadoCivil(1);
                break;
            case 'D':
                setEstadoCivil(3);
                break;
            case 'V':
                setEstadoCivil(4);
                break;
            case 'U':
                setEstadoCivil(5);
                break;
            case 'O':
                setEstadoCivil(6);
                break;
        }
    },[EstadoCivil])

    return(
        <Safe>
            <Container>
                <AddressModal  
                    title={modalTitle}
                    visible={modalVisible}
                    visibleAction={setModalVisible}
                    clickAction={handleModalClick}
                    visibleBalon={setVisibleBalon}
                />
                <HeaderArea onPress={()=>props.navigation.navigate('Conta')} underlayColor='#EEE'> 
                    <HeaderTitle>Perfil</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>props.navigation.navigate('Senha')} underlayColor='#EEE'>
                    <HeaderTitle>Senha</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>props.navigation.navigate('Email')} underlayColor='#EEE'>
                    <HeaderTitle>Email</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>props.navigation.navigate('Pedidos')} underlayColor='#EEE'>
                    <HeaderTitle>Pedidos</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>setModalVisible(true)} underlayColor='#EEE'>
                    <HeaderTitle>Enderecos</HeaderTitle>
                </HeaderArea>
                <HeaderArea onPress={()=>SingOut()} underlayColor='#EEE'> 
                    <HeaderTitle name='Sair' >Sair</HeaderTitle>
                </HeaderArea>
                <AreaLogo>
                    <Imagem source={require('../../assets/images/Logo.png')}/>
                </AreaLogo>
            </Container>
        </Safe>
    )
}

Perfil.navigationOptions = (props) => {
    return{ 
        headerTitle:<HeaderPerfil />,
        headerStyle:{
        }

    }
}
const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
        Endereco:state.carReducer.Endereco,
        infoUsuario:state.userReducer.infoUsuario,
        visibleBalon:state.enderecoReducer.visibleBalon
    }
} 
 
const mapDispatchToProps = (dispatch) =>{
    return{
        setInfoUsuario:(infoUsuario)=>dispatch({type:'SET_INFOUSUARIO', payload:{infoUsuario}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setEnderecoAtivo:(EnderecoAtivo)=>dispatch({type:'SET_ENDERECOATIVO', payload:{EnderecoAtivo}}),
        setVisibleBalon:(visibleBalon)=>dispatch({type:'SET_VISIBLEBALON', payload:{visibleBalon}}),
        setSignOut:()=>dispatch(SignOut()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Perfil);