import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Login from "./pages/Login";
import Home from "./pages/Home";
import ServiceOrder from "./pages/ServiceOrder";
import Success from "./pages/Success";
import Header from "./components/Header";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          // cardStyle: { backgroundColor: "#fef3f5" },
        }}
      >
        <Screen
          name="Login"
          component={Login}
          options={{ gestureEnabled: false }}
        />
        <Screen
          name="Home"
          component={Home}
          options={{ gestureEnabled: false }}
        />
        <Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Screen
          name="ServiceOrder"
          component={ServiceOrder}
          options={{
            headerShown: true,
            header: () => (
              <Header title="Ordem de serviço" showCancel={false} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
