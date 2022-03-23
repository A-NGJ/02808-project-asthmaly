import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MenuTabs} from './src/routes/menuTabs';

export default function App() {
  return (
    <NavigationContainer>
      <MenuTabs />
    </NavigationContainer>
  );
}
