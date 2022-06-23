import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './components/Menu'
import Stock from './screens/Stock'

type RootStackParamList = {
    Menu: undefined;
    Stock: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen name='Menu' component={Menu}/> 
            <Stack.Screen name='Stock' component={Stock}/>   
        </Stack.Navigator> 
    </NavigationContainer>
  );
};