import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home} from '../pages/Home';
import {Visualization} from '../pages/Visualization';
import {Profile} from '../pages/Profile';

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
            headerRight: ({color, size}) => (
                <Icon
                  name="dots-vertical"
                  color={color}
                  size={25}
                />
            ),
          }}
        />
        <Stack.Screen
          name="Visualization"
          component={Visualization}
          options={{
            headerRight: ({color, size}) => (
                <Icon
                  name="dots-vertical"
                  color={color}
                  size={25}
                />
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerRight: ({color, size}) => (
                <Icon
                  name="dots-vertical"
                  color={color}
                  size={25}
                />
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
          tabBarIcon: ({color, size}) => (
            <Icon
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
            <Icon
              name="poll"
              color={color}
              size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon
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
