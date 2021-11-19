import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { TextInput, Button } from "react-native-paper";
import { handleGetCurrencies } from "../../utils/currencyData";
import userInfoServices from "../../services/userInfoServices";
import userServices from "../../services/userServices";
import { getMyData } from "../../utils/userData";
import { colors } from "../../config/colors";
import defaultStyles from "../../config/appStyles";
import AppButton from "../AppButton/AppButton";
import AppTextInput from "../AppTextInput/AppTextInput";
import { ScrollView } from "react-native-gesture-handler";

const LeftModal = (props) => {
  const { isModalVisible, setModalVisible } = props;
  const [user, setUser] = useState(false);
  const [currencyPicker, setCurrencyPicker] = useState(false);
  const [invitePerson, setInvitePerson] = useState("");
  const [currencyLoader, setCurrencyLoader] = useState(false);
  const [currency, setCurrency] = useState("");
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("Light");
  const [isInviting, setIsInviting] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    if (theme === "Light") setTheme("Dark");
    if (theme === "Dark") setTheme("Light");
    setIsEnabled((previousState) => !previousState);
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
      setCurrency(event.value);
      await userInfoServices.UPDATE(user?.id, payload);
    } catch (error) {
      console.log(error);
    }
    setCurrencyPicker(false);
    setCurrencyLoader(false);
  };

  useEffect(async () => {
    let currencyData = await handleGetCurrencies();
    setItems(currencyData);
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
          <Text style={defaultStyles.appTextNormal}>{`Currency: ${
            user?.currency?.name || "USD"
          } - ${user?.currency?.symbol || "$"} ­`}</Text>
          <Text
            style={defaultStyles.appTextSecondary}
            onPress={() => setCurrencyPicker(!currencyPicker)}
          >
            Edit
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
          >{`Name: ${user.firstName} ${user.lastName} ­`}</Text>
          <Text style={defaultStyles.appTextSecondary}>Edit</Text>
        </View>
        <View style={styles.heading}>
          <Text
            style={defaultStyles.appTextNormal}
          >{`Email: ${user?.email}  ­`}</Text>
          <Text style={defaultStyles.appTextSecondary}>Edit</Text>
        </View>
        <View style={styles.heading}>
          <Text style={defaultStyles.appTextNormal}>Theme: {`${theme}`} </Text>
          <Switch
            trackColor={{ false: colors.primary, true: "#fff" }}
            thumbColor={isEnabled ? colors.primary : colors.lightGray}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {user?.linkedUsers && (
          <View style={styles.marginTop}>
            <Text style={styles.subText}></Text>
            {user?.linkedUsers.map((person) => {
              return <Text style={styles.person}>{`${person.email}`}</Text>;
            })}
          </View>
        )}
        {user?.linkedUsers?.length > 0 && (
          <>
            <View style={styles.headingContainer}>
              <View style={styles.heading}>
                <Text style={[styles.label, defaultStyles.headingText]}>
                  Linked Users
                </Text>
              </View>
            </View>
            <View style={styles.marginTop}>
              {user?.linkedUsers.map((person) => {
                return <Text style={styles.person}>{`${person.email}`}</Text>;
              })}
            </View>
          </>
        )}
        {user?.invites?.length > 0 && (
          <>
            <View style={styles.headingContainer}>
              <View style={styles.heading}>
                <Text style={[styles.label, defaultStyles.headingText]}>
                  User Invites
                </Text>
              </View>
            </View>
            {user?.invites.map((person) => {
              return (
                <View style={styles.invites}>
                  <Text
                    style={[defaultStyles.text, styles.allignment]}
                  >{`${person.firstName} ${person.lastName}`}</Text>
                  <AppButton
                    mode="contained"
                    title={"Yes"}
                    onPress={() => acceptInvite(person.userId, person.id)}
                  />
                  <AppButton
                    title={"No"}
                    onPress={() => removeInvite(person.id)}
                    mode="outlined"
                    color={"white"}
                  />
                </View>
              );
            })}
          </>
        )}
        <View style={styles.headingContainer}>
          <View style={styles.heading}>
            <Text style={[styles.label, defaultStyles.headingText]}>
              Invite User
            </Text>
          </View>
        </View>
        <View style={styles.marginTop}>
          <AppTextInput
            icon={"email"}
            placeholder={"Invite user by email address"}
            onChangeText={(value) => setInvitePerson(value)}
          ></AppTextInput>
          {!isInviting ? (
            <>
              <AppButton
                mode="contained"
                title={"Send"}
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
        {/*        


        <View style={styles.marginTop}>
          <TextInput
            label={"Link User By Email"}
            onChangeText={(value) => setInvitePerson(value)}
          ></TextInput>
        </View>
        {!isInviting ? (
          <>
            <Button
              style={styles.submitButton}
              mode="contained"
              onPress={() => sendInvatation()}
            >
              Send
            </Button>
          </>
        ) : (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="orange"
          />
        )}*/}
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
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headingContainer: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  close: {
    width: 28,
    height: 25,
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
  },
  submitButton: {
    marginTop: 10,
  },
  closeText: {
    color: colors.white,
    textAlign: "center",
  },

  invites: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  person: {
    color: "snow",
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "flex-start",
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
export default LeftModal;
