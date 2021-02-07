import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Category from '../screens/Category';
import Search from '../screens/Search';
import Checkout from '../screens/Checkout';
import SearchItem from '../screens/SearchItem';
import SubCategory from '../screens/SubCategory';

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
    },
    SubCategory:{
        screen:SubCategory,
    }
},{
    defaultNavigationOptions:{
        gesturesEnabled:true
    }
}));