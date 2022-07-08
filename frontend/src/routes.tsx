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
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          options={{ headerShown: false }}
          component={Menu}
        />
        <Stack.Screen
          name="Stock"
          options={{ headerShown: false }}
          component={Stock}
        />
        <Stack.Screen
          name="StockForm"
          options={{
            headerTitle: "Estocagem",
            headerBackTitleVisible: false,
            headerTintColor: "#000",
          }}
          component={StockForm}
        />
        <Stack.Screen
          name="Schedule"
          options={{ headerShown: false }}
          component={Schedule}
        />
        <Stack.Screen
          name="ScheduleForm"
          options={{
            headerTitle: "Agendamento",
            headerBackTitleVisible: false,
            headerTintColor: "#000",
          }}
          component={ScheduleForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
