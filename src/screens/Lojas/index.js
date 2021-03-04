import React,{ useEffect, useState} from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import { connect } from 'react-redux';
import { SignOut } from '../../helpers/AuthHandler';
import C from './styled';
import { Linking } from 'react-native';

const Lojas = (props) =>{
    const API = useSalatoDeliveryAPI(props);
    const [lojas, setLojas] = useState([]);

    const getLojas = async()=>{
        const json = await API.getLojas(
            props.jwt,
            props.hash
        );
        if(json.error){
            props.setSignOut();
        }else{
            setLojas(json.Lojas);
        }
    }

    const HandlerIr = (i) => {
        props.setMapCameraLocation(i)
        props.setPolygonCordenates(i.AreaEntrega)
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'PrincipalTabs'})
            ]
        }));
    }
    return(
        
            <C.ImageBackgroundArea source={require('../../assets/images/fundo.png')}>
                <C.Container>
                    <C.AreaTopo>
                        <C.LogoImage source={require('../../assets/images/Logo.png')}/>
                    </C.AreaTopo>
                    <C.AreaScroll>
                        {props.infoLojas.map((i,k) =>(
                            <C.ContainerLoja key={k}>
                                <C.Titulo>{i.nome}</C.Titulo>
                                <C.Endereco>{i.endereco}</C.Endereco>
                                <C.Endereco>{i.horarioSemana}</C.Endereco>
                                <C.Endereco>{i.horarioSabado}</C.Endereco>
                                <C.Endereco>{i.telefone} WhatsApp</C.Endereco>
                                <C.Endereco style={{color:'blue'}} onPress={()=> Linking.openURL(i.link)}>Cique aqui e vá direto ao WhatsApp</C.Endereco>
                                <C.AreaButton>
                                    <C.BotaoIrPrincipalTabs onPress={()=>HandlerIr(i)} underlayColor='#EEE'>
                                        <C.ImageButton source={require('../../assets/images/ir.png')}/>
                                    </C.BotaoIrPrincipalTabs>
                                </C.AreaButton>
                            </C.ContainerLoja>  
                        ))}
                    </C.AreaScroll>
                </C.Container>
            </C.ImageBackgroundArea>
    )
}

const mapStateToProps = (state) => {
    return{
        mapCameraLocationL:state.enderecoReducer.MapCameraLocation,
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
        infoLojas:state.userReducer.infoLojas,
    }
} 

const mapDispatchToProps = (dispatch) => {
    return{
        setMapCameraLocation:(MapCameraLocation)=>dispatch({type:'SET_MAPCAMERALOCATION', payload:{MapCameraLocation}}),
        setPolygonCordenates:(PolygonCordenates)=>dispatch({type:'SET_POLYGONCORDENATES', payload:{PolygonCordenates}}),
        setSignOut:()=>dispatch(SignOut()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Lojas);