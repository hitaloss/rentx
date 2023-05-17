import React, { useEffect } from "react";
import { BackHandler, StyleSheet } from "react-native";

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  CarImages,
} from "./styles";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Accessory from "../../components/Accessory";
import Button from "../../components/Button";

import { getAccessoryIcon } from "../../utils";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import { ICar } from "../../interfaces/cars";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "styled-components";

type RootStackParamList = {
  Schedule: { car: ICar };
};
interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Schedule">;
}

interface Params {
  car: ICar;
}

function CarDetails({ navigation }: Props) {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const route = useRoute();
  const theme = useTheme();

  const { car } = route.params as Params;

  const handleSchedule = () => {
    navigation.navigate("Schedule", { car });
  };

  const handleGoBack = () => {
    navigation.goBack();
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
    return null;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleGoBack);
  }, []);

  return (
    <Container>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background[2] },
        ]}
      >
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((item) => (
            <Accessory
              name={item.name}
              icon={getAccessoryIcon(item.type)}
              key={item.type}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleSchedule} />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});

export default CarDetails;
