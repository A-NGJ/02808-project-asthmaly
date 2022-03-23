import React from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  item: {
    padding: 10,
    fontSize: 24,
    height: 60,
  }
});

function rowItem(data, colors) {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <MaterialCommunityIcons name="home" color={colors.primary} size={32} />
      <Text style={styles.item}>{data.key}</Text>
    </View>
  );
}

const Profile = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Account'},
          {key: 'Settings'},
          {key: 'Send Data To Doctor'},
          {key: 'Feedback & Support'},
          {key: 'About'},
          {key: 'Logout'},
        ]}
        renderItem={({item}) => rowItem(item, colors)}
      />
    </View>
  );
}

export default Profile;
