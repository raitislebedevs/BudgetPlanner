import React, { useEffect } from "react";
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
import { colors } from "../../config/colors";
import { withLocale } from "react-easy-localization";

const NavigationMainContainer = ({ navigation, i18n }) => {
  //Screen Names
  const summarryScren = i18n.BottomNavigation.summary;
  const incomeScreen = i18n.BottomNavigation.income;
  const expensesScreen = i18n.BottomNavigation.expanse;
  const budgetScreen = i18n.BottomNavigation.budget;

  const Tab = createBottomTabNavigator();
  const [period, setPeriod] = useState("month");
  const [globalBudget, setGlobalBudget] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    await getGlobalBudgetData();
  }, [period]);

  const getGlobalBudgetData = async () => {
    try {
      if (period) {
        setIsLoading(true);
        let data = await initilizeData(period, i18n);
        setGlobalBudget(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.mediumGray,
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
              getGlobalBudgetData={getGlobalBudgetData}
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
              getGlobalBudgetData={getGlobalBudgetData}
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
              getGlobalBudgetData={getGlobalBudgetData}
            />
          )}
          name={budgetScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
};

export default withLocale(NavigationMainContainer);
