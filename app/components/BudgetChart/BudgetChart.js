import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { colors } from "../../config/colors";
import { formatNumber } from "../../utils/standaloneFunctions";

function BudgetChart(props) {
  const { budget, currrency } = props;
  const chartData = budget.budgetChartData;
  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        domainPadding={{ x: 20, y: 15 }}
        theme={VictoryTheme.material}
        style={{
          grid: { stroke: "#F4F5F7", strokeWidth: 0.5 },
        }}
        width={screenWidth}
        height={screenWidth - 70}
        margin={30}
        padding={{ left: 50, right: 50, bottom: 40, top: 5 }}
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
          tickValues={chartData?.yAxis}
          tickFormat={(t) =>
            `${formatNumber(parseFloat(t).toFixed(0), currrency)}`
          }
        />
        <VictoryGroup offset={18}>
          <VictoryBar
            style={{ data: { fill: colors.primary } }}
            data={chartData?.budgetData}
          />
          <VictoryBar
            style={{ data: { fill: colors.secondary } }}
            data={chartData?.spentData}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}

const mapStateToProps = (state) => ({
  currrency: state.user?.currrency || "$",
});

export default connect(mapStateToProps)(BudgetChart);
