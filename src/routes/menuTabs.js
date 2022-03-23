import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../pages/Home';
import {Visualization} from '../pages/Visualization';
import {Profile} from '../pages/Profile';

import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function MenuTabs() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions = {{
        tabBarActiveTintColor: colors.buttonActive,
        tabBarInactiveTintColor: colors.buttonInactive,
        tabBarActiveBackgroundColor: colors.background,
        tabBarInactiveBackgroundColor: colors.background,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Visualization" component={Visualization} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
