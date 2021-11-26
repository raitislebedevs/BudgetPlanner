import React, { useState } from "react";
import NavigationMainContainer from "./app/components/Navigation/NavigationMainContainer";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocaleProvider } from "react-easy-localization";
import { languages } from "./app/locales";
import { Provider } from "react-redux";
import store from "./app/Redux/store";
import CategoryExpenseScreens from "./app/screens/CategoryExpenseScreens";
import CategoryIncomeScreen from "./app/screens/CategoryIncomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <LocaleProvider resources={languages}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Login"}>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="MainScreen"
              component={NavigationMainContainer}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Income Category"
              component={CategoryIncomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Expense Category"
              component={CategoryExpenseScreens}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LocaleProvider>
    </Provider>
  );
}
