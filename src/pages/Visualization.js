import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {plotHours} from '../utils/PlotHours';
import {plotDays} from '../utils/PlotDays';
import Colors from '../utils/color'

Visualization.navigationOptions = ({ navigation }) => ({
  tabBarLabel: "Visualization",
  tabBarIcon: ({ color, size }) => (
    <Icon
      name="poll"
      color={color}
      size={size} />
  ),
  headerRight: () => (
    <Icon
      name="dots-vertical"
      color={"#ffff"}
      size={25}
      onPress={() => navigation.navigate("Settings")}
    />
  ),
});


var plot_x = 375
var plot_y = 350


export function Visualization() {
  return (
    <View style={{top: 10, left: 10}}>
      {/* Fist plot */}
      <View>
        <Text style={styles.maintext}>NUMBER OF SYMPTOMS BY DATE</Text>
      </View>
      <View style={{top: -20, right: 20, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.plot1}>
          {plotDays(plot_x, plot_y)}
        </View>
      </View>

      {/* Second plot */}
      <View style={{top: -60}}>
        <Text style={styles.maintext}>NUMBER OF SYMPTOMS BY HOUR</Text>
      </View>
      <View style={{top: -80, right: 20, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.plot1}>
          {plotHours(plot_x, plot_y)}
        </View>
      </View>
    </View>
  )};


const styles = StyleSheet.create({
  // General button design
  plot1: {
      height: plot_x,
      width: plot_y,
      // width: '100%',
      // aspectRatio: 350 / 75,
  },
  // Taken from Home.js, this probably should be in a shared file
  maintext : {
        fontSize: 18,
        font: 'roboto',
        color: "white",
        // fontWeight: "bold",
    },
});