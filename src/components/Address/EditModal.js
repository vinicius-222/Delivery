import React, { useState } from 'react';
import styled from 'styled-components/native';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import { connect } from 'react-redux';
import UpdateAddressModal from './UpdateAddressModal';

const Container = styled.View`
    flex:1;
    justify-content:flex-end;
    align-items:flex-end;
    background-color:#000;
    opacity:0.3px;
`;

const AreaModal = styled.View`
    height:200px;
    width:100%;
    background-color:#FFF;
    padding:15px;  
`;

const Title = styled.Text`
    color:#FFF;
`;

const CloseButton = styled.TouchableHighlight`
    height:30px;
    width:30px;
    border-radius:15px;
    background-color:#FF0000;
    justify-content:center;
    align-items:center;

`;

const ModalTeste = styled.Modal`
    background-color:#FFF;
`;
const AreaButton = styled.View`
    height:80px;
    flex-direction:row;
    justify-content:center;
`;
const ButtonAction = styled.TouchableHighlight`
    height:40px;
    width:130px;
    border:0.8px solid #FF0000;
    background-color:#F2F2F2;
    margin:0px 30px;
    border-radius:5px;
    justify-content:center;
    align-items:center;
`;
const ButtonText = styled.Text`
    color:#FF0000;
    font-size:18px;
`;


const EditModal = (props) => {
    const api = useSalatoDeliveryAPI();
    const [modalEditVisible, setModalEditVisible] = useState(false);
    
    const handleCloseAction = () =>{
         props.visibleAction(false);
    }

    const HandleDeleteItem = async(IdEndereco, k) => {
       const json = await api.deleteEndereco(props.jwt, IdEndereco, props.hash);
        if (!json.error){
            props.ActionDeleteClick(k);
            props.visibleAction(false);
        }
    }
    
    const ActionUpdateEndereco = (IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega,
                                  TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario, k, DsLatitude, DsLongitude, NrDistancia, NrTempo, VlValor) => {
        props.ActionUpdateClick(IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega, 
                                TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario, k, DsLatitude, DsLongitude, NrDistancia, NrTempo, VlValor);
        props.visibleAction(false);
    }

    return(
        <ModalTeste
            animationType="fade"
            transparent={true}
            visible={props.visible}
        >   
        <UpdateAddressModal 
            title="Editar"
            visible={modalEditVisible}
            visibleAction={setModalEditVisible}
            data={props.data}
            k={props.k}
            ActionUpdate={ActionUpdateEndereco}
        />
        <Container>
        </Container>
            <AreaModal>
                <CloseButton onPress={()=>handleCloseAction()}>
                    <Title>X</Title>
                </CloseButton>
                <AreaButton>
                    <ButtonAction onPress={()=>setModalEditVisible(true)} underlayColor="transparent">
                        <ButtonText>Editar</ButtonText>
                    </ButtonAction>
                    <ButtonAction onPress={()=>HandleDeleteItem(props.data.IdEndereco, props.k)} underlayColor="transparent">
                        <ButtonText>Excluir</ButtonText>
                    </ButtonAction>
                </AreaButton>
            </AreaModal>
        </ModalTeste>
    )
}

const mapStateToProps = (state) =>{
    return{
        jwt:state.userReducer.jwt,
        hash:state.userReducer.hash,
    }
}

export default connect(mapStateToProps)(EditModal);