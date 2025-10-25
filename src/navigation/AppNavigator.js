import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import InicioScreen from "../screens/InicioScreen";
import JuegoScreen from "../screens/JuegoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Juego" component={JuegoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
