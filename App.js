import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./src/routes/Navigator";
import { useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Light, Dark } from "./src/styles/style";

export default function App() {
  const scheme = useColorScheme();
  return (
    <NativeBaseProvider>
      {/* Make the dynamic dark and light mode work again after using:
      <NavigationContainer theme={scheme === 'dark' ? Dark : Light}> */}
      <NavigationContainer theme={Dark}>
        <TabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
