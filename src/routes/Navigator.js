import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
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
import { Visualization1 } from "../pages/Visualization1";

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
        name="NavProfile"
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

function TopTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? "#9b3fbf" : "#706c6c",
              fontSize: 12,
              textTransform: "none",
              height: 30,
              borderRadius: 100,
              margin: 7,
              marginVertical: 10,
              padding: 6,
            }}
          >
            <Text style={{ alignSelf: "center", color: "white" }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function VisTopTabNavigator() {
  return (
    <TopTab.Navigator
      tabBar={(props) => <TopTabBar {...props} />}>
      <TopTab.Screen name="Symptoms" component={Visualization} />
      <TopTab.Screen name="Exercise" component={Visualization1} />
    </TopTab.Navigator>
  );
}


