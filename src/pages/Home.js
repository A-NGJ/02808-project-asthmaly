import * as React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {Button, Box} from "native-base";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Home() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}
