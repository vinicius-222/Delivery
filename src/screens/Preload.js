import React, {useEffect} from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Loading from  '../components/Loading';
import useSalatoDeliveryAPI from '../useSalatoDeliveryAPI';

const Container = styled.View`
    justify-content:center;
    align-items:center;
    flex:1;
    background-color:#FF0000;
`;
const AreaLogo = styled.View`
    height:100px;
`;
const Logo = styled.Image`
    height:90px;
    resize-mode:contain;
`;
const AreaCarregamento = styled.View`
    align-items:center;
    height:80px;
    width:100%;
`;
const TextLoading = styled.Text`
    margin-bottom:10px;
`;

const Preload = (props) => {
    const API = useSalatoDeliveryAPI();
    const VerificaLogin = () =>{
        if(!props.jwt) {
            // LOGIN
            props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Login'})
                ]
            }));
        } else {
            // HOME
            props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'PrincipalTabs'})
                ]
            }));
        }
    }

    const location = async () =>{
        const geo = await API.getCurrentLocation();
        props.setGeoLocation(geo);
    }

    const getMeusEnderecos = async () => {
        const json = await API.getEndereco(
            props.jwt
        )
        props.setMeusEnderecos(json.InfoEndereco);

        let key = json.InfoEndereco.findIndex((item)=> item.StEntrega == 1);

        if (key > -1){
            let item = json.InfoEndereco[key];
            let DsEndereco = `${item.DsLogradouro}, ${item.NrNumero} - ${item.DsBairro} , ${item.DsCidade} / ${item.CdUF} - CEP:${item.DsCEP}`;
            props.setEnderecoAtivo(DsEndereco);
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            VerificaLogin();
        }, 500);
        
    })

    return(
        <Container>
            <AreaLogo>
                <Logo  source={require('../assets/images/Logo.png')}/>
            </AreaLogo>
            <AreaCarregamento>
                <TextLoading>autenticando.....</TextLoading>
                <Loading />
            </AreaCarregamento>
            
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        jwt:state.userReducer.jwt 
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        setGeoLocation:(GeoEndereco)=>dispatch({type:'SET_GEOENDERECO', payload:{GeoEndereco}}),
        setMeusEnderecos:(MeusEnderecos)=>dispatch({type:'SET_MEUSENDERECOS', payload:{MeusEnderecos}}),
        setEnderecoAtivo:(EnderecoAtivo)=>dispatch({type:'SET_ENDERECOATIVO', payload:{EnderecoAtivo}}),
        setcarCompra:(ListCarCompra)=>dispatch({type:'SET_LISTCARCOMPRA', payload:{ListCarCompra}}),
        setClearJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
        setEndereco:(Endereco)=>dispatch({type:'SET_ENDERECO', payload:{Endereco}}),
        setQtProdutoCar:(QtProdutoCar)=>dispatch({type:'SET_QTPRODUTOCAR', payload:{QtProdutoCar}}),
        setSignOut:()=>dispatch(SignOut()),
        setListProductsCategory:(ListProductsCategory)=>dispatch({type:'SET_LISTPRODUCTSCATEGORY', payload:{ListProductsCategory}}),
        setListCategory:(ListCategory)=>dispatch({type:'SET_LISTCATEGORY', payload:{ListCategory}}),
        setNmCategoria:(NmCategoria)=>dispatch({type:'SET_NMCATEGORIA', payload:{NmCategoria}}),
        setIdategoria:(IdCategoria)=>dispatch({type:'SET_IDCATEGORIA', payload:{IdCategoria}}),
        setInfoUsuario:(infoUsuario)=>dispatch({type:'SET_INFOUSUARIO', payload:{infoUsuario}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Preload);