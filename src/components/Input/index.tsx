import React, { useState } from "react";
import { TextInputProps } from "react-native";

import { Container, IconContainer, InputText } from "./styles";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
  inactive?: boolean;
}

function Input({ iconName, value, inactive = false, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return (
    <Container isFocused={isFocused}>
      <IconContainer inactive={inactive}>
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        inactive={inactive}
      />
    </Container>
  );
}

export default Input;
