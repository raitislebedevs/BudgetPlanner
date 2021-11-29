import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { handleGetCurrencies } from "../../utils/currencyData";
import userInfoServices from "../../services/userInfoServices";
import userServices from "../../services/userServices";
import { getMyData, getUserData, getUserInfoData } from "../../utils/userData";
import { colors } from "../../config/colors";
import defaultStyles from "../../config/appStyles";
import AppButton from "../AppButton/AppButton";
import AppTextInput from "../AppTextInput/AppTextInput";
import { useLocale } from "react-easy-localization";
import { connect } from "react-redux";
import * as actions from "../../Redux/actions";
import IOSPicker from "../IOSPicker/IOSPicker";

const LeftModal = (props) => {
  const {
    isModalVisible,
    setModalVisible,
    navigation,
    userTheme,
    setUserInfo,
    setReduxCurrency,
    linkedUserInfos,
    reduxUser,
    user,
  } = props;
  const { changeLanguage, i18n } = useLocale();
  const [errorText, setErrorText] = useState("");
  const [currencyPicker, setCurrencyPicker] = useState(false);
  const [invitePerson, setInvitePerson] = useState("");
  const [currencyLoader, setCurrencyLoader] = useState(false);
  const [currency, setCurrency] = useState("");
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState(userTheme);
  const [isInviting, setIsInviting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [langPicker, setLangPicker] = useState(false);

  const languageSwitch = async () => {
    try {
      let isEnglish = !langPicker;
      setLangPicker(isEnglish);

      // let payload = {
      //   language: isEnglish ? "lv" : "en",
      // };
      // await userInfoServices.UPDATE(reduxUser?.id, payload);
      // await refreshUser();
    } catch (error) {
      console.log(error);
    }

    return langPicker ? changeLanguage("lv") : changeLanguage("en");
  };

  const handleCurrencyChange = async (event) => {
    setCurrencyLoader(true);
    try {
      let payload = {
        currency: event.value,
      };

      setCurrency(event);

      await userInfoServices.UPDATE(reduxUser?.id, payload);
      await refreshUser();
      if (items.filter((item) => item.value == event.value).length != 0) {
        setReduxCurrency(
          items.filter((item) => item.value == event.value)[0]?.symbol
        );
      }
    } catch (error) {
      console.log(error);
    }

    setCurrencyLoader(false);
    setCurrencyPicker(false);
  };

  useEffect(async () => {
    try {
      // changeLanguage(reduxUser?.language);
      let currencyData = await handleGetCurrencies();
      setItems(currencyData);
      changeLanguage("lv");
      await refreshUser();
    } catch (error) {
      console.log(console.log(error));
    }
  }, []);

  const refreshUser = async () => {
    let userCore = await getUserData();
    setUserInfo(await getUserInfoData(userCore?.userInfo));
  };

  const removeInvite = async (personId) => {
    setIsConfirming(true);
    try {
      let invites = reduxUser?.invites.filter(
        (person) => personId != person.id
      );
      let payload = {
        invites,
      };

      await userInfoServices.UPDATE(reduxUser?.id, payload);
      await refreshUser();
    } catch (error) {
      console.log(error);
    }
    setIsConfirming(false);
  };

  const acceptInvite = async (userId, personId) => {
    setIsConfirming(true);
    try {
      let linkedUsers = [];
      reduxUser?.linkedUsers.forEach((person) => {
        linkedUsers.push(person?.id);
      });
      linkedUsers.push(userId);
      let invites = reduxUser?.invites.filter(
        (person) => personId != person.id
      );

      let payload = {
        linkedUsers,
        invites,
      };
      await userInfoServices.UPDATE(reduxUser?.id, payload);
      await refreshUser();
    } catch (error) {
      console.log(error);
    }
    setIsConfirming(false);
  };

  const sendInvatation = async () => {
    if (invitePerson == user.email) return;
    try {
      setErrorText("");
      setIsInviting(true);
      if (!invitePerson) {
        setIsInviting(false);
        setErrorText(i18n.UserDrawer.error.noEmail);
        return;
      }

      let invites = [];
      let filter = { email: invitePerson };
      //Finding the person whom I am inviting
      let person = await userServices.FIND(filter);

      if (person.data.length == 0) {
        setIsInviting(false);
        setErrorText(i18n.UserDrawer.error.noUser);
        return;
      }

      const userInfoData = person?.data[0].userInfo;

      userInfoData?.invites.forEach((person) => {
        invites.push(person);
      });

      let data = await getMyData();

      if (invites.includes(data.id)) {
        setIsInviting(false);
        setErrorText(i18n.UserDrawer.error.userInvited);
        return;
      }

      invites.push(data.id);
      let payload = {
        invites,
      };

      await userInfoServices.UPDATE(userInfoData.id, payload);
      setIsInviting(false);
    } catch (error) {
      console.log(error);
    }
    setIsInviting(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalStyle}
      swipeDirection="left"
      backdropColor={colors.lightGray}
      backdropOpacity={0.97}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
    >
      <ScrollView style={styles.modalContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.heading}>
            <Text style={[styles.label, defaultStyles.headingText]}>
              {`${reduxUser.firstName} ${reduxUser.lastName}`}
            </Text>
            <TouchableOpacity
              style={styles.close}
              onPress={() => null}
              underlayColor={colors.primary}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heading}>
          <Text style={defaultStyles.appTextNormal}>{`${
            i18n.UserDrawer.curency
          }: ${reduxUser?.currency?.name || "USD"} - ${
            reduxUser?.currency?.symbol || "$"
          } ­`}</Text>
          <Text
            style={defaultStyles.appTextTertiary}
            onPress={() => setCurrencyPicker(!currencyPicker)}
          >
            {i18n.UserDrawer.edit}
          </Text>
        </View>
        {currencyPicker && (
          <View style={styles.pickerContainer}>
            {currencyLoader ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={colors.secondary}
              />
            ) : (
              <>
                {Platform.OS === "android" ? (
                  <Picker
                    selectedValue={currency}
                    style={{
                      height: 50,
                      width: 150,
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      handleCurrencyChange({
                        value: itemValue,
                        id: "currency",
                      });
                    }}
                  >
                    {items.map((item) => {
                      return (
                        <Picker.Item
                          label={item.label}
                          value={item.value}
                          key={item.label}
                        />
                      );
                    })}
                  </Picker>
                ) : (
                  <IOSPicker
                    icon={"cash"}
                    style={{ height: 100, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => {
                      handleCurrencyChange({
                        value: itemValue,
                        id: "currency",
                      });
                    }}
                    i18n={i18n}
                    items={items}
                    placeholder={
                      items.filter((item) => item.value == currency)[0]
                        ?.label || i18n.BudgetScreen.period.label
                    }
                  />
                )}
              </>
            )}
          </View>
        )}

        {/* <View style={styles.heading}>
          <Text
            style={defaultStyles.appTextNormal}
          >{`${i18n.UserDrawer.name}: ${user.firstName} ${user.lastName} ­`}</Text>
          <Text style={defaultStyles.appTextTertiary}>
            {i18n.UserDrawer.edit}
          </Text>
        </View>
        <View style={styles.heading}>
          <Text
            style={defaultStyles.appTextNormal}
          >{`${i18n.UserDrawer.email}: ${user?.email}  ­`}</Text>
          <Text style={defaultStyles.appTextTertiary}>
            {i18n.UserDrawer.edit}
          </Text>
        </View> */}

        <View style={styles.heading}>
          <Text style={defaultStyles.appTextNormal}>
            {i18n.UserDrawer.income}
          </Text>
          <Text
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("Income Category");
            }}
            style={defaultStyles.appTextTertiary}
          >
            {i18n.UserDrawer.edit}
          </Text>
        </View>

        <View style={styles.heading}>
          <Text style={defaultStyles.appTextNormal}>
            {i18n.UserDrawer.expense}
          </Text>
          <Text
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("Expense Category");
            }}
            style={defaultStyles.appTextTertiary}
          >
            {i18n.UserDrawer.edit}
          </Text>
        </View>

        {/* <View style={styles.toggle}>
          <Text style={[defaultStyles.appTextNormal, styles.toogleText]}>
            {i18n.UserDrawer.theme.label}: {`${i18n.UserDrawer.theme[theme]}`}
          </Text>
          <Switch
            trackColor={{ false: colors.primary, true: "#fff" }}
            thumbColor={isEnabled ? colors.primary : colors.lightGray}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View> */}

        <View style={styles.toggle}>
          <Text style={[defaultStyles.appTextNormal, styles.toogleText]}>
            {i18n.UserDrawer.language.label}:
            {`${langPicker ? " English" : " Latviešu"}`}
          </Text>
          <Switch
            trackColor={{ false: colors.primary, true: "#fff" }}
            thumbColor={langPicker ? colors.primary : colors.lightGray}
            ios_backgroundColor="#3e3e3e"
            onValueChange={languageSwitch}
            value={langPicker}
          />
        </View>

        {linkedUserInfos?.length > 0 && (
          <>
            <View style={styles.headingContainer}>
              <View style={styles.heading}>
                <Text style={[styles.label, defaultStyles.headingText]}>
                  {i18n.UserDrawer.linked}
                </Text>
              </View>
            </View>
            {!isConfirming ? (
              <View style={styles.allignment}>
                {linkedUserInfos.map((person) => {
                  return (
                    <Text key={person?.id} style={styles.person}>
                      {`${person.firstName} ${person.lastName}`}
                    </Text>
                  );
                })}
              </View>
            ) : (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="orange"
              />
            )}
          </>
        )}
        {reduxUser?.invites?.length > 0 && (
          <>
            <View style={styles.headingContainer}>
              <View style={styles.heading}>
                <Text style={[styles.label, defaultStyles.headingText]}>
                  {i18n.UserDrawer.userInvites}
                </Text>
              </View>
            </View>

            {!isConfirming ? (
              <>
                {reduxUser?.invites.map((person) => {
                  return (
                    <View key={person?.id} style={styles.invites}>
                      <Text
                        style={[defaultStyles.text, styles.allignment]}
                      >{`${person.firstName} ${person.lastName}`}</Text>
                      <AppButton
                        mode="contained"
                        title={i18n.UserDrawer.yes}
                        onPress={() => acceptInvite(person.userId, person.id)}
                      />
                      <AppButton
                        title={i18n.UserDrawer.no}
                        onPress={() => removeInvite(person.id)}
                        mode="outlined"
                        color={"white"}
                      />
                    </View>
                  );
                })}
              </>
            ) : (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="orange"
              />
            )}
          </>
        )}
        <View style={[styles.headingContainer, styles.allignment]}>
          <View style={styles.heading}>
            <Text style={[styles.label, defaultStyles.headingText]}>
              {i18n.UserDrawer.invite}
            </Text>
          </View>
        </View>
        <View style={styles.allignment}>
          <AppTextInput
            icon={"email"}
            keyboardType="email-address"
            placeholder={i18n.UserDrawer?.inviteText}
            onChangeText={(value) => setInvitePerson(value.toLowerCase())}
          ></AppTextInput>
          {!isInviting ? (
            <>
              <AppButton
                mode="contained"
                title={i18n.UserDrawer.send}
                onPress={() => sendInvatation()}
              />
            </>
          ) : (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="orange"
            />
          )}
        </View>

        <Text style={defaultStyles.errorText}>{errorText && errorText}</Text>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: "center",
  },
  allignment: {
    marginTop: 9,
  },

  heading: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headingContainer: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  close: {
    width: 48,
    height: 30,
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
  },
  closeText: {
    marginTop: 5,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center",
  },
  submitButton: {
    marginTop: 10,
  },
  invites: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  person: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: colors.mediumGray,
    fontSize: 17,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },

  public: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  pickerContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
  },

  modalStyle: {
    justifyContent: "flex-start",
  },
  modalContainer: {
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toogleText: {
    marginTop: 10,
  },
});

const mapStateToProps = (state) => ({
  userTheme: state.theme.userTheme,
  reduxCurrency: state.user.currrency,
  reduxUser: state.user.userInfo,
  user: state.user.user,
  linkedUserInfos: state?.user?.linkedUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setUserTheme: (value) => dispatch(actions.setUserTheme(value)),
  setReduxCurrency: (value) => dispatch(actions.setCurrency(value)),
  setUserInfo: (value) => dispatch(actions.setUserInfo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftModal);
