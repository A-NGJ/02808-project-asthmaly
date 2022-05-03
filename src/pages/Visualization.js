import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {plotHours} from '../utils/PlotHours';
import {plotDays} from '../utils/PlotDays';
import {useIsFocused} from '@react-navigation/native';
import FirebaseConn from '../connection/firestore';
import {GetDateHours} from '../utils/PlotHours';
import {GetDateDays} from '../utils/PlotDays';
import {Field, Obs} from '../constants/constants';

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

function obs2date(data) {
  let dateTimes = data.map(x => new Date(x));
  const dateTimeByDay = GetDateDays(dateTimes);
  const dateTimeByHours = GetDateHours(dateTimes);
  return {
    dateTimeByDay,
    dateTimeByHours,
  };
}

export function Visualization() {
  const plot_x = 375;
  const plot_y = 325;
  const isFocused = useIsFocused();
  const firebaseConn = FirebaseConn.getInstance();
  const [symptoms, setSymptoms] = useState(obs2date([]));
  const [medication, setMedication] = useState(obs2date([]));
  const [activityTimestamp, setActivityTimestamp] = useState(obs2date([]));

  useEffect(() => {
    const fetchFirebase = async () => {

      const user_data = await firebaseConn.getAll();
      setSymptoms(obs2date(user_data[Obs.SYMPTOMS]))
      setMedication(obs2date(user_data[Obs.MEDICATION]))

      let activity = user_data[Obs.ACTIVITY];
      let timestamp = activity.map(d => d.timestamp)
      setActivityTimestamp(obs2date(timestamp))
    };
    fetchFirebase().catch(console.error);
  }, [isFocused]);

  return (
    // <Text>Placeholder text</Text>
    <View style={styles.plot1Container}>
      {/* Fist plot */}
      <View>
        <Text style={styles.mainText}>NUMBER OF SYMPTOMS BY DAY</Text>
      </View>
      <View style={styles.plot1InnerContainer}>
        <View style={styles.plot1}>
          {plotDays(plot_x, plot_y, activityTimestamp, medication, symptoms)}
        </View>
      </View>

      {/* Second plot */}
      <View style={styles.plot2Container}>
        <Text style={styles.mainText}>NUMBER OF SYMPTOMS BY HOUR</Text>
      </View>
      <View style={styles.plot2InnerContainer}>
        <View style={styles.plot1}>
          {plotHours(plot_x, plot_y, activityTimestamp, medication, symptoms)}
        </View>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  plot1: {
    height: 375,
    width: 325,
    // width: '100%',
    // aspectRatio: 350 / 75,
  },
  plot1Container: {
    top: 10,
    left: 10,
  },
  plot1InnerContainer: {
    top: -20,
    right: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plot2Container: {
    top: -80,
  },
  plot2InnerContainer: {
    top: -100,
    right: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Taken from Home.js, this probably should be in a shared file
  mainText: {
    fontSize: 18,
    color: '#ffff',
  },
});
