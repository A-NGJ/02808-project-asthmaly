import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Home} from '../pages/Home';
import {Visualization} from '../pages/Visualization';
import Profile from '../pages/profile/Profile';
import ProfileSettings from '../pages/profile/Settings'
import ProfileAccount from '../pages/profile/Account'
import ProfileDoctor from '../pages/profile/Doctor'
import ProfileFeedbackSupport from '../pages/profile/FeedbackSupport'
import ProfileAbout from '../pages/profile/About'

import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

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
        name="ProfileHome"
        component={NavProfile}
        options={{
          title: 'Profile',
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

export function NavProfile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{title: 'Profile', headerShown: false}}/>
      {/* <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{title: 'Settings'}}/> */}
      <Stack.Screen name="ProfileAccount" component={ProfileAccount} options={{title: 'Account'}}/>
      <Stack.Screen name="ProfileDoctor" component={ProfileDoctor} options={{title: 'Send Data to Doctor'}}/>
      <Stack.Screen name="ProfileFeedbackSupport" component={ProfileFeedbackSupport} options={{title: 'Feedback & Support'}}/>
      <Stack.Screen name="ProfileAbout" component={ProfileAbout} options={{title: 'About'}}/>
    </Stack.Navigator>
  )
}
