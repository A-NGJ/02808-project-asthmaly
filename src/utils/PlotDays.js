import * as React from 'react';
// import * as assign from 'assign';
import {StyleSheet} from 'react-native';
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLegend, VictoryLabel} from "victory-native";
import {darkAndBlack} from './PlotTheme';


// Define all days and all hours for use in GetDateDays and GetDateHours
const all_days = Array.from({length: 31}, (_, i) => (i + 1).toString());
// console.log(all_days);


function make_data_helper(dates, x_name, y_name) {
  var datalist = [];
  for (const key in dates) {
    const value = dates[key];
    var observation = {[x_name]: key, [y_name]: value};
    datalist.push(observation);
  }
  return datalist
}


// Function to output an object with days as properties and number of observations for each day as values
function GetDateDays(dates) {
  var datetimes_byday = new Object();
  
  // Initialize all day values
  for (var all_day in all_days) {
    // For some reason, this fix is needed even though the values go from 1 to 31 already
    all_day = parseInt(all_day) + 1;
    datetimes_byday[all_day.toString()] = 0;
  }

  for (var i = 0; i < datetimes.length; i++) {
    var day = datetimes[i].getDate().toString();  // Get day number and convert to string

    // Increment if day has been observed
    datetimes_byday[day] += 1;
  }
  // console.log(datetimes_byday);
  var day_data = make_data_helper(datetimes_byday, "Days", "Count");
  return day_data
}


// How to generate the date of when the button was pressed. Contains year, month, day, hours, minutes and seconds. Maybe also timezone
// const datetime = [new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())]
const datetimes = [new Date(1618420117245), new Date(1618420717245), new Date(1618421317245), new Date(1618430117245),
                   new Date(1618620117245), new Date(1618720717245), new Date(1618821317245), new Date(1618930117245)]


// Get the number of days in a certain month for x-axis in plot
function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

const datetimes_byday = GetDateDays(datetimes);
console.log("The days:")
console.log(datetimes_byday);

const datetimes_byhour2 = [
    {Hours: 1, Count: 1},
    {Hours: 13, Count: 1},
    {Hours: 14, Count: 1},
    {Hours: 18, Count: 1}
  ];

const datetimes_byhour3 = [
    {Hours: 1, Count: 2},
    {Hours: 2, Count: 2},
    {Hours: 3, Count: 2},
    {Hours: 4, Count: 2}
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

export function plotDays(figsize_x, figsize_y) {
  return (
    <VictoryChart
      domainPadding={20}
      theme={darkAndBlack}
      width={figsize_x}
      height={figsize_y}
      padding={{ top: 40, bottom: 80, left: 50, right: 120 }}
    >
      <VictoryAxis
        tickValues={[1, 2, 3, 4]}
        tickFormat={all_days}
      />
      <VictoryAxis
        dependentAxis
        style={{
          grid: { stroke: '#F4F5F7', strokeWidth: 1 },
        }}
        tickFormat={(x) => (`${x}`)}
      />
      <VictoryStack>
        <VictoryBar
          data={datetimes_byday}
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