import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
//Screens
import SummaryScreen from "../../screens/SummaryScreen";
import ExpensesScreen from "../../screens/ExpensesScreen";
import IncomeScreen from "../../screens/IncomeScreen";
import BudgetScreen from "../../screens/BudgetScreen";
import Header from "../Header/Header";
import Period from "../Period/Period";
//Utils
import { useState } from "react";
import { getMyData } from "../../utils/tokenStorage";
import { getBudgetData } from "../../utils/budgetData";
import { getChartPeriod, groupDataByPeriod } from "../../utils/chartLabels";
import { sumWithReduce } from "../../utils/standaloneFunctions";

//Screen Names
const summarryScren = "Summary";
const incomeScreen = "Income";
const expensesScreen = "Expenses";
const budgetScreen = "Budget";

const Tab = createBottomTabNavigator();

const NavigationMainContainer = (props) => {
  const [period, setPeriod] = useState("month");
  const [chartLabels, setChartLabels] = useState("month");
  const [userIncome, setUserIncome] = useState([]);
  const [userExpense, setUserExpense] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  useEffect(async () => {
    await periodSwitch();
  }, [period]);

  const periodSwitch = async () => {
    try {
      setIsLoading(true);
      let user = await getMyData();
      setCurrencySymbol(user?.currency?.symbol);
      //Getting Income and Spent details
      let expenses = await getBudgetData(period, "expense");
      let income = await getBudgetData(period, "income");
      let userExpenses = await groupDataByPeriod(
        expenses,
        user?.currency?.symbol
      );
      let userIncomes = await groupDataByPeriod(income, user?.currency?.symbol);
      //here we will get period Data

      console.log(
        "INCOME DATA IN ARRAY **************************************",
        income
      );
      let subTotalIncome = sumWithReduce(userIncomes, "total");
      let subTotalExpense = sumWithReduce(userExpenses, "total");
      setUserExpense(subTotalExpense);
      setUserIncome(subTotalIncome);
      console.log(subTotalExpense, subTotalIncome);

      let periods = await getChartPeriod(period, userIncomes, userExpenses);
      setChartLabels(periods);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //Income Data
  const relodIncomeData = async () => {
    setIsLoading(true);
    let user = await getMyData();
    let income = await getBudgetData(period, "income");
    setCurrencySymbol(user?.currency?.symbol);
    setUserIncome(await groupDataByPeriod(income, user?.currency?.symbol));
    setIsLoading(false);
  };

  return (
    <NavigationContainer>
      <Header
        isLoading={isLoading}
        currencySymbol={currencySymbol}
        userIncome={userIncome}
        userExpense={userExpense}
      />
      <Period period={period} setPeriod={setPeriod} />
      <Tab.Navigator
        initialRouteName={summarryScren}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === summarryScren) {
              iconName = focused ? "pie-chart" : "pie-chart-outline";
            }
            if (routeName === incomeScreen) {
              iconName = focused ? "trending-up" : "trending-up-outline";
            }
            if (routeName === expensesScreen) {
              iconName = focused ? "trending-down" : "trending-down-outline";
            }
            if (routeName === budgetScreen) {
              iconName = focused ? "wallet" : "wallet-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "brown",
          inactiveTintColor: "lightgrey",
          labelStyle: { paddingBottom: 3, fontSize: 10, fontWeight: "bold" },
          headerShown: false,
        }}
      >
        <Tab.Screen
          children={() => (
            <SummaryScreen
              period={period}
              chartLabels={chartLabels}
              userExpense={userExpense}
              userIncome={userIncome}
              isLoading={isLoading}
            />
          )}
          name={summarryScren}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          children={() => (
            <IncomeScreen
              period={period}
              isLoading={isLoading}
              userIncome={userIncome}
              currencySymbol={currencySymbol}
              relodIncomeData={relodIncomeData}
            />
          )}
          name={incomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          children={() => <ExpensesScreen period={period} />}
          name={expensesScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          children={() => <BudgetScreen period={period} />}
          name={budgetScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default NavigationMainContainer;
