import React from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native';
import { IconType } from '../constants/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  item: {
    padding: 8,
    fontSize: 20,
  }
});

function rowItem(data, colors) {
  switch (data.iconType) {
    case IconType.MaterialCommunity:
    return (
      <View>
        <MaterialCommunityIcons.Button name={data.icon} backgroundColor={colors.background} size={40} underlayColor={colors.primary} onPress={() => {}} >
          <Text style={styles.item}>{data.key}</Text>
        </MaterialCommunityIcons.Button>
      </View>
    )
    case IconType.Ionicons:
    return (
      <View>
        <Icon.Button name={data.icon} backgroundColor={colors.background} size={40} underlayColor={colors.primary} onPress={() => {}} >
          <Text style={styles.item}>{data.key}</Text>
        </Icon.Button>
      </View>
    );
    case IconType.Material:
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <MaterialIcons name={data.icon} color={colors.primary} size={40}>
          <Text style={styles.item}>{data.key}</Text>
        </MaterialIcons>
      </View>
    )
  }
}

const Profile = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Account', icon: 'account', iconType: IconType.MaterialCommunity},
          {key: 'Settings', icon: 'settings', iconType: IconType.Ionicons},
          {key: 'Send Data To Doctor', icon: 'medical-bag', iconType: IconType.MaterialCommunity},
          {key: 'Feedback & Support', icon: 'comment-question', iconType: IconType.MaterialCommunity},
          {key: 'About', icon: 'information-outline', iconType: IconType.MaterialCommunity},
          {key: 'Logout', icon: 'logout', iconType: IconType.MaterialCommunity},
        ]}
        renderItem={({item}) => rowItem(item, colors)}
      />
    </View>
  );
}

export default Profile;
