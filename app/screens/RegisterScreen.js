import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { Appbar } from "react-native-paper";
import AppButton from "../components/AppButton/AppButton";
import AppTextInput from "../components/AppTextInput/AppTextInput";
import { colors } from "../config/colors";
import { ConnectionServices } from "../services";
import { save } from "../utils/expoSecure";

const image = require("../assets/Light.jpg");

const RegisterScreen = (props) => {
  const { navigation } = props;
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
      if (
        !inputValues.email ||
        !inputValues.firstName ||
        !inputValues.lastName ||
        !inputValues.password ||
        !inputValues.confirmPassword
      ) {
        setErrorText("Please fill all of the details");
        setIsLoading(false);
        return;
      }
      if (inputValues.password != inputValues.confirmPassword) {
        setErrorText("Passwords don't match");
        setIsLoading(false);
        return;
      }

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
        // await save("user_data", JSON.stringify(data?.user));
      }
      if (error) {
        setErrorText(error);
        setIsLoading(false);
        return;
      }
      navigation.navigate("Login");
    } catch (error) {
      setErrorText(error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.content}>
      <ImageBackground
        blurRadius={7}
        source={image}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={[styles.view, styles.formControl]}>
          <Appbar style={styles.appbar}>
            <Appbar.BackAction
              color={colors.white}
              onPress={() => navigation.navigate("Login")}
            />

            <Appbar.Content title="Login" color={colors.white} />

            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require("../assets/favicon.png")}
              />
            </View>
          </Appbar>

          <AppTextInput
            icon="email"
            placeholder="First Name"
            onChangeText={(e) =>
              handleOnChange({ target: { value: e, id: "firstName" } })
            }
          />
          <AppTextInput
            icon="email"
            placeholder="Last Name"
            onChangeText={(e) =>
              handleOnChange({ target: { value: e, id: "lastName" } })
            }
          />
          <AppTextInput
            icon="email"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(e) =>
              handleOnChange({ target: { value: e, id: "email" } })
            }
          />
          <AppTextInput
            icon="key"
            placeholder="Password"
            rightIcon={"eye"}
            secureTextEntry={true}
            onChangeText={(e) =>
              handleOnChange({ target: { value: e, id: "password" } })
            }
          />
          <AppTextInput
            icon="key"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(e) =>
              handleOnChange({ target: { value: e, id: "confirmPassword" } })
            }
          />

          <AppButton
            title={isLoading ? "Registering...." : "Register"}
            onPress={handleRegister}
            disabled={isLoading}
          />

          <View style={styles.errorText}>
            <Text style={styles.errorText}>{errorText}</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  view: {
    width: "90%",
  },
  image: {
    paddingTop: "20%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
  errorText: {
    fontWeight: "bold",
    color: colors.danger,
    alignItems: "center",
  },
  formControl: {
    borderRadius: 25,
    borderColor: colors.white,
  },

  appbar: {
    borderRadius: 25,
    backgroundColor: colors.secondary,
    color: colors.white,
  },

  header: {
    flexDirection: "row",
  },
  logo: {
    width: 40,
    height: 40,
    margin: 15,
    marginLeft: 20,
  },
  image: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
});
