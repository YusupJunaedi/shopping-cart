import React from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../../screen/Home';
import Cart from '../../screen/Cart';
import {useSelector} from 'react-redux'
import { color } from 'react-native-reanimated';

const Tab = createMaterialBottomTabNavigator();


const BottomNavigator = ({navigation}) => {

  const listCart = useSelector(state => state.cart.data)

    return (
        <Tab.Navigator
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{backgroundColor: '#e93f1e'}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon name="home" size={25} />,
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: () => <Icon name="shopping-cart" size={25} />,
            tabBarBadge: listCart.length,
          }}
        />
      </Tab.Navigator>
    )
}

export default BottomNavigator
