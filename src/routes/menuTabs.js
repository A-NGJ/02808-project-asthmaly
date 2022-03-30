import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home} from '../pages/Home';
import {Visualization} from '../pages/Visualization';
import {Profile} from '../pages/Profile';
import { Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function TopNavigator() {
  return(
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Icon as={Ionicons} name="home"/>
            ),
          }}
        />
      </Stack.Navigator>
  );
}

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
          /*tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),*/
        }}
      />
      <Tab.Screen
        name="Visualization"
        component={Visualization}
        options={{
          tabBarLabel: 'Data Visualization',
          /*tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="poll" color={color} size={size} />
          ),*/
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          /*tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),*/
        }}
      />
    </Tab.Navigator>
  );
}
