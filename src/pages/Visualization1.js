import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {plotHours} from '../utils/PlotHours';
import {plotExerciseHours} from '../utils/PlotExerciseHours';
import {plotExercises} from '../utils/PlotExercises';
import Colors from '../utils/color'
import FirebaseConn from '../connection/firestore';
import {useIsFocused} from '@react-navigation/native';
import {GetDateHours} from '../utils/PlotHours';
import {GetDateDays} from '../utils/PlotDays';
import {Field, Obs} from '../constants/constants';

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

function obs2date(data) {
  let dateTimes = data.map(x => new Date(x));
  const dateTimeByDay = GetDateDays(dateTimes);
  const dateTimeByHours = GetDateHours(dateTimes);
  return {
    dateTimeByDay,
    dateTimeByHours,
  };
}


export function Visualization1() {
  const plot_x = 375;
  const plot_y = 325;
  const isFocused = useIsFocused();
  const firebaseConn = FirebaseConn.getInstance();
  const [activity, setActivity] = useState();

  useEffect(() => {
    const fetchFirebase = async () => {

      const user_data = await firebaseConn.getAll();
      setActivity(user_data[Obs.ACTIVITY]);
     
    };
    fetchFirebase().catch(console.error);
  }, [isFocused]);
  return (
    <View style={{ top: 10, left: 10 }}>
      {/* Fist plot */}
      <View>
        <Text style={styles.maintext}>SYMPTOMS PER TYPE OF EXERCISE</Text>
      </View>
      <View style={{ top: -20, right: 34, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.plot1}>
          {plotExercises(plot_x, plot_y, activity)}
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
    height: 375,
    width: 325,
  },
  // Taken from Home.js, this probably should be in a shared file
  maintext: {
    fontSize: 18,
    color: "white",
  },
});
