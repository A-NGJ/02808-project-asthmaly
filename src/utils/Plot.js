import * as React from 'react';
// import * as assign from 'assign';
import {StyleSheet} from 'react-native';
import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLegend, VictoryLabel} from "victory-native";
import {darkAndBlack} from '../utils/PlotTheme';


const data2012 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2013 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data2014 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

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