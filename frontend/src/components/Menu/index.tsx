import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from 'react-native'
import Test from '../../screens/Test';
import Test2 from '../../screens/Test2';
import Test3 from '../../screens/Test3';

type RoutesList = {
    Stock: undefined;
    Schedule: undefined;
    Products: undefined;
};


const SCREEN_WIDTH = Dimensions.get("window").width;
const iconSize = SCREEN_WIDTH * 0.05;
const Tab = createMaterialBottomTabNavigator<RoutesList>();


export default function Menu() {

    return(
        <Tab.Navigator
        shifting
        initialRouteName="Schedule"
        activeColor='#F07B77'
        inactiveColor='#9C9C9C'
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color}) => {
              if (route.name === 'Schedule') {
                return (
                    <Ionicons
                      name={
                        focused
                          ? 'calendar'
                          : 'calendar-outline'
                      }
                      size={iconSize}
                      color={color}
                    />
                  );
              } else if (route.name === 'Stock') {
                return (
                    <Ionicons
                      name={
                        focused
                          ? 'list'
                          : 'md-list-outline'
                      }
                      size={iconSize}
                      color={color}
                    />
                  );
              } else if (route.name === 'Products') {
                return (
                    <Ionicons
                      name={
                        focused
                          ? 'fast-food'
                          : 'fast-food-outline'
                      }
                      size={iconSize}
                      color={color}
                    />
                  );
              } 
            },
          })}
        barStyle={{
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            overflow: 'hidden',
          }}
        >
            <Tab.Screen name="Schedule" component={Test} options={{
                tabBarLabel: 'Agenda',
                }} 
            />
            <Tab.Screen name="Stock" component={Test2} options={{
                tabBarLabel: 'Estoque',
                }} 
            />
            <Tab.Screen name="Products" component={Test3} options={{
                tabBarLabel: 'Produtos',
                }} 
            />
        </Tab.Navigator>
    );
};
