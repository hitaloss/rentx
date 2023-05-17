import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { Container, Content, Title, Message, Footer } from "./styles";
import LogoSvg from "./../../assets/Logo_background_grey.svg";
import DoneSvg from "./../../assets/Done.svg";
import ConfirmButton from "../../components/ConfirmButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home", "SignIn">;
}

interface Params {
  title: string;
  message: string;
  nextScreen: "Home" | "SignIn";
}

function Confirmation({ navigation }: Props) {
  const { width } = useWindowDimensions();

  const route = useRoute();
  const { title, message, nextScreen } = route.params as Params;

  const handleConfirm = () => {
    navigation.navigate(nextScreen);
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
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}

export default Confirmation;
