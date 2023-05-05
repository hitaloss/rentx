import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Schedule from "../screens/Schedule";
import CarDetails from "../screens/CarDetails";
import ScheduleComplete from "../screens/ScheduleComplete";
import ScheduleDetails from "../screens/ScheduleDetails";
import UserCars from "../screens/UserCars";
import Splash from "../screens/Splash";

const { Navigator, Screen } = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} />
      <Screen name="Schedule" component={Schedule} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="ScheduleComplete" component={ScheduleComplete} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="UserCars" component={UserCars} />
    </Navigator>
  );
}

export default StackRoutes;
