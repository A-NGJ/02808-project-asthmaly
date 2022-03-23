import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import {Home} from '../pages/Home';
import {Visualization} from '../pages/Visualization';
import {Profile} from '../pages/Profile';

const Tab = createBottomTabNavigator();

export function MenuTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Visualization" component={Visualization} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
