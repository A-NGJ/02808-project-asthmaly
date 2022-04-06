import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native'

import { ContainerCenter } from '../styles/style';

export function RoundedButton(text, onPress, colors) {
  return (
    <View style={[ContainerCenter, {flex: 0.2}]}>
      <TouchableOpacity onPress={onPress} style={{
        paddingVertical: 10,
        backgroundColor: "gray",
        paddingHorizontal: 16,
        borderRadius: 10,
      }}
      >
        <Text style={{fontSize: 24, color: colors.primary}}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}
