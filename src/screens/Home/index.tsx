import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { useTheme } from "styled-components";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  UserCarsButton,
} from "./styles";
import Car from "../../components/Car";
import Loading from "../../components/Loading";

import Logo from "./../../assets/Logo.svg";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICar } from "../../interfaces/cars";

type RootStackParamList = {
  CarDetails: { car: ICar };
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
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const handleCarDetails = (car: ICar) => {
    navigation.navigate("CarDetails", { car });
  };

  const handleUserCars = () => {
    navigation.navigate("UserCars");
  };

  useEffect(() => {
    try {
      const fetchCars = async () => {
        const res = await api.get("/cars");
        setCars(res.data);
      };
      fetchCars();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

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
          <TotalCars>Total de 12 carros</TotalCars>
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
      <UserCarsButton onPress={handleUserCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape.main}
        />
      </UserCarsButton>
    </Container>
  );
}

export default Home;
