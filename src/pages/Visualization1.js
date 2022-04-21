import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {plotHours} from '../utils/PlotHours';
import {plotExerciseHours} from '../utils/PlotExerciseHours';
import {plotExercises} from '../utils/PlotExercises';
import Colors from '../utils/color'

Visualization1.navigationOptions = ({ navigation }) => ({
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


var plot_x = 375;
var plot_y = 325;


export function Visualization1() {
  return (
    <View style={{ top: 10, left: 10 }}>
      {/* Fist plot */}
      <View>
        <Text style={styles.maintext}>SYMPTOMS PER TYPE OF EXERCISE</Text>
      </View>
      <View style={{ top: -20, right: 34, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.plot1}>
          {plotExercises(plot_x, plot_y)}
        </View>
      </View>

      {/* Second plot*/}
      <View style={{ top: -80 }}>
        <Text style={styles.maintext}>NUMBER OF SYMPTOMS WHILE EXERCISING</Text>
      </View>
      <View style={{ top: -100, right: 34, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.plot1}>
          {plotExerciseHours(plot_x, plot_y)}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  // General button design
  plot1: {
    height: plot_x,
    width: plot_y,
    // width: '100%',
    // aspectRatio: 350 / 75,
  },
  // Taken from Home.js, this probably should be in a shared file
  maintext: {
    fontSize: 18,
    font: "roboto",
    color: "white",
    // fontWeight: "bold",
  },
});
