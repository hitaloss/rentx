import React from "react";
import { useTheme } from "styled-components/native";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

import GasSvg from "./../../assets/Drop.svg";
import { RectButtonProps } from "react-native-gesture-handler";
import { ICar } from "../../interfaces/cars";

interface Props extends RectButtonProps {
  data: ICar;
}

function Car({ data, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <GasSvg />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}

export default Car;
