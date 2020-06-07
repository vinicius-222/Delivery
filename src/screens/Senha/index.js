import React, { useState }from 'react'
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import {
    Scrol,
    AreaSafe,
    Container,  
    AreaTopoEnd,
    TxtTopo,
    Body,
    Line,
    TextInf,
    Input,
    Txt,
    AreaButton,
    ButtonSalvar,
    TxtSalvar
} from './styled';

const Senha = (props) => {
    const api = useSalatoDeliveryAPI(props);
    const [pass, setPass] = useState('');
    const [newPass, setnewPass] = useState('');
    const [confnewPass, setConfnewPass] = useState('');
    const [loading, setLoading] = useState(false);

    const LimpaSenhas = () =>{
        setPass('');
        setnewPass('');
        setConfnewPass('');
    }
    const AtualizaSenha = async () =>{
        if (newPass != confnewPass){
            return alert('Senhas nao conferem, por favor confira as senhas!!')
        }else{
            setLoading(true);
            let r = await api.updatePass(props.jwt, props.hash, props.infoUsuario[0].DsLogin, pass, newPass);
            if (!r.error){
                props.setJwt(r.jwt);
                LimpaSenhas();
                alert(r.retorno);
                setLoading(false);
                props.navigation.goBack();
            }else{
                alert(r.error);
                setLoading(false);
            }
            
        }
    }

    return(
        <Scrol>
            {loading && <Loading />}
            <AreaSafe>
                <Container>
                    <Body>
                        <TextInf style={{color:'#FF0000'}}>Senha Atual:</TextInf>   
                        <Input value={pass} secureTextEntry={true} onChangeText={(v) =>(setPass(v))}/>
                        <TextInf style={{color:'#008000', marginTop:10}}>Nova Senha:</TextInf>   
                        <Input value={newPass} secureTextEntry={true} onChangeText={(v)=>(setnewPass(v))}/>
                        <TextInf style={{color:'#008000'}}>Confirmar Nova Senha:</TextInf>   
                        <Input value={confnewPass} secureTextEntry={true} onChangeText={(v)=>(setConfnewPass(v))}/>
                    </Body>
                    <AreaButton>
                        <ButtonSalvar underlayColor='#CCCCCC' onPress={()=>AtualizaSenha()}>  
                                <TxtSalvar >Salvar</TxtSalvar>
                        </ButtonSalvar>
                    </AreaButton>
                </Container>
            </AreaSafe>
        </Scrol>
    )
}

Senha.navigationOptions = (props) =>{
    return{
        headerTitle:'Senha'
    }
}

const mapStateToProps = (state) => {
    return{
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
        infoUsuario:state.userReducer.infoUsuario
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        setJwt:(jwt)=>dispatch({type:'SET_JWT', payload:{jwt}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Senha);

