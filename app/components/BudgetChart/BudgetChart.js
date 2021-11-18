import React from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

function BudgetChart(props) {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#C04848",
    backgroundGradientTo: "#480048",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const data = {
    labels: ["Income", "Expenses", "Saved", "Vacation"], // optional
    data: [0.4, 0.6, 0.8, 0.25],
  };

  return (
    <ProgressChart
      data={data}
      width={screenWidth}
      height={220}
      strokeWidth={16}
      radius={10}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  );
}

export default BudgetChart;
