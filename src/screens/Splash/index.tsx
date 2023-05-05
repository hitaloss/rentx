import React, { useEffect } from "react";

import { Container } from "./styles";
import LogoSvg from "../../assets/X_red.svg";
import BrandSvg from "../../assets/Logo.svg";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

function Splash({ navigation }: Props) {
  const splashAnimationLogo = useSharedValue(0);
  const splashAnimationBrand = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimationBrand.value,
        [0, 25, 50],
        [1, 0.4, 0],
        Extrapolate.CLAMP
      ),
      position: "absolute",
    };
  });

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimationLogo.value,
        [0, 16.6, 25, 33.3, 50],
        [0, 0.4, 1, 0.4, 0]
      ),
      position: "absolute",
    };
  });

  const startApp = () => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 5400);
  };

  useEffect(() => {
    setTimeout(() => {
      splashAnimationLogo.value = withTiming(50, {
        duration: 5500,
        easing: Easing.bezier(0, 0.89, 1, 0.1),
      });
    }, 2000);
    const sequenceAnimation = withTiming(50, { duration: 2500 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
    splashAnimationBrand.value = sequenceAnimation;
  }, []);

  return (
    <Container>
      <Animated.View style={logoStyle}>
        <LogoSvg width={87} height={57} />
      </Animated.View>

      <Animated.View style={brandStyle}>
        <BrandSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}

export default Splash;
