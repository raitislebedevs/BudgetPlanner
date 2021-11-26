import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { colors } from "../../config/colors";
import { formatNumber } from "../../utils/standaloneFunctions";

function SummaryChart({ chartLabels, currrency }) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <>
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        domainPadding={{ x: 13, y: 15 }}
        theme={VictoryTheme.material}
        style={{
          grid: { stroke: "#F4F5F7", strokeWidth: 0.5 },
        }}
        width={screenWidth}
        height={screenWidth - 70}
        padding={{ left: 60, right: 50, bottom: 40, top: -30 }}
      >
        <VictoryAxis
          style={{
            grid: {
              stroke: "#718096",
              strokeDasharray: "3 10",
            },
            tickLabels: { fontSize: 13 },
          }}
          theme={VictoryTheme.material}
        />
        <VictoryAxis
          dependentAxis
          style={{
            grid: {
              stroke: "#718096",
              strokeDasharray: "3 10",
            },
            tickLabels: { fontSize: 13 },
          }}
          tickValues={chartLabels?.yAxis}
          tickFormat={(t) =>
            `${formatNumber(parseFloat(t).toFixed(0), currrency)}`
          }
        />
        <VictoryLine
          interpolation="monotoneX"
          data={chartLabels?.positive}
          style={{
            data: { stroke: colors.tertiary, strokeWidth: 1 },
            grid: { stroke: "#F4F5F7", strokeWidth: 0.5 },
          }}
          x="period"
          y={(d) => d.amount}
        />
        <VictoryLine
          interpolation="monotoneX"
          data={chartLabels?.negative}
          style={{ data: { stroke: colors.secondary, strokeWidth: 1 } }}
          x="period"
          y={(d) => d.amount}
        />
        <VictoryScatter
          data={chartLabels?.negative}
          style={{ data: { fill: colors.secondary } }}
          size={4}
          x="period"
          y={(d) => d.amount}
        />
        <VictoryScatter
          data={chartLabels?.positive}
          style={{ data: { fill: colors.tertiary } }}
          size={4}
          x="period"
          y={(d) => d.amount}
        />
      </VictoryChart>
    </>
  );
}

const mapStateToProps = (state) => ({
  currrency: state.user?.currrency || "$",
});

export default connect(mapStateToProps)(SummaryChart);
