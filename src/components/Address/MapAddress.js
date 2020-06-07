import React, { useEffect, useState, useRef} from 'react';
import { StatusBar } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import { MapsAPI } from '../../config';
import MapView , {PROVIDER_GOOGLE, Polygon } from 'react-native-maps';

const Container =  styled.View`
    margin-top:10px;
    margin-bottom:15px;
    width:100%;
    height:500px;
    background-color:#EEE;
`;
const AreaLegenda = styled.View`
    flex-direction:row;
    justify-content:space-between;
    height:35px;
    width:130px;
`;
const RowLegenda = styled.View`
    justify-content:center;
    flex-direction:row;
    background-color:#FFF;
    height:35px;
    width:100%;
`;
const ShapeLegenda = styled.View`
    height:18px;
    width:18px;
    border-radius:9px;
    background-color:${props=>props.color};
`;
const TextLegenda = styled.Text`
    margin-left:5px;
`;
const RealingMap = styled.TouchableHighlight`
    position:absolute;
    height:35px;
    width:35px;
    bottom:30px;
    right:30px;
`;

const RealingMapTxt = styled.Image`
    height:35px;
    width:35px;
    resizeMode:contain;
`;

const AreaInfo = styled.View`
    background-color:#FFF;
    flex-direction:row;
    justify-content:center;
    height:40px;
    width:100%;
`;
const AreaInfoDetail = styled.View`
    align-items:center;
    height:60px;
    width:33%;
`;
const TextTitle = styled.Text``;
const TextDetail = styled.Text``;



const MapAddress = (props) => {
    const api = useSalatoDeliveryAPI();
    const map = useRef();
    const [polygon, setPoygon]  = useState(props.PolygonCordenates);
    const [toLoc, setToLoc] = useState({
        center:{
            latitude:0,
            longitude:0
        }
    });
    const [fromLoc, setFromLoc] = useState({});
    const [mapLoc, setMapLoc] = useState(props.MapCameraLocation);
    const [showDirections, setShowDirections] = useState(false);
    const [changeMap, setChangeMap] =  useState(false);
    const [RequestDistance, setRequestDistance] = useState(0);
    const [RequestTime, setRequestTime] = useState(0);
    const [RequestPrice, setRequestPrice] = useState(0);

    const handleMapChange = async () => {

        if (mapLoc.center.lat !== 0){
            const cam = await map.current.getCamera();
            cam.altitude = 0;
            if (cam !== mapLoc){
                setChangeMap(true); 
            }
            setMapLoc(cam);
        }
       
    }

    const ActionRealingMap = () => {
        map.current.fitToSuppliedMarkers(['mk1', 'mk2'], {edgePadding:
            {left:30,
            right:30,
            bottom:30,
            top:Platform.OS === 'ios' ? 100 : 300},
            animated:true
            })
    }

    const handleDirectionsReady = async (r) => {
        setRequestDistance( r.distance );
        setRequestTime( r.duration );

        const priceReq = await api.getRequestPrice( r.distance );
        if(!priceReq.error) {
            setRequestPrice( priceReq.valor );
            setTimeout(()=>{
                AtualizaValores();
            },1000)
            
         }

        map.current.fitToCoordinates(r.coordinates, {
            edgePadding:{
                left:30,
                right:30,
                bottom:30,
                top:Platform.OS === 'ios' ? 50 : 300 
            }
        });

        setMapLoc({
            center:{
                latitude:toLoc.center.latitude,
                longitude:toLoc.center.longitude
            },
            zoom:19,
            pitch:0,
            altitude:0,
            heading:0
        });
    }
    
    const AtualizaValores = () => {
        props.setLatitude(toLoc.center.latitude);
        props.setLongitude(toLoc.center.longitude);
        props.setDistancia(RequestDistance);
        props.setTempo(RequestTime);   
    }

    useEffect(()=>{
        props.setValor(RequestPrice);
    },[RequestPrice])

    useEffect(() => {
        setToLoc({})
        if (props.carregaInfo){
            setTimeout(()=>{
                setToLoc({
                    center:{ 
                        latitude: props.geometry.lat, 
                        longitude: props.geometry.lng
                    },
                    zoom:14,
                    pitch:0,
                    altitude:0,
                    heading:0
                })
            },800)
        }   
    },[props.geometry.lng]);

    useEffect(()=>{
        if(fromLoc.center && toLoc.center) {
            setShowDirections(true);
        }
        
    }, [toLoc]);

    useEffect(()=> {
        setFromLoc(props.MapCameraLocation);
    },[])

    return(
        <Container>
            <StatusBar barStyle="dark-content" />
            <AreaLegenda>
                <RowLegenda>
                    <ShapeLegenda color="#A2A3E6"></ShapeLegenda>
                    <TextLegenda>Area de Entrega</TextLegenda>
                </RowLegenda>
                <RowLegenda>
                    <ShapeLegenda color="#FF0000"></ShapeLegenda>
                    <TextLegenda>Nossa Loja</TextLegenda>
                </RowLegenda>
                <RowLegenda>
                    <ShapeLegenda color="#00FF00"></ShapeLegenda>
                    <TextLegenda>Seu Endereco</TextLegenda>
                </RowLegenda>
            </AreaLegenda>
            {showDirections &&
            <AreaInfo>
                <AreaInfoDetail>
                    <TextTitle>Distancia</TextTitle>
                    <TextDetail>{RequestDistance}</TextDetail>
                </AreaInfoDetail>
                <AreaInfoDetail>
                    <TextTitle>Tempo</TextTitle>
                    <TextDetail>{RequestTime.toFixed(0)} Min</TextDetail>
                </AreaInfoDetail>
                <AreaInfoDetail>
                    <TextTitle>Preco</TextTitle>
                    <TextDetail>R$ {RequestPrice.toFixed(2)}</TextDetail>
                </AreaInfoDetail>
            </AreaInfo>
            }
            
            <MapView
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLoc}
                moveOnMarkerPress={true}
                onRegionChangeComplete={handleMapChange}
                onPress={(e)=>{
                    setToLoc({
                        center:{ 
                            latitude:e.nativeEvent.coordinate.latitude , 
                            longitude:e.nativeEvent.coordinate.longitude
                        },
                        zoom:14,
                        pitch:0,
                        altitude:0,
                        heading:0   
                    })
                    AtualizaValores();
                }}
            >
                <Polygon
                    style={{color:"#00ff00", opacity:0.1}}
                    coordinates={polygon}
                    fillColor={Platform.OS == 'ios' ? '' : ''}
                    strokeColor="rgba(0,0,0,0.5)"
                    strokeWidth={1}
                    geodesic={true}
                />

                {fromLoc.center &&
                    <MapView.Marker identifier={'mk1'} pinColor="red"  coordinate={fromLoc.center} />
                }

                {toLoc.center &&
                    <MapView.Marker identifier={'mk2'} pinColor="green" coordinate={toLoc.center} />
                }

                {showDirections &&
                    <MapViewDirections
                        origin={fromLoc.center}
                        destination={toLoc.center}
                        strokeWidth={5}
                        strokeColor="#FF0000"
                        apikey={MapsAPI}
                        onReady={handleDirectionsReady}
                    />
                }

            </MapView>
            {changeMap &&
             <RealingMap onPress={ActionRealingMap} underlayColor="transparent">
                 <RealingMapTxt  source={require('../../assets/images/Target.png')}/>
             </RealingMap>
            }
        </Container>
    )
}

const MapStateToProps = (state) => {
    return{
        PolygonCordenates:state.enderecoReducer.PolygonCordenates,
        MapCameraLocation:state.enderecoReducer.MapCameraLocation
    }
}

const MapDispatchToProps = (dispatch) => {
    return{
        setPolygonCordenates:(PolygonCordenates)=>dispatch({type:'SET_POLYGONCORDENATES', payload:{PolygonCordenates}}),
        setMapCameraLocation:(MapCameraLocation)=>dispatch({type:'SET_MAPCAMERALOCATION', payload:{MapCameraLocation}}),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(MapAddress);