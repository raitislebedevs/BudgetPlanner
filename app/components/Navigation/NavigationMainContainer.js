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
import { useLocale } from "react-easy-localization";
import { connect } from "react-redux";
import { setLoader } from "../../Redux/actions";
import { getUserData, getUserInfoData } from "../../utils/userData";
import * as actions from "../../Redux/actions";
import userInfoServices from "../../services/userInfoServices";

const NavigationMainContainer = ({
  navigation,
  isLoading,
  setIsLoading,
  reduxUser,
  linkedUsers,
  categoryDetails,
  refresh,
  setCurrency,
  setUser,
  setUserInfo,
  setUserCategories,
  setLinkedUsers,
  setUserInvites,
  setLinkedUserInfos,
}) => {
  const { i18n } = useLocale();
  //Screen Names
  const summarryScren = i18n.BottomNavigation.summary;
  const incomeScreen = i18n.BottomNavigation.income;
  const expensesScreen = i18n.BottomNavigation.expanse;
  const budgetScreen = i18n.BottomNavigation.budget;
  const Tab = createBottomTabNavigator();
  const [period, setPeriod] = useState("month");
  const [globalBudget, setGlobalBudget] = useState({});

  useEffect(async () => {
    if (period) await getGlobalBudgetData();
  }, [period]);

  useEffect(async () => {
    if (refresh) {
      let userCore = await getUserData();
      let userInfoData = await getUserInfoData(userCore?.userInfo);
      let linkedUsers = [];
      let userInvites = [];
      userInfoData?.linkedUsers.forEach((person) => {
        linkedUsers.push(person?.id);
      });
      linkedUsers.push(userCore?.id);
      userInfoData?.invites.forEach((person) => {
        userInvites.push(person.id);
      });

      let filter = { linkedUsers_in: linkedUsers };
      const { data } = await userInfoServices.FIND(filter);
      data.forEach((element) => {
        delete element?.userCategories;
        delete element?.linkedUsers;
        delete element?.currency;
      });
      let myUserInfoData = JSON.parse(JSON.stringify(userInfoData));
      delete myUserInfoData?.userCategories;
      delete myUserInfoData?.linkedUsers;
      delete myUserInfoData?.currency;
      data.push(myUserInfoData);
      setLinkedUserInfos(data);

      setCurrency(userInfoData?.currency?.symbol);
      setUser(userCore);
      setLinkedUsers(linkedUsers);
      setUserInfo(userInfoData);
      setUserInvites(userInfoData?.invites);
      setUserCategories(userInfoData?.userCategories);
      await getGlobalBudgetData();
    }
  }, [refresh]);

  const getGlobalBudgetData = async () => {
    try {
      if (period) {
        setIsLoading(true);
        let data = await initilizeData(
          period,
          i18n,
          reduxUser,
          linkedUsers,
          categoryDetails
        );
        setGlobalBudget(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header budget={globalBudget} navigation={navigation} period={period} />
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
              chartLabels={globalBudget?.bezierChartData}
              getGlobalBudgetData={getGlobalBudgetData}
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

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  reduxUser: state.user?.userInfo,
  linkedUsers: state.user?.linkedUsers,
  categoryDetails: state.user?.categories,
  refresh: state.loader.refreshing,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLoading: (value) => dispatch(setLoader(value)),
  setUser: (value) => dispatch(actions.setUser(value)),
  setUserInfo: (value) => dispatch(actions.setUserInfo(value)),
  setUserCategories: (value) => dispatch(actions.setUserCategories(value)),
  setLinkedUsers: (value) => dispatch(actions.setLinkedUsers(value)),
  setUserInvites: (value) => dispatch(actions.setUserInvites(value)),
  setCurrency: (value) => dispatch(actions.setCurrency(value)),
  setLinkedUserInfos: (value) => dispatch(actions.setLinkedUserInfos(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationMainContainer);
