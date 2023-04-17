import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { Container, Content, Title, Message, Footer } from "./styles";
import LogoSvg from "./../../assets/Logo_background_grey.svg";
import DoneSvg from "./../../assets/Done.svg";
import ConfirmButton from "../../components/ConfirmButton";

function ScheduleComplete() {
  const { width } = useWindowDimensions();

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir{"\n"}
          até uma concessionária da RENTX{"\n"}
          pegar seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" />
      </Footer>
    </Container>
  );
}

export default ScheduleComplete;
