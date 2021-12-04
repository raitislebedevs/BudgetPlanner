import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import AppButton from "../components/AppButton/AppButton";
import AppTextInput from "../components/AppTextInput/AppTextInput";
import { colors } from "../config/colors";
import { ConnectionServices } from "../services";
import { save } from "../utils/expoSecure";
import { getUserData, getUserInfoData } from "../utils/userData";
import { connect } from "react-redux";
import * as actions from "../Redux/actions";
import userInfoServices from "../services/userInfoServices";

const image = require("../assets/Light.jpg");

const LoginScreen = (props) => {
  const {
    navigation,
    setCurrency,
    setUser,
    setUserInfo,
    setUserCategories,
    setLinkedUserInfos,
    setLinkedUsers,
    setUserInvites,
    isLoading,
    setLoader,
  } = props;

  const [errorText, setErrorText] = useState("");
  const [inputValues, setInputValues] = useState({});

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value.trim() });
  };

  const handleSignin = async () => {
    setErrorText("");
    setLoader(true);
    try {
      await getInitialUserValues();
      let payload = {
        identifier: inputValues?.email || null,
        password: inputValues?.password || null,
      };

      const { data, error } = await ConnectionServices.LOGIN(payload);
      if (data) {
        setLoader(true);
        save("access_token", data?.jwt);
        navigation.navigate("MainScreen");
      }

      if (error) {
        setErrorText(error);
      }
    } catch (error) {
      setErrorText(error);
    }
    setLoader(false);
  };

  useEffect(async () => {
    await getInitialUserValues();
  }, []);

  const getInitialUserValues = async () => {
    try {
      setLoader(true);
      let userCore = await getUserData();
      let userInfoData = await getUserInfoData(userCore?.userInfo);
      if (!userInfoData) {
        setLoader(false);
        return;
      }
      let linkedUsers = [];
      let userInvites = [];

      userInfoData?.linkedUsers.forEach((person) => {
        linkedUsers.push(person?.id);
      });

      linkedUsers.push(userCore?.id);
      userInfoData?.invites.forEach((person) => {
        userInvites.push(person.id);
      });

      let filter = { userId_in: linkedUsers };
      const { data } = await userInfoServices.FIND(filter);
      data.forEach((element) => {
        delete element?.userCategories;
        delete element?.linkedUsers;
        delete element?.currency;
      });

      setLinkedUserInfos(data);
      setCurrency(userInfoData?.currency?.symbol);
      setUser(userCore);
      setLinkedUsers(linkedUsers);

      setUserInfo(userInfoData);
      setUserInvites(userInfoData?.invites);
      setUserCategories(userInfoData?.userCategories);
      setLoader(false);
      if (userCore) {
        setLoader(true);
        navigation.navigate("MainScreen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.content}>
        <ImageBackground
          source={image}
          blurRadius={5}
          resizeMode="cover"
          style={styles.image}
        >
          {!isLoading ? (
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
          ) : (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={colors.primary}
            />
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state?.loader.isLoading,
  localCurrency: state.user?.currrency,
  userData: state.user?.user,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (value) => dispatch(actions.setCurrency(value)),
  setUser: (value) => dispatch(actions.setUser(value)),
  setUserInfo: (value) => dispatch(actions.setUserInfo(value)),
  setUserCategories: (value) => dispatch(actions.setUserCategories(value)),
  setLinkedUsers: (value) => dispatch(actions.setLinkedUsers(value)),
  setUserInvites: (value) => dispatch(actions.setUserInvites(value)),
  setLoader: (value) => dispatch(actions.setLoader(value)),
  setLinkedUserInfos: (value) => dispatch(actions.setLinkedUserInfos(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
    color: colors.danger,
    alignItems: "center",
  },
  formControl: {
    backgroundColor: colors.lightTheme,
    borderRadius: 25,
    borderColor: colors.white,
  },
  loader: {
    marginTop: "33%",
  },
});
