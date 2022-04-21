import * as React from 'react';
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

// Define all hours for use in GetDateHours
const all_hours = Array.from({length: 24}, (_, i) => (i + 1).toString());

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

  for (let i = 0; i < datetimes.length; i++) {
    const hour = datetimes[i].getHours().toString(); // Get hour and convert to string

    // Increment if hour has been observed
    dateTimes[hour] += 1;
  }
  return make_data_helper(dateTimes, 'Hours', 'Count');
}

// How to generate the date of when the button was pressed. Contains year, month, day, hours, minutes and seconds. Maybe also timezone
// const datetime = [new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())]
const datetimes = [
  new Date(1618420117245),
  new Date(1618420717245),
  new Date(1618421317245),
  new Date(1618430117245),
  new Date(1618620117245),
  new Date(1618720717245),
  new Date(1618821317245),
  new Date(1618930117245),
];

// Get the number of days in a certain month for x-axis in plot
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const datetimes_byhour = GetDateHours(datetimes);

const datetimes_byhour2 = [
  {Hours: 1, Count: 2},
  {Hours: 13, Count: 3},
  {Hours: 14, Count: 4},
  {Hours: 18, Count: 5},
];

const datetimes_byhour3 = [
  {Hours: 1, Count: 1},
  {Hours: 2, Count: 1},
  {Hours: 3, Count: 1},
  {Hours: 4, Count: 1},
];

export function plotHours(figsize_x, figsize_y) {
  const barRatio = 1.0;
  return (
    <VictoryChart
      domainPadding={20}
      theme={darkAndBlack}
      width={figsize_x}
      height={figsize_y}
      padding={{top: 40, bottom: 80, left: 50, right: 120}}>
      <VictoryAxis tickValues={[1, 2, 3, 4]} tickFormat={all_hours} />
      <VictoryAxis
        dependentAxis
        style={{
          grid: {stroke: '#F4F5F7', strokeWidth: 1},
        }}
        tickFormat={x => `${x}`}
      />
      <VictoryStack>
        <VictoryBar
          // data={data2012}
          data={datetimes_byhour}
          x="Hours"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={datetimes_byhour2}
          x="Hours"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={datetimes_byhour3}
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
