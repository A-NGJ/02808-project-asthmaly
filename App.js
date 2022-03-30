import * as React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {MenuTabs} from './src/routes/menuTabs';
import Profile from './src/pages/profile/Profile'

import { useColorScheme} from 'react-native';

import {Light, Dark} from './src/styles/style';


export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? Dark : Light}>
      <MenuTabs />
    </NavigationContainer>
  );
}
