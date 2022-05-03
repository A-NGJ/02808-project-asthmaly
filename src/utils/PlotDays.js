import React from 'react';
import {StyleSheet} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel,
  Background,
} from 'victory-native';
import {darkAndBlack} from './PlotTheme';
import {getData} from './GetData';
import {Obs} from '../constants/constants';
import Colors from '../utils/color'

// Define all days and all hours for use in GetDateDays and GetDateHours
const all_days = Array.from({length: 31}, (_, i) => (i + 1).toString());

// The function in this script makes it possible to create the first plot from the figma protype of the symptom window

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
export function GetDateDays(dates) {
  let dateTimes = {};

  // Initialize all day values
  for (let all_day in all_days) {
    // For some reason, this fix is needed even though the values go from 1 to 31 already
    all_day = parseInt(all_day) + 1;
    dateTimes[all_day.toString()] = 0;
  }

  for (let i = 0; i < dates.length; i++) {
    // Get day number and convert to string
    const day = dates[i].getDate().toString();
    // Increment if day has been observed
    dateTimes[day] += 1;
  }
  return make_data_helper(dateTimes, 'Days', 'Count');
}

// Get the number of days in a certain month for x-axis in plot
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export function plotDays(figsize_x, figsize_y, activity, medication, symptoms) {
  const barRatio = 1.0;

  return (
    <VictoryChart
      domainPadding={20}
      theme={darkAndBlack}
      width={figsize_x}
      height={figsize_y}
      padding={{top: 40, bottom: 80, left: 50, right: 120}}
      style={{
        background: {fill: Colors.GRAY},
      }}
      backgroundComponent={
        <Background
          x={-40}
          y={30}
          width={figsize_x + 35}
          height={figsize_y - 60}
        />
      }>
      <VictoryAxis tickFormat={all_days} fixLabelOverlap={true} label="Day of Month" />
      <VictoryAxis
        dependentAxis
        style={{
          grid: {stroke: '#F4F5F7', strokeWidth: 1},
        }}
        tickFormat={x => `${x}`}
        fixLabelOverlap={true}
        label="Symptoms"
      />
      <VictoryStack>
        <VictoryBar
          data={activity.dateTimeByDay}
          x="Days"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={medication.dateTimeByDay}
          x="Days"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={symptoms.dateTimeByDay}
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
