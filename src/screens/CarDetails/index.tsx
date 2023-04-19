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
  About,
  Accessories,
  Footer,
} from "./styles";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import Accessory from "../../components/Accessory";

import speedSvg from "./../../assets/Speed.svg";
import powerSvg from "./../../assets/up.svg";
import handlingSvg from "./../../assets/Steering_wheel.svg";
import gasSvg from "./../../assets/Drop.svg";
import gearSvg from "./../../assets/Gear.svg";
import personSvg from "./../../assets/Account.svg";
import Button from "../../components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Schedule: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Schedule">;
}

function CarDetails({ navigation }: Props) {
  const handleSchedule = () => {
    navigation.navigate("Schedule");
  };

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

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleSchedule} />
      </Footer>
    </Container>
  );
}

export default CarDetails;
