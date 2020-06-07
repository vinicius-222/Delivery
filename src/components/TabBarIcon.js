import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const Area = styled.View`
    height:30px;
    width:30px;
    justify-content:center;
    align-items:center;
`;

const Imagem = styled.Image`
    height:25px;
    width:25px;

`;
const Texto = styled.Text`
    color:#FFF;
    font-size:10px;
`;

const AreaBedge = styled.View`
    height:16px;
    width:16px;
    justify-content:center;
    align-items:center;
    position:absolute;
    top:-1px;
    right:-12px;
    border-radius:15px;
    background-color:#FF0000;
`;


const TabBarIcon = (props) =>{


    return(
        <Area>
            {props.QtProdutoCar > 0 &&
                <AreaBedge>
                    <Texto>{props.QtProdutoCar}</Texto>
                </AreaBedge>
            }
            <Imagem source={props.focused ? require('../assets/images/pedidos_active.png') :require('../assets/images/pedidos_inative.png') }/>
        </Area>
    )
}

const mapStateToProps = (state) =>{
    return{
        QtProdutoCar:state.carReducer.QtProdutoCar
    }
}
export default connect(mapStateToProps)(TabBarIcon);