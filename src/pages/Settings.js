import React from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 24,
    height: 32,
  }
});

export const SettingsFlatList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Account'},
          {key: 'Settings'},
        ]}
      />
    </View>
  )
}