import { createStackNavigator } from 'react-navigation-stack';

import ContaItem from '../screens/ContaItem';
import Perfil from '../screens/Perfil';
import Senha from '../screens/Senha';
import Email from '../screens/Email';
import Conta from '../screens/Conta';
import Pedidos from '../screens/Pedidos';


const ContaStack = createStackNavigator({
    Perfil:{
        screen:Perfil,
    },
    Conta:{
        screen:Conta
    },
    Senha:{
        screen:Senha
    },
    Email:{
        screen:Email
    },
    Pedidos:{
        screen:Pedidos
    }
},{
    defaultNavigationOptions:{
        gesturesEnabled:true
    }
});

export default ContaStack;