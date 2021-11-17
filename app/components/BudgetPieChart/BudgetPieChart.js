import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";

function BudgetPieChart(props) {
  const { isLoading, chartData, color } = props;
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <>
      {!isLoading ? (
        <>
          {chartData?.length > 0 && (
            <PieChart
              data={chartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={"amount"}
              paddingLeft={"15"}
              center={[0, 0]}
              absolute
            />
          )}
        </>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color={color} />
      )}
    </>
  );
}

export default BudgetPieChart;

const styles = StyleSheet.create({
  loader: {
    marginTop: 25,
  },
});
