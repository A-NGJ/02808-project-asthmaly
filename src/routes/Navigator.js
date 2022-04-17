import * as React from "react";
import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ProfileSettings } from "../pages/profile/Settings";
import { Home } from "../pages/Home";
import { Visualization } from "../pages/Visualization";
import { Profile } from "../pages/profile/Profile";
import { ProfileAccount } from "../pages/profile/Account";
import ProfileDoctor from "../pages/profile/Doctor";
import ProfileFeedbackSupport from "../pages/profile/FeedbackSupport";
import ProfileAbout from "../pages/profile/About";
import { Visualization2 } from "../pages/Visualization2";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

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
        component={VisTopTabNavigator}
        options={Visualization.navigationOptions}
      />
      <Tab.Screen
        name="Profile"
        component={NavProfile}
        options={Profile.navigationOptions}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileSettings}
        options={{
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}

export function NavProfile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile", headerShown: false }} />
      <Stack.Screen name="ProfileAccount" component={ProfileAccount} options={{ title: "Account" }} />
      <Stack.Screen name="ProfileDoctor" component={ProfileDoctor} options={{ title: "Send Data to Doctor" }} />
      <Stack.Screen name="ProfileFeedbackSupport" component={ProfileFeedbackSupport}
                    options={{ title: "Feedback & Support" }} />
      <Stack.Screen name="ProfileAbout" component={ProfileAbout} options={{ title: "About" }} />
    </Stack.Navigator>
  );
}

export function VisTopTabNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: "none",
        },
        tabBarItemStyle: {
          fontSize: 12,
          textTransform: "none",
          height: 30,
          minHeight: 10,
          backgroundColor: "#706c6c",
          borderRadius: 100,
          margin: 10,
          marginVertical: 10,
          padding: 3,
        },
        tabBarStyle: {
          backgroundColor: "transparent",
        },
        tabBarIndicator: () => null,
      }}
    >
      <TopTab.Screen name="Symptoms" component={Visualization} />
      <TopTab.Screen name="Exercise" component={Visualization2} />
    </TopTab.Navigator>
  );
}


