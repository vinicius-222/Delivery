import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Category from '../screens/Category';
import Search from '../screens/Search';
import Checkout from '../screens/Checkout';
import SearchItem from '../screens/SearchItem';

export default createAppContainer(createStackNavigator({
    Category:{
        screen:Category,
    },
    Search:{
        screen:Search,
    },
    SearchItem:{
        screen:SearchItem
    },
    Checkout:{
        screen:Checkout,
        title:'Checkout'
    }
},{
    defaultNavigationOptions:{
        gesturesEnabled:true
    }
}));