import React from "react";

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
import BackButton from "../../components/BackButton";
import { useTheme } from "styled-components";

import ArrowSvg from "./../../assets/Thin_arrow_left.svg";
import { StatusBar } from "react-native";
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ScheduleDetails: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "ScheduleDetails">;
}

function Schedule({ navigation }: Props) {
  const theme = useTheme();

  const handleScheduleDetails = () => {
    navigation.navigate("ScheduleDetails");
  };

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => {}} color={theme.colors.shape.main} />
        <Title>
          Escolha uma {"\n"}
          data de início e{"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleScheduleDetails} />
      </Footer>
    </Container>
  );
}

export default Schedule;
