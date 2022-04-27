import * as React from 'react';
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
import Colors from '../utils/color';

// Define all hours for use in GetDateHours
const all_hours = Array.from({length: 24}, (_, i) => (i + 1).toString());

// The function in this script makes it possible to create the second plot from the figma protype of the symptom window

function make_data_helper(dates, x_name, y_name) {
  const datalist = [];
  for (const key in dates) {
    const value = dates[key];
    const observation = {[x_name]: key, [y_name]: value};
    datalist.push(observation);
  }
  return datalist;
}

// Function to output an object with hours as properties and number of observations for each hour as values
export function GetDateHours(dates) {
  const dateTimes = {};

  // Initialize all hour values
  for (let all_hour in all_hours) {
    // For some reason, this fix is needed even though the values go from 1 to 24 already
    all_hour = parseInt(all_hour) + 1;
    dateTimes[all_hour.toString()] = 0;
  }

  for (let i = 0; i < dates.length; i++) {
    const hour = dates[i].getHours().toString(); // Get hour and convert to string

    // Increment if hour has been observed
    dateTimes[hour] += 1;
  }
  return make_data_helper(dateTimes, 'Hours', 'Count');
}

// Get the number of days in a certain month for x-axis in plot
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export function plotHours(figsize_x, figsize_y) {
  const barRatio = 1.0;
  const getActivity = getData(Obs.ACTIVITY);
  const getMedication = getData(Obs.MEDICATION);
  const getSymptoms = getData(Obs.SYMPTOMS);

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
      <VictoryAxis
        tickFormat={all_hours}
        fixLabelOverlap={true}
        label="Hour of Day"
      />
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
          data={getActivity.dateTimeByHours}
          x="Hours"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={getMedication.dateTimeByHours}
          x="Hours"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={getSymptoms.dateTimeByHours}
          x="Hours"
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
