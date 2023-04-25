import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

function Loading() {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={theme.colors.main.main}
      size="large"
      style={{ flex: 1 }}
    />
  );
}

export default Loading;