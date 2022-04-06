import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, TextInput, Settings} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {profileStyles, IconButton} from './Profile';
import { IconType } from '../../constants/constants';
import { RoundedButton } from '../../components/buttons';

function IconTextInput(colors, iconName, input, setInput, {
  textContentType=null,
  placeholder=null,
  keyboardType=null,
} = {}) {
  return (
    <View style={{padding: 10, flexDirection: 'row'}}>
      <MaterialCommunityIcons
        name={iconName}
        size={profileStyles.icon.size}
        color={colors.primary}
      />
      <TextInput
        style={[profileStyles.input, {color: colors.primary}]}
        placeholder={placeholder}
        placeholderTextColor={colors.buttonInactive}
        onChangeText={newInput => setInput(newInput)}
        textContentType={textContentType}
        defaultValue={input}
        keyboardType={keyboardType}
      />
    </View>
  )
}

function ProfileAccount() {
  const {colors} = useTheme();
  const [fullName, setName] = React.useState(Settings.get('name'));
  const [email, setEmail] = React.useState(Settings.get('email'));
  const [phone, setPhone] = React.useState(Settings.get('phone'));

  const onPressSave = () => {
    const saveData = {
      'name': fullName,
      'email': email,
      'phone': phone,
    }
    Settings.set(saveData)
    console.log('Saved', saveData)
  }

  return (
    <View style={profileStyles.container}>
      {IconTextInput(colors, 'account', fullName, setName,
        {
          placeholder: 'Your Name'
        }
      )}
      {IconTextInput(colors, 'email', email, setEmail,
        {
          textContentType: 'emailAddress',
          placeholder: 'email',
        }
      )}
      {IconTextInput(colors, 'cellphone', phone, setPhone,
        {
          textContentType: 'telephoneNumber',
          placeholder: 'phone',
          keyboardType: 'numeric',
        })
      }
      {IconButton(
        {
          key: 'Avatar',
          icon: 'md-person-circle',
          iconType: IconType.Ionicons,
          navigateTo: '',
        }, colors, () => {})
      }
      {IconButton(
        {
          key: 'Change Password',
          icon: 'lock',
          iconType: IconType.MaterialCommunity,
          navigateTo: '',
        }, colors, () => {})
      }
    <View style={{borderBottomColor: colors.primary, borderBottomWidth: 1,}}/> 
     {IconButton(
       {
        key: 'Delete Account',
        icon: 'delete',
        iconType: IconType.MaterialCommunity,
        navigateTo: '',
       }, colors, () => {}) 
    }
    <View style={{flex: 0.1}}/>
    {RoundedButton('Save', onPressSave, colors)}
    </View>
  )
}

export default ProfileAccount;
