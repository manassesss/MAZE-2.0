import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './components/Menu'
import Test from './screens/Test'

type RootStackParamList = {
    Menu: undefined;
    Test: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator
        >
            <Stack.Screen name='Menu' component={Menu}/> 
            <Stack.Screen name='Test' component={Test}/>   
        </Stack.Navigator> 
    </NavigationContainer>
  );
};