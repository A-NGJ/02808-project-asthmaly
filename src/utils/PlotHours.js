import * as React from 'react';
// import * as assign from 'assign';
import {StyleSheet} from 'react-native';
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLegend, VictoryLabel, Background} from "victory-native";
import {darkAndBlack} from './PlotTheme';
import Colors from '../utils/color'

// Define all hours for use in GetDateHours
const all_hours = Array.from({length: 24}, (_, i) => (i + 1).toString());


function make_data_helper(dates, x_name, y_name) {
  var datalist = [];
  for (const key in dates) {
    const value = dates[key];
    var observation = {[x_name]: key, [y_name]: value};
    datalist.push(observation);
  }
  return datalist
}


// Function to output an object with hours as properties and number of observations for each hour as values
function GetDateHours(dates) {
  var datetimes_byhour = new Object();
  
  // Initialize all hour values
  for (var all_hour in all_hours) {
    // For some reason, this fix is needed even though the values go from 1 to 24 already
    all_hour = parseInt(all_hour) + 1;
    datetimes_byhour[all_hour.toString()] = 0;
  }

  for (var i = 0; i < datetimes.length; i++) {
    var hour = datetimes[i].getHours().toString();  // Get hour and convert to string
    
    // Increment if hour has been observed
    datetimes_byhour[hour] += 1;
  }
  var hour_data = make_data_helper(datetimes_byhour, "Hours", "Count");
  return hour_data
}


// How to generate the date of when the button was pressed. Contains year, month, day, hours, minutes and seconds. Maybe also timezone
// const datetime = [new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())]
const datetimes = [new Date(1618420117245), new Date(1618420717245), new Date(1618421317245), new Date(1618430117245),
                   new Date(1618620117245), new Date(1618720717245), new Date(1618821317245), new Date(1618930117245)]


// Get the number of days in a certain month for x-axis in plot
function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

const datetimes_byhour = GetDateHours(datetimes);

const datetimes_byhour2 = [
    {Hours: 1, Count: 2},
    {Hours: 13, Count: 3},
    {Hours: 14, Count: 4},
    {Hours: 18, Count: 5}
  ];

const datetimes_byhour3 = [
    {Hours: 1, Count: 1},
    {Hours: 2, Count: 1},
    {Hours: 3, Count: 1},
    {Hours: 4, Count: 1}
  ];

// Sort the data point by hour and by date and insert them into an object for easy plotting.

// Old example data
// const data2012 = [
//   {quarter: 1, earnings: 13000},
//   {quarter: 2, earnings: 16500},
//   {quarter: 3, earnings: 14250},
//   {quarter: 4, earnings: 19000}
// ];

// const data2013 = [
//   {quarter: 1, earnings: 15000},
//   {quarter: 2, earnings: 12500},
//   {quarter: 3, earnings: 19500},
//   {quarter: 4, earnings: 13000}
// ];

// const data2014 = [
//   {quarter: 1, earnings: 11500},
//   {quarter: 2, earnings: 13250},
//   {quarter: 3, earnings: 20000},
//   {quarter: 4, earnings: 15500}
// ];

var barRatio = 1.0

export function plotHours(figsize_x, figsize_y) {
  return (
    <VictoryChart
      domainPadding={20}
      theme={darkAndBlack}
      width={figsize_x}
      height={figsize_y}
      padding={{ top: 40, bottom: 80, left: 50, right: 120 }}
      style={{
        background: { fill: Colors.GRAY }
      }}
      backgroundComponent={<Background x={-40} y={30} width={figsize_x + 35} height={figsize_y - 60}/>}
    >
      <VictoryAxis
        tickFormat={all_hours}
        fixLabelOverlap={true}
        label="Hours"
      />
      <VictoryAxis
        dependentAxis
        style={{
          grid: { stroke: '#F4F5F7', strokeWidth: 1 },
        }}
        tickFormat={(x) => (`${x}`)}
        fixLabelOverlap={true}
        label="Symptoms"
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
        data={[
          { name: "Exercise" }, { name: "Medication" }, { name: "Symptom" }
        ]}
        title="Status"
        labelComponent={<VictoryLabel angle={0}/>}
        x={figsize_x-115} y={35}
        rowGutter={{ top: 0, bottom: -5 }}
      />
    </VictoryChart>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#383434"
  }
});