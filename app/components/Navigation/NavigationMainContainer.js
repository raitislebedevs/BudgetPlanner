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

//Screen Names

const summarryScren = "Summary";
const incomeScreen = "Income";
const expensesScreen = "Expenses";
const budgetScreen = "Budget";

const Tab = createBottomTabNavigator();

function NavigationMainContainer(props) {
  return (
    <NavigationContainer>
      <Header />
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
          name={summarryScren}
          component={SummaryScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={incomeScreen}
          component={IncomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={expensesScreen}
          component={ExpensesScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={budgetScreen}
          component={BudgetScreen}
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
