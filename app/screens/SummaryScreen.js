import React, { useState } from "react";
import { withLocale } from "react-easy-localization";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import AskModal from "../components/AskModal/AskModal";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { colors } from "../config/colors";

const SummaryScreen = (props) => {
  const { budget, chartLabels, isLoading, i18n, getGlobalBudgetData } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };
  console.log(budget);
  return (
    <>
      <AskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        getGlobalBudgetData={getGlobalBudgetData}
      />
      {budget.savedAmount + budget.spentAmount != 0 ? (
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
                        data: chartLabels?.expenseChartData || [
                          0, 0, 0, 0, 0, 0,
                        ],
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
                  color={{ firstList: "tertiary", secondList: "primary" }}
                />
              )}

              {budget?.expenseData?.length > 0 && (
                <FinanceDetails
                  financeData={budget.expenseData}
                  title={i18n.ExpenseScreen.label}
                  highlight={highlight}
                  color={{ firstList: "secondary", secondList: "primary" }}
                />
              )}
            </>
          ) : (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#e26a00"
            />
          )}
        </ScrollView>
      ) : (
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>Enter some Data</Text>
        </View>
      )}
    </>
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
  headingTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    color: colors.tertiary,
  },
});

export default withLocale(SummaryScreen);
