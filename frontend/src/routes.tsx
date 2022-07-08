import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./components/Menu";
import Stock from "./screens/Stock";
import StockForm from "./screens/StockForm";
import Schedule from "./screens/Schedule";
import ScheduleForm from "./screens/ScheduleForm";

type RootStackParamList = {
  Menu: undefined;
  Stock: undefined;
  StockForm: undefined;
  Schedule: undefined;
  ScheduleForm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Stock" component={Stock} />
        <Stack.Screen name="StockForm" component={StockForm} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="ScheduleForm" component={ScheduleForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
