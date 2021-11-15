import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Picker,
} from "react-native";
import Modal from "react-native-modal";
import { TextInput, Button, Switch } from "react-native-paper";
import { handleGetCurrencies } from "../../utils/currencyData";
import { getMyData } from "../../utils/tokenStorage";
import userInfoServices from "../../services/userInfoServices";

const LeftModal = (props) => {
  const { isModalVisible, setModalVisible } = props;
  const [user, setUser] = useState(false);
  const [currency, setCurrency] = useState("");
  const [items, setItems] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCurrencyChange = async (event) => {
    try {
      let payload = {
        currency: event.value,
      };
      const { data } = await userInfoServices.UPDATE(user?.id, payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    let currencyData = await handleGetCurrencies();
    setItems(currencyData);
    setUser(await getMyData());
  }, []);

  useEffect(async () => {
    if (user) setCurrency(user?.currency?.id);
  }, [user]);

  return (
    <Modal
      isVisible={isModalVisible}
      deviceWidth={800}
      deviceHeight={1800}
      style={styles.modalStyle}
      swipeDirection="left"
      backdropColor={"black"}
      backdropOpacity={0.9}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
    >
      <View>
        <View style={styles.mainContainer}>
          <Text style={styles.label}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <TouchableHighlight
            style={styles.submit}
            onPress={() => null}
            underlayColor="brown"
            onPress={toggleModal}
          >
            <Text style={styles.submitText}>X</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.pickerContainer}>
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
        </View>
        {user?.linkedUsers && (
          <View style={styles.marginTop}>
            <Text style={styles.subText}>Linked Users:</Text>
            {user?.linkedUsers.map((person) => {
              return <Text style={styles.person}>{`${person.email}`}</Text>;
            })}
          </View>
        )}

        {user?.invites && (
          <View style={styles.marginTop}>
            <Text style={styles.subText}>Invitations</Text>

            {user?.invites.map((person) => {
              return (
                <View style={styles.invites}>
                  <Text
                    style={styles.person}
                  >{`${person.firstName} ${person.lastName}`}</Text>
                  <Button mode="contained">Yes</Button>
                  <Button mode="contained">No</Button>
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.marginTop}>
          <TextInput label={"Link User By Email"}></TextInput>
        </View>
        <Button mode="contained">Send</Button>
      </View>
      <View style={styles.marginTop}>
        <Text style={styles.subText}>Settings</Text>
      </View>
      <View style={styles.public}>
        <Text style={styles.subText}>Public</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#fff" }}
          thumbColor={isEnabled ? "green" : "red"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "snow",
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
  },

  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  submit: {
    width: 25,
    height: 22,
    marginTop: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "black",
    textAlign: "center",
  },
  subText: {
    color: "snow",
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
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
  marginTop: {
    marginTop: 20,
  },
  public: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropDown: {
    zIndex: 999999999,
  },

  pickerContainer: {
    marginTop: 10,
    alignItems: "center",
    borderBottomColor: "brown",
    borderBottomWidth: 1,
    width: "50%",
    backgroundColor: "#e7e7e7",
    borderRadius: 5,
  },
  pickerItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default LeftModal;
