import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {plotExerciseHours} from '../utils/PlotExerciseHours';
import {plotExercises} from '../utils/PlotExercises';
import FirebaseConn from '../connection/firestore';
import {useIsFocused} from '@react-navigation/native';
import {Obs} from '../constants/constants';

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

export function Visualization1() {
  const plot_x = 375;
  const plot_y = 325;
  const isFocused = useIsFocused();
  const firebaseConn = FirebaseConn.getInstance();
  const [activity, setActivity] = useState([{"timestamp": 0, "type": "other"}]);

  useEffect(() => {
    let isMounted = true;
    const fetchFirebase = async () => {

      const user_data = await firebaseConn.getAll();
      if (isMounted) {
        setActivity(user_data[Obs.ACTIVITY]);
      }
    };
    fetchFirebase().catch(console.error);
    return () => { isMounted = false };
  }, [isFocused]);
  return (
    <View style={{ top: 10, left: 10 }}>
      {/* Fist plot */}
      <View style={styles.container}>
        <Text style={styles.maintext}>Symptoms Per Exercise</Text>
      </View>
      <View style={{ top: -20, right: 34, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.plot1}>
          {plotExercises(plot_x, plot_y, activity)}
        </View>
      </View>

      {/* Second plot*/}
      <View style={[styles.container, { top: -80 }]}>
        <Text style={styles.maintext}>Symptoms Per Hour</Text>
      </View>
      <View style={{ top: -100, right: 34, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.plot1}>
          {plotExerciseHours(plot_x, plot_y, activity)}
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
  container: {
    justifyContent: "center",
    // flex: 1,
    alignItems: "center",
  }
});
