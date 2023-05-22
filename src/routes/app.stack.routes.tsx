import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Schedule from "../screens/Schedule";
import CarDetails from "../screens/CarDetails";
import ScheduleDetails from "../screens/ScheduleDetails";
import UserCars from "../screens/UserCars";
import ScheduleComplete from "../screens/Confirmation";
import Confirmation from "../screens/Confirmation";

const { Navigator, Screen } = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="Schedule" component={Schedule} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="ScheduleComplete" component={ScheduleComplete} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="UserCars" component={UserCars} />
    </Navigator>
  );
}

export default StackRoutes;
