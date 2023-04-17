import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./src/routes/stack.routes";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";

import { ThemeProvider } from "styled-components";
import theme from "./global/styles/theme";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        await Font.loadAsync(Entypo.font);
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };
    loadResources();
  }, []);

  useEffect(() => {
    const hideScreenSplash = async () => {
      await SplashScreen.hideAsync();
    };
    if (appIsReady && fontsLoaded) {
      hideScreenSplash();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <StackRoutes />
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
