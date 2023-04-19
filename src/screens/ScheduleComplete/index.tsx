import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { Container, Content, Title, Message, Footer } from "./styles";
import LogoSvg from "./../../assets/Logo_background_grey.svg";
import DoneSvg from "./../../assets/Done.svg";
import ConfirmButton from "../../components/ConfirmButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

function ScheduleComplete({ navigation }: Props) {
  const { width } = useWindowDimensions();

  const handleConfirm = () => {
    navigation.navigate("Home");
  };

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
        <ConfirmButton title="Ok" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}

export default ScheduleComplete;
