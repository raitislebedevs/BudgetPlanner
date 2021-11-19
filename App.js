import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import NavigationMainContainer from "./app/components/Navigation/NavigationMainContainer";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import { getValueFor } from "./app/utils/expoSecure";
import { getMyData } from "./app/utils/userData";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userSecret, setUserSecret] = useState(false);

  useEffect(async () => {
    if (await getMyData()) {
      let token = await getValueFor("access_token");
      setUserSecret(token);
    }
  });

  if (userSecret)
    return (
      <>
        <NavigationMainContainer />
      </>
    );

  if (!userSecret)
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              screenOptions={{
                headerShown: false,
              }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              screenOptions={{
                headerShown: false,
              }}
              name="Register"
              component={RegisterScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  toastStyle: {
    backgroundColor: "black",
    color: "#fff",
  },
});
