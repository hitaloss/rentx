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
import { useTheme } from "styled-components";
import PasswordInput from "../../../components/PasswordInput";

type RootStackParamList = {
  RegisterCompleted: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "RegisterCompleted"
  >;
}

function RegisterSecondStep({ navigation }: Props) {
  const theme = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput iconName="lock" placeholder="Senha" />
            <PasswordInput iconName="lock" placeholder="Repetir senha" />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            textColor={theme.colors.background[2]}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default RegisterSecondStep;
