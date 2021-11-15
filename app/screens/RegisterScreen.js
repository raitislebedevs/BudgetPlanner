import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput, Button, Appbar } from "react-native-paper";
import { ConnectionServices } from "../services";
import { getValueFor, save } from "../utils/tokenStorage";

const RegisterScreen = (props) => {
  const { setLoginScreen } = props;
  const [inputValues, setInputValues] = useState({});
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value.trim() });
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      setErrorText("");
      let payload = {
        username: inputValues.email,
        email: inputValues.email,
        password: inputValues.password,
        confirmed: true,
        userInfo: {
          firstName: inputValues.firstName,
          lastName: inputValues.lastName,
        },
      };

      const { data, error } = await ConnectionServices.REGISTER(payload);

      if (data) {
        await save("access_token", data?.jwt);
        await save("user_data", JSON.stringify(data?.user));
        setLoginScreen(true);
      }
      if (error) {
        setErrorText(error);
      }
    } catch (error) {
      setErrorText(error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.content}>
      <ScrollView style={styles.view}>
        <Appbar>
          <Appbar.BackAction onPress={() => setLoginScreen(true)} />
          <Appbar.Content title="Register" />
        </Appbar>
        <TextInput
          underlineColor="brown"
          label="First Name"
          keyboardType="email-address"
          onChangeText={(e) =>
            handleOnChange({ target: { value: e, id: "firstName" } })
          }
        ></TextInput>
        <TextInput
          underlineColor="brown"
          label="Last Name"
          keyboardType="email-address"
          onChangeText={(e) =>
            handleOnChange({ target: { value: e, id: "lastName" } })
          }
        ></TextInput>
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
          right={<TextInput.Icon name="eye-off-outline" />}
          onChangeText={(e) =>
            handleOnChange({ target: { value: e, id: "password" } })
          }
        ></TextInput>
        <TextInput
          underlineColor="brown"
          label="Confirm Password"
          secureTextEntry={true}
          right={<TextInput.Icon name="eye-off-outline" />}
          onChangeText={(e) =>
            handleOnChange({ target: { value: e, id: "confirmPassword" } })
          }
        ></TextInput>

        <Button
          mode="contained"
          style={styles.buttons}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Registering...." : "Register"}
        </Button>
        <View style={styles.errorText}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    color: "#fff",
    margin: 5,
  },
  errorText: {
    fontWeight: "bold",
    color: "darkred",
    alignItems: "center",
  },
});
