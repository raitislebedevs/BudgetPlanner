import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
// import { Button } from "react-native-paper";
import AppButton from "../components/AppButton/AppButton";
import AppTextInput from "../components/AppTextInput/AppTextInput";
import { colors } from "../config/colors";
import { ConnectionServices } from "../services";
import { save } from "../utils/expoSecure";

const image = require("../assets/Light.jpg");

const LoginScreen = (props) => {
  const { setUserSecret, navigation } = props;

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
      <ImageBackground
        source={image}
        blurRadius={5}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.view}>
          <View style={styles.formControl}>
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require("../assets/favicon.png")}
              />
              <Text style={styles.logoText}>Placifull Budget Planner</Text>
            </View>
            <View style={styles.frameMargin}>
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
                underlineColor="brown"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(e) =>
                  handleOnChange({ target: { value: e, id: "password" } })
                }
              />
              <View style={styles.frameMargin}>
                <AppButton title={"Login"} onPress={() => handleSignin()} />
                <AppButton
                  title={"Register"}
                  color={"secondary"}
                  onPress={() => navigation.navigate("Register")}
                />
              </View>
              <View style={styles.errorText}>
                <Text style={styles.errorText}>{errorText}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flex: 1,
  },
  view: {
    width: "90%",
    borderRadius: 25,
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
  logoText: {
    color: colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
  frameMargin: {
    margin: 5,
  },
  image: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
  errorText: {
    fontWeight: "bold",
    color: "#fff",
    alignItems: "center",
  },
  formControl: {
    backgroundColor: colors.lightTheme,
    borderRadius: 25,
    borderColor: colors.white,
  },
});
