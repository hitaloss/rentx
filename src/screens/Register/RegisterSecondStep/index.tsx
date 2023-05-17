import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";

import Bullet from "../../../components/Bullet";
import Button from "../../../components/Button";
import BackButton from "../../../components/BackButton";
import PasswordInput from "../../../components/PasswordInput";

import api from "../../../services/api";
import { useTheme } from "styled-components";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

type RootStackParamList = {
  Confirmation: {
    title: string;
    message: string;
    nextScreen: "Home" | "SignIn";
  };
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Confirmation">;
}

function RegisterSecondStep({ navigation }: Props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    if (!password || !passwordConfirm) {
      return Alert.alert(
        "Erro ao cadastrar",
        "Informe a senha e a confirmação de senha"
      );
    }
    if (password !== passwordConfirm) {
      return Alert.alert("Erro ao cadastrar", "As senhas não coincidem");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          title: "Conta criada!",
          message: `Agora é só fazer login\ne aproveitar.`,
          nextScreen: "SignIn",
        });
      })
      .catch(() => Alert.alert("Opa!", "Não foi possível cadastrar :("));
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
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            textColor={theme.colors.background[2]}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default RegisterSecondStep;
