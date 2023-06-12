import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsAmount,
  CarWraper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

import BackButton from "../../components/BackButton";
import Car from "../../components/Car";
import Loading from "../../components/Loading";

import api from "../../services/api";
import { Car as ModelCar } from "../../database/models/Car";

import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format, parseISO } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

function UserCars({ navigation }: Props) {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const screenFocus = useIsFocused();

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get("/rentals");
        const formattedData = res.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });
        setCars(formattedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [screenFocus]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleGoBack} color={theme.colors.shape.main} />
        <Title>
          Seus agendamentos,{"\n"}
          estão aqui.
        </Title>
        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsAmount>{cars.length}</AppointmentsAmount>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWraper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWraper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}

export default UserCars;
