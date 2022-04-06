import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings } from "../pages/Settings";
import { Home } from "../pages/Home";
import { Visualization } from "../pages/Visualization";
import { Profile } from "../pages/Profile";

import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => (
        {
          tabBarActiveTintColor: colors.buttonActive,
          tabBarInactiveTintColor: colors.buttonInactive,
          tabBarActiveBackgroundColor: colors.background,
          tabBarInactiveBackgroundColor: colors.background,
          tabBarButton: [
            "Settings",
          ].includes(route.name)
            ? () => {
              return null;
            }
            : undefined,
        })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={Home.navigationOptions}
      />
      <Tab.Screen
        name="Visualization"
        component={Visualization}
        options={Visualization.navigationOptions}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={Profile.navigationOptions}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}
