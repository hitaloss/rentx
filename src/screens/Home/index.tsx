import React, { useState, useEffect } from "react";
import { Button, StatusBar, StyleSheet } from "react-native";

// import { useTheme } from "styled-components";
// import { useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
// } from "react-native-reanimated";
// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import Car from "../../components/Car";
import Loading from "../../components/Loading";

import api from "../../services/api";
import Logo from "./../../assets/Logo.svg";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";
import { Car as ModelCar } from "../../database/models/Car";

type RootStackParamList = {
  CarDetails: { car: ModelCar };
  UserCars: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "CarDetails",
    "UserCars"
  >;
}

function Home({ navigation }: Props) {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  // const posY = useSharedValue(0);
  // const posX = useSharedValue(0);

  // const userCarsAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateX: posX.value }, { translateY: posY.value }],
  //   };
  // });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.posX = posX.value;
  //     ctx.posY = posY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     posX.value = ctx.posX + event.translationX;
  //     posY.value = ctx.posY + event.translationY;
  //   },
  //   onEnd() {
  //     if (posY.value > -600) {
  //       posX.value = withSpring(0);
  //     } else {
  //       posX.value = withSpring(0);
  //       posY.value = withSpring(0);
  //     }
  //   },
  // });

  // const theme = useTheme();
  // const route = useRoute();
  const netInfo = useNetInfo();

  const handleCarDetails = (car: ModelCar) => {
    navigation.navigate("CarDetails", { car });
  };

  // const handleUserCars = () => {
  //   navigation.navigate("UserCars");
  // };

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const res = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = res.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        if (user) {
          await api.post(`/users/sync`, user).catch((err) => console.log(err));
        }
      },
    });
  };

  useEffect(() => {
    try {
      const fetchCars = async () => {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();

        setCars(cars);
      };
      fetchCars();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <TotalCars>
              Total de {cars.length} {cars.length > 1 ? "carros" : "carro"}
            </TotalCars>
          )}
        </HeaderContent>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            userCarsAnimatedStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main.main }]}
            onPress={handleUserCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape.main}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

export default Home;
