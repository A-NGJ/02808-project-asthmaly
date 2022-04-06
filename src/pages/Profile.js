import * as React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

Profile.navigationOptions = ({ navigation }) => ({
  tabBarLabel: "Profile",
  tabBarIcon: ({ color, size }) => (
    <Icon
      name="account-outline"
      color={color}
      size={size} />
  ),
  headerRight: ({ color, size }) => (
    <Icon
      name="dots-vertical"
      color={color}
      size={25}
      onPress={() => navigation.navigate("Settings")}
    />
  ),
});

export function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}
