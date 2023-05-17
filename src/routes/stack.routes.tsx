import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Schedule from "../screens/Schedule";
import CarDetails from "../screens/CarDetails";
import ScheduleDetails from "../screens/ScheduleDetails";
import UserCars from "../screens/UserCars";
import Splash from "../screens/Splash";
import SignIn from "../screens/SignIn";
import RegisterFirstStep from "../screens/Register/RegisterFirstStep";
import RegisterSecondStep from "../screens/Register/RegisterSecondStep";
import ScheduleComplete from "../screens/Confirmation";
import Confirmation from "../screens/Confirmation";

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
      <Screen name="SignIn" component={SignIn} />
      <Screen name="RegisterFirstStep" component={RegisterFirstStep} />
      <Screen name="RegisterSecondStep" component={RegisterSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="Schedule" component={Schedule} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="ScheduleComplete" component={ScheduleComplete} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="UserCars" component={UserCars} />
    </Navigator>
  );
}

export default StackRoutes;
