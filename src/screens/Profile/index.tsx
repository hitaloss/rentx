import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  PhotoContainer,
  Photo,
  LogoutButton,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";

import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";

import { AuthContext } from "../../contexts/AuthContext";

import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { updateSchema } from "../../schemas";

type RootStackParamList = {
  Home: undefined;
  UserCars: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home", "UserCars">;
}

function Profile({ navigation }: Props) {
  const { user, signOut, userUpdate } = useContext(AuthContext);

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOptionEdit = (option: "dataEdit" | "passwordEdit") => {
    setOption(option);
  };

  const handleAvatarSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    if (result.assets[0].uri) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = { name, driverLicense };
      await updateSchema.validate(data);
      await userUpdate({
        id: user.id,
        user_id: user.user_id,
        name,
        email: user.email,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert("Sucesso!", "Perfil atualizado");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Erro de validação", error.message);
      }
      Alert.alert("Erro ao atualizar", "Não foi possível atualizar o perfil");
    }
  };

  const handleSignOut = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da conta?", [
      {
        text: "Cancelar",
        onPress: () => {},
      },
      {
        text: "Sair",
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                onPress={handleGoBack}
                color={theme.colors.shape.main}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape.main}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape.main}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionEdit("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionEdit("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Profile;
