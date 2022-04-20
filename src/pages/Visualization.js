import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {plotHours} from '../utils/PlotHours';
import {plotDays} from '../utils/PlotDays';

Visualization.navigationOptions = ({navigation}) => ({
  tabBarLabel: 'Visualization',
  tabBarIcon: ({color, size}) => <Icon name="poll" color={color} size={size} />,
  headerRight: () => (
    <Icon
      name="dots-vertical"
      color={'#ffff'}
      size={25}
      onPress={() => navigation.navigate('Settings')}
    />
  ),
});

const plot_x = 375;
const plot_y = 350;

export function Visualization() {
  return (
    <View style={styles.plot1Container}>
      {/* Fist plot */}
      <View>
        <Text style={styles.mainText}>NUMBER OF SYMPTOMS BY DATE</Text>
      </View>
      <View style={styles.plot1InnerContainer}>
        <View style={styles.plotStyle}>{plotDays(plot_x, plot_y)}</View>
      </View>

      {/* Second plot */}
      <View style={styles.plot2Container}>
        <Text style={styles.mainText}>NUMBER OF SYMPTOMS BY HOUR</Text>
      </View>
      <View style={styles.plot2InnerContainer}>
        <View style={styles.plotStyle}>{plotHours(plot_x, plot_y)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  plotStyle: {
    height: 375,
    width: 350,
    // width: '100%',
    // aspectRatio: 350 / 75,
  },
  plot1Container: {
    top: 10,
    left: 10,
  },
  plot1InnerContainer: {
    top: -20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plot2Container: {
    top: -60,
  },
  plot2InnerContainer: {
    top: -80,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Taken from Home.js, this probably should be in a shared file
  mainText: {
    fontSize: 18,
    font: 'roboto',
    color: 'white',
    // fontWeight: "bold",
  },
});
