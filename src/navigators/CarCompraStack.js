import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import CarCompra from '../screens/CarCompra';
import Pagamento from '../screens/Payment';
import Camera from '../screens/Camera';

export default createAppContainer(createStackNavigator({
    CarCompra:{
        screen:CarCompra
    },
    Pagamento:{
        screen:Pagamento
    },
    Camera:{
        screen:Camera
    }
},{ defaultNavigationOptions:{
        gesturesEnabled:true
    }
}));