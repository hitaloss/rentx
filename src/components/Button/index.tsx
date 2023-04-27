import React from "react";
import { ActivityIndicator } from "react-native";

import { Container, Title } from "./styles";
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  textColor?: string;
  enabled?: boolean;
  loading?: boolean;
}

function Button({
  title,
  color,
  textColor,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      color={color ? color : theme.colors.main.main}
      style={{
        opacity: enabled === false || loading ? 0.5 : 1,
      }}
      enabled={enabled}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape.main} />
      ) : (
        <Title textColor={textColor ? textColor : theme.colors.shape.main}>
          {title}
        </Title>
      )}
    </Container>
  );
}

export default Button;
