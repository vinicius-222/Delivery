import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import CarCompra from '../screens/CarCompra';
import Pagamento from '../screens/Payment';

export default createAppContainer(createStackNavigator({
    CarCompra:{
        screen:CarCompra
    },
    Pagamento:{
        screen:Pagamento
    }
},{ defaultNavigationOptions:{
        gesturesEnabled:true
    }
}));