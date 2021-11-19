import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

function BudgetChart(props) {
  const { budget, isLoading } = props;

  const [spent, setSpent] = useState(0.1);
  const [planning, setPlanning] = useState(0.2);
  const [guru, setGuru] = useState(0.3);

  useEffect(() => {
    if (budget?.budgetPlanningData) {
      spentProgress();
      planningProgress();
      savedProgress();
    }
  }, [budget]);

  const spentProgress = () => {
    try {
      let count = 0;
      let achievied = 0;
      budget?.budgetPlanningData.forEach((element) => {
        count++;
        if (element.total > element.amountSpent) achievied++;
      });

      if (count > 0) setSpent(parseFloat(achievied / count));
    } catch (error) {}
  };

  const planningProgress = () => {
    try {
      let count = 0;
      let achievied = 0;
      budget?.budgetPlanningData?.forEach((element) => {
        count++;
        if (element.total != 0) achievied++;
        element.data.forEach((item) => {
          count++;
          if (item.amount != 0) achievied++;
        });
      });

      if (count > 0) setPlanning(parseFloat(achievied / count));
    } catch (error) {}
  };

  const savedProgress = () => {
    try {
      let divisor = budget.incomeAmount || Number.MAX_SAFE_INTEGER;
      let guru = parseFloat(
        (budget.incomeAmount - budget.spentAmount) / divisor
      ).toFixed(2);

      if (guru > 0.3) return setGuru(1);
      setGuru(guru / 0.3);
    } catch (error) {}
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#C04848",
    backgroundGradientTo: "#480048",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    strokeWidth: 6,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const data = {
    labels: ["Budget", "Planning", "Guru"], // optional
    data: [spent, planning, guru],
  };

  return (
    <>
      {!isLoading ? (
        <>
          <ProgressChart
            data={data}
            width={screenWidth}
            height={196}
            strokeWidth={16}
            radius={30}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </>
      ) : (
        <ActivityIndicator
          //style={styles.loader}
          size="large"
          color="darkblue"
        />
      )}
    </>
  );
}

export default BudgetChart;
