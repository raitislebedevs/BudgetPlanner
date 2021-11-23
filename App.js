import React from "react";
import NavigationMainContainer from "./app/components/Navigation/NavigationMainContainer";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocaleProvider } from "react-easy-localization";
import { languages } from "./app/locales";
import CategorySetUpScreen from "./app/screens/CategorySetUpScreen";
import { Provider } from "react-redux";
import store from "./app/Redux/store";
import CategoryIncomeScreens from "./app/screens/CategoryIncomeScreens";

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
              name="Category"
              component={CategorySetUpScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Expense Category"
              component={CategoryIncomeScreens}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LocaleProvider>
    </Provider>
  );
}
