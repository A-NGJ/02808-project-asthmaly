import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./src/routes/Navigator";
import { useColorScheme } from "react-native";
import { NativeBaseProvider, Text, Box } from "native-base";
import { Light, Dark } from "./src/styles/style";
import { Login } from "./src/pages/Login";

export default function App() {
  const scheme = useColorScheme();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <NativeBaseProvider>
      {/* Make the dynamic dark and light mode work again after using:
      <NavigationContainer theme={scheme === 'dark' ? Dark : Light}> */}
      <NavigationContainer theme={Dark}>
        {loggedIn ? <TabNavigator /> : <Login />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
