import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, TextInput, Settings, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { profileStyles, IconButton } from "./Profile";
import { Field, IconType } from "../../constants/constants";
import { RoundedButton } from "../../components/buttons";
import FirebaseConn from "../../connection/firestore";

function IconTextInput(colors, iconName, input, setInput, {
  textContentType = null,
  placeholder = "",
  keyboardType = null,
} = {}) {
  return (
    <View style={{ padding: 10, flexDirection: "row" }}>
      <MaterialCommunityIcons
        name={iconName}
        size={profileStyles.icon.size}
        color={colors.primary}
      />
      <TextInput
        style={[profileStyles.input, { color: colors.primary }]}
        placeholder={placeholder}
        placeholderTextColor={colors.buttonInactive}
        onChangeText={newInput => setInput(newInput)}
        textContentType={textContentType}
        defaultValue={input}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export function ProfileAccount() {
  const firebaseConn = FirebaseConn.getInstance();
  const { colors } = useTheme();
  const [fullName, setName] = React.useState(firebaseConn.get(Field.NAME));
  const [email, setEmail] = React.useState(firebaseConn.get(Field.EMAIL));
  const [phone, setPhone] = React.useState(firebaseConn.get(Field.PHONE));

  useEffect(() => {
    const fetchFirebase = async () => {
      const name = await firebaseConn.getName();
      const email = await firebaseConn.getEmail();
      const phone = await firebaseConn.getPhone();
      setName(name);
      setEmail(email);
      setPhone(phone);
    }
    fetchFirebase();
  }, [])

  const onPressSave = () => {
    fullName != "" ?
      firebaseConn.update(Field.NAME, fullName) :
      Alert.alert("name cannot be empty");
    firebaseConn.update(Field.PHONE, phone)
    firebaseConn.update(Field.EMAIL, email);
  };

  return (
    <View style={profileStyles.container}>
      {IconTextInput(colors, "account", fullName, setName,
        {
          placeholder: "Your Name",
        },
      )}
      {IconTextInput(colors, "email", email, setEmail,
        {
          textContentType: "emailAddress",
          placeholder: "email",
        },
      )}
      {IconTextInput(colors, "cellphone", phone, setPhone,
        {
          textContentType: "telephoneNumber",
          placeholder: "phone",
          keyboardType: "numeric",
        })
      }
      {IconButton(
        {
          key: "Avatar",
          icon: "md-person-circle",
          iconType: IconType.Ionicons,
          navigateTo: "",
        }, colors, () => {
        })
      }
      {IconButton(
        {
          key: "Change Password",
          icon: "lock",
          iconType: IconType.MaterialCommunity,
          navigateTo: "",
        }, colors, () => {
        })
      }
      <View style={{ borderBottomColor: colors.primary, borderBottomWidth: 1 }} />
      {IconButton(
        {
          key: "Delete Account",
          icon: "delete",
          iconType: IconType.MaterialCommunity,
          navigateTo: "",
        }, colors, () => {
        })
      }
      <View style={{ flex: 0.1 }} />
      {RoundedButton("Save", onPressSave, colors)}
    </View>
  );
}
