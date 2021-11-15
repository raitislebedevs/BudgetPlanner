import React from "react";
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
import { useState } from "react";

//Screen Names

const summarryScren = "Summary";
const incomeScreen = "Income";
const expensesScreen = "Expenses";
const budgetScreen = "Budget";

const Tab = createBottomTabNavigator();

function NavigationMainContainer(props) {
  const [period, setPeriod] = useState("month");
  return (
    <NavigationContainer>
      <Header />
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
          children={() => <SummaryScreen period={period} />}
          name={summarryScren}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          children={() => <IncomeScreen period={period} />}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default NavigationMainContainer;
