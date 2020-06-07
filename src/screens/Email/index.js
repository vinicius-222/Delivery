import React, {useState}from 'react';
import { connect } from 'react-redux';
import {
    Scrol,
    AreaSafe,
    Container,
    AreaTopoEnd,
    TxtTopo,
    Line,
    TextInf,
    Input,
    Body,
    Txt,
    AreaButton,
    ButtonSalvar,
    TxtSalvar
} from './styled';

const Email = (props) =>{
    const [email, setEmail] = useState('');
    const [confEmail, setCongEmail] = useState('');
    return(
        <Scrol>
            <AreaSafe>
                <Container>
                    <Body>
                        <TextInf style={{color:'#FF0000'}}>Email Atual:</TextInf>   
                        <Input value={props.infoUsuario[0].DsLogin} keyboardType='email-address' onChangeText={()=>{}}/>
                        <TextInf style={{color:'#008000', marginTop:5}}>Novo email:</TextInf>   
                        <Input value={email} keyboardType='email-address' onChangeText={(i)=>setEmail(i)}/>
                        <TextInf style={{color:'#008000'}}>Confirmar Novo email:</TextInf>   
                        <Input value={confEmail} keyboardType='email-address' onChangeText={(i)=>setCongEmail(i)}/>
                    </Body>
                    <AreaButton>
                        <ButtonSalvar underlayColor='#CCCCCC' onPress={() => {}}>
                                <TxtSalvar >Salvar</TxtSalvar>
                        </ButtonSalvar>
                    </AreaButton>
                </Container>
            </AreaSafe>
        </Scrol>
    )
}

Email.navigationOptions = () => {
    return{
        headerTitle:'E-mail',
    }
}

const mapStateToProps = (state) => {
    return {
        infoUsuario:state.userReducer.infoUsuario
    }    
};

export default connect(mapStateToProps)(Email);
