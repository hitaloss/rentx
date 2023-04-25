import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import api from "../../services/api";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";

import Logo from "./../../assets/Logo.svg";
import Car from "../../components/Car";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICar } from "../../interfaces/cars";
import Loading from "../../components/Loading";

type RootStackParamList = {
  CarDetails: { car: ICar };
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "CarDetails">;
}

function Home({ navigation }: Props) {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCarDetails = (car: ICar) => {
    navigation.navigate("CarDetails", { car });
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
    </Container>
  );
}

export default Home;
