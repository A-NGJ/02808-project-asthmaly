import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MenuTabs} from './src/routes/menuTabs';
import { useColorScheme } from 'react-native';

import {Light, Dark} from './src/styles/style';

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? Dark : Light}>
      <MenuTabs />
    </NavigationContainer>
  );
}
