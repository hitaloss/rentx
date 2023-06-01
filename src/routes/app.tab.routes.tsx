import React from "react";
import { Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserCars from "../screens/UserCars";
import StackRoutes from "./app.stack.routes";

import HomeSvg from "../assets/home.svg";
import CarSvg from "../assets/Car.svg";
import PeopleSvg from "../assets/people.svg";
import { useTheme } from "styled-components";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

function TabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main.main,
        tabBarInactiveTintColor: theme.colors.caption,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background[1],
        },
      }}
    >
      <Screen
        name="HomeStack"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="UserCars"
        component={UserCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg height={24} width={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}

export default TabRoutes;
