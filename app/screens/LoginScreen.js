import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { TextInput, Card, Button } from "react-native-paper";
import { ConnectionServices } from "../services";
import { save } from "../utils/expoSecure";

const LoginScreen = (props) => {
  const { setLoginScreen, setUserSecret } = props;

  const [errorText, setErrorText] = useState("");
  const [inputValues, setInputValues] = useState({});

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value.trim() });
  };

  const handleSignin = async () => {
    setErrorText("");
    try {
      let payload = {
        identifier: inputValues?.email || null,
        password: inputValues?.password || null,
      };

      const { data, error } = await ConnectionServices.LOGIN(payload);
      if (data) {
        save("access_token", data?.jwt);
        save("user_data", JSON.stringify(data?.user));
        setUserSecret(data?.jwt);
      }

      if (error) {
        setErrorText(error);
      }
    } catch (error) {
      setErrorText(error);
    }
  };

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.view}>
        <Card backgroundColor="brown">
          <Card.Title title="Placifull Budget Planner"></Card.Title>
          <Card.Content>
            <TextInput
              underlineColor="brown"
              label="Email"
              keyboardType="email-address"
              onChangeText={(e) =>
                handleOnChange({ target: { value: e, id: "email" } })
              }
            ></TextInput>
            <TextInput
              underlineColor="brown"
              label="Password"
              secureTextEntry={true}
              onChangeText={(e) =>
                handleOnChange({ target: { value: e, id: "password" } })
              }
            ></TextInput>
            <View style={styles.buttons}>
              <Button
                onPress={() => handleSignin()}
                style={styles.buttons}
                mode="contained"
              >
                Login
              </Button>
              <Button
                style={styles.buttons}
                onPress={() => setLoginScreen(false)}
              >
                Register
              </Button>
            </View>
            <View style={styles.errorText}>
              <Text style={styles.errorText}>{errorText}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flex: 1,
    backgroundColor: "#e26a00",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  view: {
    width: "90%",
  },
  buttons: {
    margin: 5,
  },
  errorText: {
    fontWeight: "bold",
    color: "darkred",
    alignItems: "center",
  },
});
