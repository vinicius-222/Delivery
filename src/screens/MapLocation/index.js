import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator, Platform, Dimensions } from 'react-native';
import MapView , {PROVIDER_GOOGLE, Polygon, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import { MapsAPI } from '../../config';
import useSalatoDeliveryAPI from '../../useSalatoDeliveryAPI';
import AddressModal from '../../components/Address/AddressModal';
import DriverModal from '../../components/DriverModal';
import {
    Container,
    MenuArea,
    MenuImage,
    IntineraryArea,
    IntineraryItem,
    IntineraryLabel,
    IntineraryPoint,
    IntineraryTitle,
    IntineraryValue,
    IntineraryPlaceHolder,
    RequestDetails,
    RequestDetail,
    RequestTitle,
    RequestValue,
    RequestButtons,
    RequestButton,
    RequestButtonText,
    LoadingArea,
    RealingMap,
    RealingMapTxt
} from './styled';

const Page = (props) => {
    const map = useRef();
    const api = useSalatoDeliveryAPI(props);
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const [polygon, setPoygon]  = useState([
        {
            latitude: -22.666489,
            longitude: -43.039147
        },
        {
            latitude: -22.671901,
            longitude: -43.034527
        },
        {
            latitude: -22.667332, 
            longitude: -43.025091
        },
        {
            latitude: -22.661063, 
            longitude:-43.024608
        },
        {
            latitude: -22.651241,
            longitude:  -43.021947
        },
        {
            latitude: -22.639438, 
            longitude: -43.028127
        },
        {
            latitude: -22.638408, 
            longitude:  -43.033191
        },
        {
            latitude: -22.646884,
            longitude:  -43.043919
        },
        {
            latitude: -22.651399,
            longitude:  -43.051601
        },
        {
            latitude:  -22.659558,
            longitude:  -43.051430
        }, 
    ]);
    const [fromLoc, setFromLoc] = useState({
        center:{ 
            latitude: -22.662266,
            longitude:-43.050184
        },
        zoom:14,
        pitch:0,
        altitude:0,
        heading:0
    });
    const [toLoc, setToLoc] = useState({
        center:{ 
            latitude: -22.657159,
            longitude:-43.038190
        },
        zoom:14,
        pitch:0,
        altitude:0,
        heading:0
    });
    const [showDirections, setShowDirections] = useState(false);
    const [requestDistance, setRequestDistance] = useState(0);
    const [requestTime, setRequestTime] = useState(0);
    const [requestPrice, setRequestPrice] = useState(0);

    const [modalTitle, setModalTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalField, setModalField] = useState('');

    const [driverInfo, setDriverInfo] = useState({});
    const [driverModalVisible, setDriverModalVisible]= useState(false);

    const [loading, setLoading] = useState(false);
    const [changeMap, setChangeMap] =  useState(false);

    const [mapLoc, setMapLoc] = useState({
        center:{
            latitude:-22.657159,
            longitude:-43.038190
        },
        zoom:14,
        pitch:0,
        altitude:0,
        heading:0
    });

    const [mapLocPolygno, setmapLocPolygno] = useState({
        center:{
            LATITUDE:-22.5832,
            LONGETUDE:-43.0565
        },
        zoom:17,
        pitch:0,
        altitude:0,
        heading:0
    });

    useEffect(()=>{
        Geocoder.init(MapsAPI, {language:'pt-br'});
        getMyCurrentPosition();
    }, []);

    useEffect(()=>{
        if(fromLoc.center && toLoc.center) {
            setShowDirections(true);
        }
    }, [toLoc]);

    useEffect(()=>{
        if(fromLoc.center) {
            setMapLoc(fromLoc);
        }
    }, [fromLoc]);

    const getMyCurrentPosition = () => {
        Geolocation.getCurrentPosition(async (info)=>{

            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);

            if(geo.results.length > 0) {
                const loc = {
                    name:geo.results[0].formatted_address,
                    center:{
                        latitude:info.coords.latitude,
                        longitude:info.coords.longitude
                    },
                    zoom:18,
                    pitch:0,
                    altitude:0,
                    heading:0
                };

                //setMapLoc(loc);
                //setFromLoc(mapLoc);

            }

        }, (error)=>{

        });
    }

    const handleFromClick = () => {
        setModalTitle('Escolha uma origem');
        setModalField('from');
        setModalVisible(true);
    }

    const handleToClick = async () => {
        setModalTitle('Escolha um destino');
        setModalField('to');
        setModalVisible(true);
    }

    const handleDirectionsReady = async (r) => {
        setRequestDistance( r.distance );
        setRequestTime( r.duration );

        const priceReq = await api.getRequestPrice( r.distance );
        if(!priceReq.error) {
            setRequestPrice( priceReq.price );
        }

        map.current.fitToCoordinates(r.coordinates, {
            edgePadding:{
                left:50,
                right:50,
                bottom:50,
                top:Platform.OS === 'ios' ? 50 : 1100 
            }
        });
    }

    const handleRequestGo = async () => {
        setLoading(true);
        const driver = await api.findDriver({
            fromlat:fromLoc.center.latitude,
            fromlng:fromLoc.center.longitude,
            tolat:toLoc.center.latitude,
            tolng:toLoc.center.longitude
        });
        setLoading(false);

        if(!driver.error) {
            setDriverInfo(driver.driver);
            setDriverModalVisible(true);

            handleRequestCancel();
        } else {
            alert(driver.error);
        }
    }

    const handleRequestCancel = () => {
        setToLoc({});
        setShowDirections(false);
        setRequestDistance(0);
        setRequestTime(0);
        setRequestPrice(0);

        setMapLoc(fromLoc);
    }

    const handleMapChange = async () => {
        const cam = await map.current.getCamera();
        cam.altitude = 0;
        if (cam !== mapLoc){
            setChangeMap(true);
        }
        setMapLoc(cam);
    }

    const handleModalClick = (field, address) => {
        const loc = {
            name:address.address,
            center:{
                latitude:address.latitude,
                longitude:address.longitude
            },
            zoom:14,
            pitch:0,
            altitude:0,
            heading:0
        };

        switch(field) {
            case 'from':
                setFromLoc({});
                setTimeout(()=>{
                    setFromLoc(loc);
                },200)
                break;
            case 'to':
                setToLoc({});
                setTimeout(()=>{
                    setToLoc(loc);
                },200)
                break;
        }
    }

    const handleMenu = () => {
        props.navigation.openDrawer();
    }

    const ActionRealingMap = () => {
        map.current.fitToSuppliedMarkers(['mk1', 'mk2'], {edgePadding:
            {left:50,
            right:50,
            bottom:50,
            top:Platform.OS === 'ios' ? 400 : 1100},
            animated:true
            })
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <DriverModal
                driver={driverInfo}
                visible={driverModalVisible}
                visibleAction={setDriverModalVisible}
            />
             <AddressModal
                title={modalTitle}
                visible={modalVisible}
                visibleAction={setModalVisible}
                field={modalField}
                clickAction={handleModalClick}
            />
            <MapView
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLoc}
                onRegionChangeComplete={handleMapChange}
            >

                <Polygon
                    coordinates={polygon}
                    fillColor="#00FF00"
                    strokeColor="rgba(0,0,0,0.5)"
                    strokeWidth={1}
                    
                />
                {fromLoc.center &&
                    <MapView.Marker identifier={'mk1'} pinColor="red" coordinate={fromLoc.center} />
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
            <MenuArea onPress={handleMenu} underlayColor="transparent">
                <MenuImage source={require('../../assets/images/menu.png')} />
            </MenuArea>
           
            <IntineraryArea>
                {loading &&  
                <IntineraryItem onPress={handleFromClick} underlayColor="#EEE">
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint color="#0000FF" />
                            <IntineraryTitle>Origem</IntineraryTitle>
                        </IntineraryLabel>
                        {fromLoc.name &&
                            <IntineraryValue>{fromLoc.name}</IntineraryValue>
                        }
                        {!fromLoc.name &&
                            <IntineraryPlaceHolder>Escolha um local de origem</IntineraryPlaceHolder>
                        }
                    </>
                </IntineraryItem>}
                {loading &&  
                <IntineraryItem onPress={handleToClick} underlayColor="#EEE">
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint color="#00FF00" />
                            <IntineraryTitle>Destino</IntineraryTitle>
                        </IntineraryLabel>
                        {toLoc.name &&
                            <IntineraryValue>{toLoc.name}</IntineraryValue>
                        }
                        {!toLoc.name &&
                            <IntineraryPlaceHolder>Escolha um local de destino</IntineraryPlaceHolder>
                        }
                    </>
                </IntineraryItem>}
                {fromLoc.center && toLoc.center &&
                    <IntineraryItem>
                        <>
                            <RequestDetails>
                                <RequestDetail>
                                    <RequestTitle>Distância</RequestTitle>
                                    <RequestValue>{requestDistance > 0?`${requestDistance.toFixed(1)}km`:'--'}</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Tempo</RequestTitle>
                                    <RequestValue>{requestTime > 0?`${requestTime.toFixed(0)}mins`:'--'}</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Preço</RequestTitle>
                                    <RequestValue>{requestPrice > 0?`R$ ${requestPrice.toFixed(2)}`:'--'}</RequestValue>
                                </RequestDetail>
                            </RequestDetails>
                            {loading &&  
                            <RequestButtons>
                                <RequestButton color="#00FF00" onPress={handleRequestGo}>
                                    <RequestButtonText>Solicitar Motorista</RequestButtonText>
                                </RequestButton>
                                <RequestButton color="#FF0000" onPress={handleRequestCancel}>
                                    <RequestButtonText>Cancelar</RequestButtonText>
                                </RequestButton>
                            </RequestButtons>}
                        </>
                    </IntineraryItem>
                }
            </IntineraryArea>
            {loading &&
                <LoadingArea>
                    <ActivityIndicator size="large" color="#FFF" />
                </LoadingArea>
            }
            {changeMap &&
             <RealingMap onPress={ActionRealingMap} underlayColor="transparent">
                 <RealingMapTxt  source={require('../../assets/images/Target.png')}/>
             </RealingMap>
            }
             
        </Container>
    );
}
export default Page;