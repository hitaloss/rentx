import React, { useEffect, useState } from "react";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceInstallments,
  RentalPriceValue,
} from "./styles";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Accessory from "../../components/Accessory";
import Button from "../../components/Button";
import { useTheme } from "styled-components";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { format } from "date-fns";

import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ICar } from "../../interfaces/cars";
import { getAccessoryIcon, getPlatformDate } from "../../utils";
import api from "../../services/api";
import { Alert } from "react-native";

interface Params {
  car: ICar;
  dates: string[];
}

type RootStackParamList = {
  Confirmation: {
    title: string;
    message: string;
    nextScreen: "Home" | "SignIn";
  };
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Confirmation">;
}

interface RentalPeriodProps {
  start: string;
  end: string;
}

function ScheduleDetails({ navigation }: Props) {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const rentTotal = (dates.length * car.price).toLocaleString("pt-BR");

  const handleScheduleConfirm = async () => {
    setLoading(true);
    try {
      const carSchedules = await api.get(`/schedules_cars/${car.id}`);
      const unavailable_dates = [
        ...carSchedules.data["unavailable_dates"],
        ...dates,
      ];

      await api.post("schedules_users", {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          "dd/MM/yyyy"
        ),
      });

      await api
        .put(`/schedules_cars/${car.id}`, {
          id: car.id,
          unavailable_dates,
        })
        .then(() =>
          navigation.navigate("Confirmation", {
            title: "Carro alugado!",
            message: `Agora você só precisa ir\naté a concessinária da RENTX\npegar seu automóvel.`,
            nextScreen: "Home",
          })
        )
        .catch(() => {
          Alert.alert(
            "Erro ao agendar",
            "Não foi possível realizar o agendamento"
          );
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape.main}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceInstallments>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceInstallments>
            <RentalPriceValue>R$ {rentTotal}</RentalPriceValue>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleScheduleConfirm}
          color={theme.colors.success}
          textColor={theme.colors.background[2]}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}

export default ScheduleDetails;
