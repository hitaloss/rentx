import React, { useState } from "react";
import { TextInputProps } from "react-native";

import {
  Container,
  IconContainer,
  InputText,
  PasswordIconContainer,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const theme = useTheme();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled
              ? theme.colors.main.main
              : theme.colors.caption
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        secureTextEntry={!isVisible}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <BorderlessButton rippleRadius={0} onPress={handlePasswordVisible}>
        <PasswordIconContainer>
          <Feather
            name={isVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.caption}
          />
        </PasswordIconContainer>
      </BorderlessButton>
    </Container>
  );
}

export default PasswordInput;
