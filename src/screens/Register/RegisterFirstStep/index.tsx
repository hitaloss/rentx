import React from "react";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import BackButton from "../../../components/BackButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Bullet from "../../../components/Bullet";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

type RootStackParamList = {
  RegisterSecondStep: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "RegisterSecondStep"
  >;
}

function RegisterFirstStep({ navigation }: Props) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNextStep = () => {
    navigation.navigate("RegisterSecondStep");
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de{"\n"}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input iconName="user" placeholder="Nome" />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default RegisterFirstStep;
