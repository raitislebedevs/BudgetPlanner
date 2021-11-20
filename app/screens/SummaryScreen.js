import React, { useState } from "react";
import { withLocale } from "react-easy-localization";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { colors } from "../config/colors";

const SummaryScreen = (props) => {
  const { budget, chartLabels, isLoading, i18n } = props;

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
                    color: (opacity = 1) => colors.tertiary,
                    // optional
                  },
                  {
                    data: chartLabels?.expenseChartData || [0, 0, 0, 0, 0, 0],
                    strokeWidth: 1,
                    color: (opacity = 1) => colors.secondary, // optional
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={242}
              yAxisLabel={`${budget?.currency || "$"} `}
              title="Summary"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                // backgroundGradientFrom: "#C04848",
                // backgroundGradientTo: "#480048",
                backgroundGradientFrom: "#F2F2F2",
                backgroundGradientTo: "#F2F2F2",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "0",
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
              title={i18n.IncomeScreen.label}
              highlight={highlight}
            />
          )}

          {budget?.expenseData?.length > 0 && (
            <FinanceDetails
              financeData={budget.expenseData}
              title={i18n.ExpenseScreen.label}
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

export default withLocale(SummaryScreen);
