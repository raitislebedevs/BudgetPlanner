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
import { getMyData } from "../../utils/userData";
import { colors } from "../../config/colors";
import defaultStyles from "../../config/appStyles";
import AppButton from "../AppButton/AppButton";
import AppTextInput from "../AppTextInput/AppTextInput";
import { withLocale } from "react-easy-localization";

const LeftModal = (props) => {
  const { isModalVisible, setModalVisible, i18n, changeLanguage, navigation } =
    props;
  const [user, setUser] = useState(false);
  const [currencyPicker, setCurrencyPicker] = useState(false);
  const [invitePerson, setInvitePerson] = useState("");
  const [currencyLoader, setCurrencyLoader] = useState(false);
  const [currency, setCurrency] = useState("");
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState(i18n.UserDrawer.theme.light);
  const [lang, setLang] = useState("en");
  const [isInviting, setIsInviting] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [langPicker, setLangPicker] = useState(false);
  const toggleSwitch = () => {
    if (theme === i18n.UserDrawer.theme.light)
      setTheme(i18n.UserDrawer.theme.dark);

    if (theme === i18n.UserDrawer.theme.dark)
      setTheme(i18n.UserDrawer.theme.light);

    setIsEnabled((previousState) => !previousState);
  };
  const languageSwitch = () => {
    setLangPicker(!langPicker);
    return langPicker ? changeLanguage("lv") : changeLanguage("en");
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCurrencyChange = async (event) => {
    setCurrencyLoader(true);
    try {
      let payload = {
        currency: event.value,
      };
      setCurrency(event);
      await userInfoServices.UPDATE(user?.id, payload);
      await refreshUser();
    } catch (error) {
      console.log(error);
    }
    setCurrencyPicker(false);
    setCurrencyLoader(false);
  };

  useEffect(async () => {
    let currencyData = await handleGetCurrencies();
    setItems(currencyData);
    changeLanguage("lv");
    await refreshUser();
  }, []);

  const refreshUser = async () => {
    setUser(await getMyData());
  };

  useEffect(async () => {
    if (user) setCurrency(user?.currency?.id);
  }, [user]);

  const removeInvite = async (personId) => {
    try {
      let invites = user?.invites.filter((person) => personId != person.id);
      let payload = {
        invites,
      };

      await userInfoServices.UPDATE(user?.id, payload);
      await refreshUser();
    } catch (error) {
      console.log(error);
    }
  };

  const acceptInvite = async (userId, personId) => {
    try {
      let linkedUsers = [];
      user?.linkedUsers.forEach((person) => {
        linkedUsers.push(person?.id);
      });
      linkedUsers.push(userId);
      let invites = user?.invites.filter((person) => personId != person.id);

      let payload = {
        linkedUsers,
        invites,
      };
      await userInfoServices.UPDATE(user?.id, payload);
      await refreshUser();
    } catch (error) {
      console.log(error);
    }
  };

  const sendInvatation = async () => {
    try {
      setIsInviting(true);
      if (invitePerson) {
        let invites = [];
        let filter = { email: invitePerson };
        let person = await userServices.FIND(filter);

        if (person.data.length == 0) {
          setIsInviting(false);
          return;
        }
        const userInfoData = person?.data[0].userInfo;
        userInfoData?.invites.forEach((person) => {
          invites.push(person?.id);
        });

        let data = await getMyData();

        if (invites.includes(data.id)) {
          setIsInviting(false);
          return;
        }

        invites.push(data.id);
        let payload = {
          invites,
        };
        await userInfoServices.UPDATE(userInfoData.id, payload);
        setIsInviting(false);
      }
    } catch (error) {
      console.log(error);
    }
    setIsInviting(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      // deviceWidth={800}
      // deviceHeight={1800}
      style={styles.modalStyle}
      swipeDirection="left"
      backdropColor={colors.lightGray}
      backdropOpacity={0.97}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
    >
      <ScrollView>
        <View style={styles.headingContainer}>
          <View style={styles.heading}>
            <Text style={[styles.label, defaultStyles.headingText]}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <TouchableOpacity
              style={styles.close}
              onPress={() => null}
              underlayColor={colors.primary}
              onPress={toggleModal}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heading}>
          <Text style={defaultStyles.appTextNormal}>{`${
            i18n.UserDrawer.curency
          }: ${user?.currency?.name || "USD"} - ${
            user?.currency?.symbol || "$"
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
              <Picker
                selectedValue={currency}
                style={{ height: 50, width: 150 }}
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
            )}
          </View>
        )}

        <View style={styles.heading}>
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
        </View>
        <View style={styles.heading}>
          <Text style={defaultStyles.appTextNormal}>
            {i18n.UserDrawer.theme.label}: {`${theme}`}
          </Text>
          <Switch
            trackColor={{ false: colors.primary, true: "#fff" }}
            thumbColor={isEnabled ? colors.primary : colors.lightGray}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.heading}>
          <Text style={defaultStyles.appTextNormal}>
            {i18n.UserDrawer.language.label}:{" "}
            {`${langPicker ? "English" : "Latviešu"}`}
          </Text>
          <Switch
            trackColor={{ false: colors.primary, true: "#fff" }}
            thumbColor={langPicker ? colors.primary : colors.lightGray}
            ios_backgroundColor="#3e3e3e"
            onValueChange={languageSwitch}
            value={langPicker}
          />
        </View>

        <TouchableOpacity>
          <AppButton
            onPress={() => {
              console.log("Navigating?");
              setModalVisible(false);
              navigation.navigate("Category");
            }}
            title={"Edit Categories"}
          />
        </TouchableOpacity>

        {user?.linkedUsers?.length > 0 && (
          <>
            <View style={styles.headingContainer}>
              <View style={styles.heading}>
                <Text style={[styles.label, defaultStyles.headingText]}>
                  {i18n.UserDrawer.linked}
                </Text>
              </View>
            </View>
            <View style={styles.allignment}>
              {user?.linkedUsers.map((person) => {
                return (
                  <Text
                    key={person?.id || person.email}
                    style={styles.person}
                  >{`${person.email}`}</Text>
                );
              })}
            </View>
          </>
        )}
        {user?.invites?.length > 0 && (
          <>
            <View style={styles.headingContainer}>
              <View style={styles.heading}>
                <Text style={[styles.label, defaultStyles.headingText]}>
                  {i18n.UserDrawer.userInvites}
                </Text>
              </View>
            </View>
            {user?.invites.map((person) => {
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
            placeholder={i18n.UserDrawer.inviteText}
            onChangeText={(value) => setInvitePerson(value)}
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
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: "center",
  },
  allignment: {
    marginTop: 7,
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
    borderRadius: 5,
  },

  modalStyle: {
    justifyContent: "flex-start",
    // borderColor: colors.primary,
    // borderWidth: 6,
  },
});
export default withLocale(LeftModal);
