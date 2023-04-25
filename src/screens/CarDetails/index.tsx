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
import { useRoute } from "@react-navigation/native";
import { ICar } from "../../interfaces/cars";

type RootStackParamList = {
  Schedule: undefined;
};
interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Schedule">;
}

interface Params {
  car: ICar;
}

function CarDetails({ navigation }: Props) {
  const route = useRoute();

  const { car } = route.params as Params;

  const handleSchedule = () => {
    navigation.navigate("Schedule");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

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
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((item) => (
            <Accessory name={item.name} icon={speedSvg} key={item.type} />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleSchedule} />
      </Footer>
    </Container>
  );
}

export default CarDetails;
