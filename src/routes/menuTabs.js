import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home} from '../pages/Home';
import {Visualization} from '../pages/Visualization';
import {Profile} from '../pages/Profile';

const Tab = createBottomTabNavigator();

export function MenuTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Visualization" component={Visualization} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
