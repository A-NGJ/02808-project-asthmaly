import * as React from 'react';
import {StyleSheet} from 'react-native';
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLegend, VictoryLabel, Background} from "victory-native";
import {darkAndBlack} from './PlotTheme';
import Colors from './color'

// The function in this script makes it possible to create the first plot from the figma protype of the exercise window
function make_data_helper(dates, x_name, y_name) {
  var datalist = [];
  for (const key in dates) {
    const value = dates[key];
    var observation = {[x_name]: key, [y_name]: value};
    datalist.push(observation);
  }
  return datalist
}

export function plotExerciseHours(figsize_x, figsize_y, activity) {
  const barRatio = 1.0
  // Define all hours for use in GetDateHours
  const all_hours = Array.from({length: 24}, (_, i) => (i + 1).toString());

  let timestamps = activity.map(a => new Date(a.timestamp));
  let types = activity.map(a => a.type ? a.type : "other");
  let unique_types = Array.from(new Set(types));

  var byhour1 = new Object();  // byhour1 will contain all "Biking" instances
  var byhour2 = new Object();  // byhour2 will contain all "Walking" instances
  var byhour3 = new Object();  // byhour3 will contain all "Climbing" instances

  // Initialize all hour values
  for (let all_hour of all_hours) {
    // For some reason, this fix is needed even though the values go from 1 to 24 already
    byhour1[all_hour.toString()] = 0;
    byhour2[all_hour.toString()] = 0;
    byhour3[all_hour.toString()] = 0;
  }

  // Loop over timestamps and types of exercises and insert the timestamp as an observation of its hour into the correct object
  timestamps.forEach((timestamp, index) => {
    const type = types[index];
    var hour = timestamp.getHours().toString();  // Get hour and convert to string
      
    // Increment if hour has been observed
    if (type === unique_types[0]) {
      byhour1[hour] += 1;
    }
    else if (type === unique_types[1]) {
      byhour2[hour] += 1;
    }
    else if (type === unique_types[2]) {
      byhour3[hour] += 1;
    }
  });

  // Get data into correct format, see function for details
  byhour1 = make_data_helper(byhour1, "Hours", "Count");
  byhour2 = make_data_helper(byhour2, "Hours", "Count");
  byhour3 = make_data_helper(byhour3, "Hours", "Count");
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
          data={byhour1}
          x="Hours"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={byhour2}
          x="Hours"
          y="Count"
          barRatio={barRatio}
        />
        <VictoryBar
          data={byhour3}
          x="Hours"
          y="Count"
          barRatio={barRatio}
        />
      </VictoryStack>
      <VictoryLegend
        data={[
          { name: "Biking" }, { name: "Walking" }, { name: "Climbing" }
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