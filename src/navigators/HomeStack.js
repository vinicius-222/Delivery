import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Home from '../screens/Home';
import Checkout from '../screens/Checkout';
import CarCompra from '../screens/CarCompra';
import MapLocation from '../screens/MapLocation';

export default createAppContainer(createStackNavigator({
    Home:{
        screen:Home,
        title:'Principal',
        
    },
    Checkout:{
        screen:Checkout,
        title:'Checkout'
    },
    MapLocation:{
        screen:MapLocation,
        title:'Checkout'
    },
},{
    defaultNavigationOptions:{
        headerShown:true,
        gesturesEnabled:true
        
    }
}));