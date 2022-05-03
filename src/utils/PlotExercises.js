import * as React from 'react';
// import * as assign from 'assign';
import {StyleSheet} from 'react-native';
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLegend, VictoryLabel, Background} from "victory-native";
import {darkAndBlack} from './PlotTheme';
import Colors from './color'

// The function in this script makes it possible to create the second plot from the figma protype of the exercise window
function make_data_helper(dates, x_name, y_name) {
  var datalist = [];
  for (const key in dates) {
    const value = dates[key];
    var observation = {[x_name]: key, [y_name]: value};
    datalist.push(observation);
  }
  return datalist
}

export function plotExercises(figsize_x, figsize_y, activity) {
  let types = activity.map(a => a.type);
  let unique_types = Array.from(new Set(types));
  var activity_data = new Object();

  for (const type of unique_types) {
    activity_data[type] = 0;
  }

  for (const type of types) {
    activity_data[type] += 1;
  }

  activity_data = make_data_helper(activity_data, "Exercise", "Count")
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
        tickFormat={unique_types}
        fixLabelOverlap={true}
        label="Exercise Type"
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
          data={activity_data}
          x="Exercise"
          y="Count"
          barWidth = {40}
        />
      </VictoryStack>
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