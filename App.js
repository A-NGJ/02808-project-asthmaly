import * as React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {MenuTabs} from './src/routes/menuTabs';
import Profile from './src/pages/Profile'
import { useColorScheme } from 'react-native';

import {Light, Dark} from './src/styles/style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? Dark : Light}>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator> 
      {/* <MenuTabs /> */}
    </NavigationContainer>
  );
}
