import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Period from "../components/Period/Period";
import {
  getChartData,
  getChartPeriod,
  groupDataByPeriod,
} from "../utils/chartLabels";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { getMyData } from "../utils/tokenStorage";
import { getBudgetData } from "../utils/budgetData";

const SummaryScreen = () => {
  const [expanded, setExpanded] = useState(true);
  const [period, setPeriod] = useState("month");
  const [chartLabels, setChartLabels] = useState(getChartPeriod("year"));
  const [userIncome, setUserIncome] = useState([]);
  const [userExpense, setUserExpense] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await periodSwitch();
  }, [period]);

  const periodSwitch = async () => {
    try {
      setIsLoading(true);
      let user = await getMyData();
      //Getting Income and Spent details
      let expenses = await getBudgetData(period, "expense");
      let income = await getBudgetData(period, "income");
      //here we will get period Data
      setUserExpense(await groupDataByPeriod(expenses, user?.currency?.symbol));
      setUserIncome(await groupDataByPeriod(income, user?.currency?.symbol));
      let periods = getChartPeriod(period, userIncome, userExpense);
      setChartLabels(periods);

      setIsLoading(false);
    } catch (error) {}
  };

  const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView>
      <Period setPeriod={setPeriod} period={period} />
      {!isLoading ? (
        <>
          <View>
            <LineChart
              data={{
                labels: chartLabels?.xLabels,
                datasets: [
                  {
                    data: chartLabels?.incomeData || [0, 0, 0, 0, 0],
                    strokeWidth: 1,
                    color: (opacity = 1) => "lightgreen",
                    // optional
                  },
                  {
                    data: chartLabels?.expenseData || [0, 0, 0, 0, 0, 0],
                    strokeWidth: 1,
                    color: (opacity = 1) => "red", // optional
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={242}
              yAxisLabel="$ "
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
          {userIncome.length > 0 && (
            <FinanceDetails financeData={userIncome} title="Income" />
          )}
          {userExpense.length > 0 && (
            <FinanceDetails financeData={userExpense} title="Expenses" />
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
