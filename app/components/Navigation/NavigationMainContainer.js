import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
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
import { initilizeData } from "../../utils/budgetFunctions";

const NavigationMainContainer = (props) => {
  //Screen Names
  const summarryScren = "Summary";
  const incomeScreen = "Income";
  const expensesScreen = "Expenses";
  const budgetScreen = "Budget";

  const Tab = createBottomTabNavigator();
  const [period, setPeriod] = useState("month");
  const [globalBudget, setGlobalBudget] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    try {
      if (period) {
        setIsLoading(true);
        let data = await initilizeData(period);
        setGlobalBudget(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [period]);

  return (
    <NavigationContainer>
      <Header
        budget={globalBudget}
        isLoading={isLoading}
        currencySymbol={globalBudget.currency}
        period={period}
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
          tabBarActiveTintColor: "brown",
          tabBarInactiveTintColor: "lightgrey",
          tabBarLabelStyle: {
            paddingBottom: 3,
            fontSize: 10,
            fontWeight: "bold",
          },
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
        })}
      >
        <Tab.Screen
          children={() => (
            <SummaryScreen
              period={period}
              budget={globalBudget}
              isLoading={isLoading}
              chartLabels={globalBudget?.bezierChartData}
            />
          )}
          name={summarryScren}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          children={() => (
            <IncomeScreen
              period={period}
              budget={globalBudget}
              isLoading={isLoading}
              currencySymbol={globalBudget.currency}
            />
          )}
          name={incomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          children={() => (
            <ExpensesScreen
              period={period}
              budget={globalBudget}
              isLoading={isLoading}
              currencySymbol={globalBudget.currency}
            />
          )}
          name={expensesScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          children={() => (
            <BudgetScreen
              period={period}
              budget={globalBudget}
              isLoading={isLoading}
              currencySymbol={globalBudget.currency}
            />
          )}
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
