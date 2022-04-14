import * as React from 'react';
// import * as assign from 'assign';
import {StyleSheet} from 'react-native';
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLegend, VictoryLabel} from "victory-native";
import {darkAndBlack} from '../utils/PlotTheme';


// Function to output an object with days as properties and number of observations for each day as values
function GetDateDays(dates) {
  var datetimes_byday = new Object();
  
  for (var i = 0; i < datetimes.length; i++) {
    var day = datetimes[i].getDate().toString();  // Get day number and convert to string

    if (day in datetimes_byday  === false) {
      // Initialize property if day has not yet been observed
      datetimes_byday[day] = 1;
    }

    else {
      // Increment if day has been observed
      datetimes_byday[day] += 1;
    }
  }
  return datetimes_byday
}


// Function to output an object with hours as properties and number of observations for each hour as values
function GetDateHours(dates) {
  var datetimes_byhour = new Object();
  
  for (var i = 0; i < datetimes.length; i++) {
    var hour = datetimes[i].getHours().toString();  // Get hour and convert to string
    console.log(hour)

    if (hour in datetimes_byhour  === false) {
      // Initialize property if hour has not yet been observed
      datetimes_byhour[hour] = 1;
    }
    
    else {
      // Increment if hour has been observed
      datetimes_byhour[hour] += 1;
    }
  }
  return datetimes_byhour
}


// How to generate the date of when the button was pressed. Contains year, month, day, hours, minutes and seconds. Maybe also timezone
// const datetime = [new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())]
const datetimes = [new Date(1618420117245), new Date(1618420717245), new Date(1618421317245), new Date(1618430117245),
                   new Date(1618620117245), new Date(1618720717245), new Date(1618821317245), new Date(1618930117245)]

var datetimes_byday = GetDateDays(datetimes);
console.log(datetimes_byday);

var datetimes_byhour = GetDateHours(datetimes);
console.log(datetimes_byhour);

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

export function plot(figsize_x, figsize_y) {
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
        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
      />
      <VictoryAxis
        dependentAxis
        style={{
          grid: { stroke: '#F4F5F7', strokeWidth: 1 },
        }}
        tickFormat={(x) => (`$${x / 1000}k`)}
      />
      <VictoryStack>
        <VictoryBar
          data={data2012}
          x="quarter"
          y="earnings"
          barRatio={barRatio}
        />
        <VictoryBar
          data={data2013}
          x="quarter"
          y="earnings"
          barRatio={barRatio}
        />
        <VictoryBar
          data={data2014}
          x="quarter"
          y="earnings"
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