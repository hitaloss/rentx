import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screens/Splash";
import SignIn from "../screens/SignIn";
import RegisterFirstStep from "../screens/Register/RegisterFirstStep";
import RegisterSecondStep from "../screens/Register/RegisterSecondStep";
import Confirmation from "../screens/Confirmation";

const { Navigator, Screen } = createNativeStackNavigator();

function AuthRoutes() {
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
    </Navigator>
  );
}

export default AuthRoutes;
