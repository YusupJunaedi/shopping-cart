/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import BottomNavigator from './src/components/bottomTabNavigator/BottomNavigator';
import Home from './src/screen/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './src/screen/Cart';
import { Provider } from "react-redux";
import storeRedux from './src/redux';

const Stack = createStackNavigator();

const App = () => {
  return (
    // <>
    // <Cart />
    // </>
    <NavigationContainer>
      <Provider store={storeRedux}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="HomeApp" component={BottomNavigator} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>

  );
};


export default App;
