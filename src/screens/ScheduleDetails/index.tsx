import React from "react";

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

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import speedSvg from "./../../assets/Speed.svg";
import powerSvg from "./../../assets/up.svg";
import handlingSvg from "./../../assets/Steering_wheel.svg";
import gasSvg from "./../../assets/Drop.svg";
import gearSvg from "./../../assets/Gear.svg";
import personSvg from "./../../assets/Account.svg";
import Button from "../../components/Button";

function ScheduleDetails() {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25e4853091e3d8e88cb/stills_0640_png/MY2021/14922/14922_st0640_116.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={powerSvg} />
          <Accessory name="800 HP" icon={handlingSvg} />
          <Accessory name="Gasolina" icon={gasSvg} />
          <Accessory name="Auto" icon={gearSvg} />
          <Accessory name="2 Pessoas" icon={personSvg} />
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
            <DateValue>18/06/2023</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>20/06/2023</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceInstallments>R$ 580 x3 diárias</RentalPriceInstallments>
            <RentalPriceValue>R$ 2.900</RentalPriceValue>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}

export default ScheduleDetails;
