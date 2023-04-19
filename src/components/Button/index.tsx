import React from "react";

import { Container, Title } from "./styles";
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  textColor?: string;
}

function Button({ title, color, textColor, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container {...rest} color={color ? color : theme.colors.main.main}>
      <Title textColor={textColor ? textColor : theme.colors.shape.main}>
        {title}
      </Title>
    </Container>
  );
}

export default Button;
