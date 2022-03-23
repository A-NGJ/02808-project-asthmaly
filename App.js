import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MenuTabs} from './src/routes/menuTabs';
import { useColorScheme } from 'react-native';

import {Light, Dark} from './src/styles/style';
import { NativeBaseProvider, Text, Box } from 'native-base';

export default function App() {
  const scheme = useColorScheme();
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={scheme === 'dark' ? Dark : Light}>
        <MenuTabs />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
