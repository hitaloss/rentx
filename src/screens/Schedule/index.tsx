import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { useTheme } from "styled-components";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import {
  Calendar,
  MarkedDateProps,
  DateObject,
} from "../../components/Calendar";

import { format } from "date-fns";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

import createInterval from "../../components/Calendar/createInterval";
import { getPlatformDate } from "../../utils";

import ArrowSvg from "./../../assets/Thin_arrow_left.svg";
import { ICar } from "../../interfaces/cars";

interface Params {
  car: ICar;
}

type RootStackParamList = {
  ScheduleDetails: {
    car: ICar;
    dates: string[];
  };
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "ScheduleDetails">;
}

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

function Schedule({ navigation }: Props) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateObject>(
    {} as DateObject
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );

  const theme = useTheme();
  const route = useRoute();

  const { car } = route.params as Params;

  const handleScheduleDetails = () => {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert(
        "Intervalo necessário",
        "Selecione um intervalo para alugar."
      );
    } else {
      navigation.navigate("ScheduleDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeDates = (date: DateObject) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = createInterval(start, end);
    setMarkedDates(interval);
    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(lastDate)), "dd/MM/yyyy"),
    });
  };

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
          Escolha uma {"\n"}
          data de início e{"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDates} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleScheduleDetails}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}

export default Schedule;
