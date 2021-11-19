import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";

const SummaryScreen = (props) => {
  const { budget, chartLabels, isLoading } = props;

  const highlight = (id) => {};

  return (
    <ScrollView>
      {!isLoading ? (
        <>
          <View>
            <LineChart
              data={{
                labels: chartLabels?.xLabels,
                datasets: [
                  {
                    data: chartLabels?.incomeChartData || [0, 0, 0, 0, 0],
                    strokeWidth: 1,
                    color: (opacity = 1) => "lightgreen",
                    // optional
                  },
                  {
                    data: chartLabels?.expenseChartData || [0, 0, 0, 0, 0, 0],
                    strokeWidth: 1,
                    color: (opacity = 1) => "red", // optional
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={242}
              yAxisLabel={`${budget?.currency || "$"} `}
              title="Summary"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#C04848",
                backgroundGradientTo: "#480048",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "1",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 0,
                borderRadius: 8,
              }}
            />
          </View>
          {budget?.incomeData?.length > 0 && (
            <FinanceDetails
              financeData={budget.incomeData}
              title="Income"
              highlight={highlight}
            />
          )}
          {budget?.expenseData?.length > 0 && (
            <FinanceDetails
              financeData={budget.expenseData}
              title="Expenses"
              highlight={highlight}
            />
          )}
        </>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#e26a00" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  budgetItem: {
    color: "purple",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 38,
  },
});

export default SummaryScreen;
