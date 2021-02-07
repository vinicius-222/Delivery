import React, { useState, useEffect } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
    Area,
    Button,
    Text,
    AreaScroll,
    AreaPhoto,
    ImagePhoto,
    ButtonEscolher,
    Circulo,
    CirculoAtivo,
    AreaPhotoItem,
    ButtonSelect
} from './styled';

const Camera = (props) => {

    const [Album, setAlbum] = useState([]);
    const [Dimen, setDimen] = useState(0);
    const [ativo, setAtivo] = useState(null);
    const [Select, setSelect] = useState({});
    
    const getfoto = () => {
        CameraRoll.getPhotos({
            first:100,
            assetType:'Photos'
        }).then((r)=>{
            setAlbum(r.edges);   
        })
    }

    useEffect(()=>{
        getfoto();
        setDimen(Math.round(Dimensions.get('window').width) / 3);
    },[])

    return(
        <Area>
            <AreaScroll>
                <AreaPhoto>
                    {Album.map((obj, i) => (
                        <ButtonSelect width={Dimen} onPress={()=>{
                            setAtivo(obj.node.image.uri);
                            setSelect(obj.node.image)
                        }} > 
                            <AreaPhotoItem width={Dimen}>
                                <Circulo>
                                    <CirculoAtivo active={obj.node.image.uri == ativo}></CirculoAtivo>
                                </Circulo>
                                <ImagePhoto key={i} width={Dimen} source={{uri:obj.node.image.uri}}/>
                            </AreaPhotoItem>
                        </ButtonSelect>
                    ))}
                </AreaPhoto>
            </AreaScroll>
            <ButtonEscolher onPress={()=>{
                props.setImageProduto(Select);
                props.navigation.goBack()
            }}>
                <Text>Escolher</Text>
            </ButtonEscolher>
        </Area>
    )
}

Camera.navigationOptions = ({navigation}) =>{
    return{
        headerShown:true,
        headerTitle:'Galeria'
    }
}
const mapStateToProps = (state) => {
    return{
        ImageProduto:state.carReducer.ImageProduto
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setImageProduto:(ImageProduto)=>dispatch({type:'SET_IMAGEPRODUTO', payload:{ImageProduto}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Camera);