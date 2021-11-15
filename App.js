import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import NavigationMainContainer from "./app/components/Navigation/NavigationMainContainer";
import LoginScreen from "./app/screens/LoginScreen";
import { Provider as PaperProvider } from "react-native-paper";
import RegisterScreen from "./app/screens/RegisterScreen";
import { getMyData, getValueFor } from "./app/utils/tokenStorage";

export default function App() {
  const [userSecret, setUserSecret] = useState(false);
  const [login, setLoginScreen] = useState(true);

  useEffect(async () => {
    if (await getMyData()) {
      let token = await getValueFor("access_token");
      setUserSecret(token);
    }
  }, [login]);

  if (userSecret) return <NavigationMainContainer />;

  if (!userSecret)
    return (
      <PaperProvider>
        {login && (
          <LoginScreen
            setUserSecret={setUserSecret}
            setLoginScreen={setLoginScreen}
          />
        )}
        {!login && (
          <RegisterScreen
            setLoginScreen={setLoginScreen}
            setUserSecret={setUserSecret}
          />
        )}
      </PaperProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
