import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Visualization"
        component={Visualization}
        options={{
          tabBarLabel: 'Data Visualization',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="poll" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
