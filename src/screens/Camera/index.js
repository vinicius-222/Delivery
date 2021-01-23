import React, { useState, useEffect } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import {
    Area,
    Button,
    Text
} from './styled';

const Camera = (props) => {

    const [Album, setAlbum] = useState([]);
    const getfoto = () => {
        CameraRoll.getPhotos({
            
        })
    }


    return(
        <Area>
            <Button onPress={()=>getfoto()}>
                <Text>Foto</Text>
            </Button>
        </Area>
    )
}

Camera.navigationOptions = ({navigation}) =>{
    return{
        headerShown:true,
        headerTitle:'Galeria'
    }
}

export default Camera;