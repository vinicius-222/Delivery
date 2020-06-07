import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import TabBarCuston from '../components/TabBarCuston';
import styled from 'styled-components/native';

import HomeStack from '../navigators/HomeStack';
import SearchStack from '../navigators/SearchStack';
import CarCompraStack from '../navigators/CarCompraStack';
import ContaStack from './ContaStack';
import TabBarIcon from '../components/TabBarIcon';

const Imagen = styled.Image`
    height:25px;
    width:25px;
    resizeMode:contain;
`;

export default  createBottomTabNavigator({
    HomeStack:{
        screen:HomeStack,
        navigationOptions:{
            tabBarLabel:'Principal',
            tabBarIcon:({focused, tintColor})=>{
                return <Imagen source={focused ? require('../assets/images/home_active.png') : require('../assets/images/home_inactive.png') }/>
            }
        }
    },
    SearchStack:{
        screen:SearchStack,
        navigationOptions:{
            tabBarLabel:'Buscar',
            tabBarIcon:({focused, tintColor})=>{
                return <Imagen source={focused ? require('../assets/images/lupa1.png') : require('../assets/images/lupa1.png') }/>
            }
        }
    },
    CarCompraStack:{
        screen:CarCompraStack,
        navigationOptions:{
            tabBarLabel:'Carrinho',
            tabBarIcon:({focused, tintColor})=>{
                return <TabBarIcon focused={focused} route="CarCompraStack" bedge={5}/>
            }
        }
    },
    ContaStack:{
        screen:ContaStack,
        navigationOptions:{
            tabBarLabel:'Conta',
            tabBarIcon:({focused, tintColor})=>{
                return <Imagen source={focused ? require('../assets/images/conta_active.png') : require('../assets/images/conta_inative.png') } /> 
            }
        }
    }
}, {
    defaultNavigationOptions:{
       
    }
}); 