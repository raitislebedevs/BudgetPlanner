import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { colors } from "../../config/colors";

function BudgetChart(props) {
  const { budget, isLoading } = props;
  const [spent, setSpent] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (budget?.budgetPlanningData) {
      overviewChart();
    }
  }, [budget]);

  const overviewChart = () => {
    let labels = [];
    let values = [];
    let plan = [];
    budget?.budgetPlanningData.forEach((group) => {
      labels.push(group.label);
      values.push(group.amountSpent);
      plan.push(group.amoun);
    });

    setSpent(values);
    setPlanning(plan);
    setLabels(labels);
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: colors.primary,
    backgroundGradientFrom: colors.chartGray,
    backgroundGradientTo: colors.chartGray,
    fillShadowGradient: colors.primary,
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    strokeWidth: 6,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const data = {
    labels: labels,
    datasets: [
      {
        data: spent,
      },
      {
        data: planning,
      },
    ],
  };

  return (
    <>
      {!isLoading ? (
        <View>
          <BarChart
            data={data}
            width={screenWidth - 5}
            height={230}
            yAxisLabel={"$ "}
            yAxisSuffix={" $"}
            withInnerLines={true}
            showValuesOnTopOfBars={true}
            fromZero={true}
            chartConfig={chartConfig}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color={colors.secondary} />
      )}
    </>
  );
}

export default BudgetChart;
