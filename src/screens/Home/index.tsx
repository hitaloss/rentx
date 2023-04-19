import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";

import Logo from "./../../assets/Logo.svg";
import Car from "../../components/Car";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  CarDetails: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "CarDetails">;
}

function Home({ navigation }: Props) {
  const carMocked = {
    brand: "audi",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail:
      "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25e4853091e3d8e88cb/stills_0640_png/MY2021/14922/14922_st0640_116.png",
  };

  const handleCarDetails = () => {
    navigation.navigate("CarDetails");
  };

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
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        renderItem={({ item }) => (
          <Car data={carMocked} onPress={handleCarDetails} />
        )}
        keyExtractor={(item) => String(item)}
      />
    </Container>
  );
}

export default Home;
