import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryStack,
} from 'victory-native';
import {darkAndBlack} from './PlotTheme';
import FirebaseConn from '../connection/firestore';
import {useIsFocused} from '@react-navigation/native';

// Define all days and all hours for use in GetDateDays and GetDateHours
const all_days = Array.from({length: 31}, (_, i) => (i + 1).toString());

function make_data_helper(dates, x_name, y_name) {
  let datalist = [];
  for (const key in dates) {
    const value = dates[key];
    const observation = {[x_name]: key, [y_name]: value};
    datalist.push(observation);
  }
  return datalist;
}

// Function to output an object with days as properties and number of observations for each day as values
function GetDateDays(dates) {
  let datetimes_byday = {};

  // Initialize all day values
  for (let all_day in all_days) {
    // For some reason, this fix is needed even though the values go from 1 to 31 already
    all_day = parseInt(all_day) + 1;
    datetimes_byday[all_day.toString()] = 0;
  }

  for (let i = 0; i < dates.length; i++) {
    const day = dates[i].getDate().toString(); // Get day number and convert to string
    // Increment if day has been observed
    datetimes_byday[day] += 1;
  }
  return make_data_helper(datetimes_byday, 'Days', 'Count');
}

// Get the number of days in a certain month for x-axis in plot
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const datetimes_byhour2 = [
  {Hours: 1, Count: 1},
  {Hours: 13, Count: 1},
  {Hours: 14, Count: 1},
  {Hours: 18, Count: 1},
];

const datetimes_byhour3 = [
  {Hours: 1, Count: 2},
  {Hours: 2, Count: 2},
  {Hours: 3, Count: 2},
  {Hours: 4, Count: 2},
];

function getSymptoms() {
  const firebaseConn = new FirebaseConn();
  const [timestamps, setTimestamps] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchFirebase = async () => {
      const symptoms = await firebaseConn.getSymptoms();
      setTimestamps(symptoms);
    };
    fetchFirebase();
  }, [isFocused]);

  const dateTimes = timestamps.map(x => new Date(x));

  return GetDateDays(dateTimes);
}

export function plotDays(figsize_x, figsize_y) {
  const barRatio = 1.0;
  const dateTimesByDay = getSymptoms();

  return (
    <VictoryChart
      domainPadding={20}
      theme={darkAndBlack}
      width={figsize_x}
      height={figsize_y}
      padding={{top: 40, bottom: 80, left: 50, right: 120}}>
      <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={all_days} />
      <VictoryAxis
        dependentAxis
        style={{
          grid: {stroke: '#F4F5F7', strokeWidth: 1},
        }}
        tickFormat={x => `${x}`}
      />
      <VictoryStack>
        <VictoryBar
          data={dateTimesByDay}
          x="Days"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={datetimes_byhour2}
          x="Days"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={datetimes_byhour3}
          x="Days"
          y="Count"
          barRatio={barRatio}
        />
      </VictoryStack>
      <VictoryLegend
        data={[{name: 'Exercise'}, {name: 'Medication'}, {name: 'Symptom'}]}
        title="Status"
        labelComponent={<VictoryLabel angle={0} />}
        x={figsize_x - 115}
        y={35}
        rowGutter={{top: 0, bottom: -5}}
      />
    </VictoryChart>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383434',
  },
});
