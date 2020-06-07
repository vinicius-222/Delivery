import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;
const HeaderTitle = styled.Text`
    color:#000;
    font-size:16px;
`;

const HeaderPerfil = (props) => {
  
    return(
        <Container>
            <HeaderTitle>Olá, {props.infoUsuario[0].NmPessoa}</HeaderTitle>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        infoUsuario:state.userReducer.infoUsuario
    }
}

export default connect(mapStateToProps)(HeaderPerfil);