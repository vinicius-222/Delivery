import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Preload from '../screens/Preload';
import Login from '../screens/Login';
import PrincipalTabs from './PrincipalTabs';
import Lojas from '../screens/Lojas';

export default createAppContainer(createStackNavigator({
    Preload,
    Lojas,
    Login,
    PrincipalTabs
}, {
    initialRouteName:'Preload',
    defaultNavigationOptions:{
        header:null,
        gesturesEnabled:true
    }
}));