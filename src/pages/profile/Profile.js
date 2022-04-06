import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";

import { IconType } from "../../constants/constants";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  listItem: {
    padding: 8,
    fontSize: 20,
  },
  input: {
    height: 40,
    fontSize: 20,
    padding: 8,
  },
  icon: {
    size: 30,
  },
});


export function IconButton(data, colors, onPress) {
  switch (data.iconType) {
    case IconType.MaterialCommunity:
      return (
        <View>
          <MaterialCommunityIcons.Button
            name={data.icon}
            size={profileStyles.icon.size}
            underlayColor={colors.primary}
            backgroundColor={colors.background}
            onPress={onPress}
          >
            <Text style={[profileStyles.listItem, { color: colors.primary }]}>{data.key}</Text>
          </MaterialCommunityIcons.Button>
        </View>
      );
    case IconType.Ionicons:
      return (
        <View>
          <Icon.Button
            name={data.icon}
            backgroundColor={colors.background}
            size={profileStyles.icon.size}
            underlayColor={colors.primary}
            onPress={onPress}
          >
            <Text style={[profileStyles.listItem, { color: colors.primary }]}>{data.key}</Text>
          </Icon.Button>
        </View>
      );
    case IconType.Material:
      return (
        <View>
          <MaterialIcons
            name={data.icon}
            underlayColor={colors.primary}
            backgroundColor={colors.background}
            size={profileStyles.icon.size}
            onPress={onPress}
          >
            <Text style={[profileStyles.listItem, { color: colors.primary }]}>{data.key}</Text>
          </MaterialIcons>
        </View>
      );
  }
}

Profile.navigationOptions = ({ navigation }) => ({
  tabBarLabel: "Profile",
  tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons
      name="account-outline"
      color={color}
      size={size} />
  ),
  headerRight: ({ color }) => (
    <MaterialCommunityIcons
      name="dots-vertical"
      color={"#ffff"}
      size={25}
      onPress={() => navigation.navigate("Settings")}
    />
  ),
});

export function Profile({ navigation }) {
  const { colors } = useTheme();
  return (
    <View style={profileStyles.container}>
      <FlatList
        data={[
          {
            key: "Account", icon: "account", iconType: IconType.MaterialCommunity,
            onPress: () => navigation.navigate("ProfileAccount"),
          },
          // {key: 'Settings', icon: 'settings', iconType: IconType.Ionicons,
          //   onPress: () => navigation.navigate('ProfileSettings')},
          {
            key: "Send Data To Doctor", icon: "medical-bag", iconType: IconType.MaterialCommunity,
            onPress: () => navigation.navigate("ProfileDoctor"),
          },
          {
            key: "Feedback & Support", icon: "comment-question", iconType: IconType.MaterialCommunity,
            onPress: () => navigation.navigate("ProfileFeedbackSupport"),
          },
          {
            key: "About", icon: "information-outline", iconType: IconType.MaterialCommunity,
            onPress: () => navigation.navigate("ProfileAbout"),
          },
          {
            key: "Logout", icon: "logout", iconType: IconType.MaterialCommunity, onPress: () => {
            },
          },
        ]}
        renderItem={({ item }) => IconButton(item, colors, item.onPress)}
      />
    </View>
  );
}
