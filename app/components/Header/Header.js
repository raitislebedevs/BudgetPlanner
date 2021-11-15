import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LeftModal from "../LeftModal/LeftModal";

const Header = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.topNavigation}>
      <View>
        <Ionicons
          style={styles.leftNav}
          name={"reorder-three-outline"}
          size={42}
          onPress={toggleModal}
        />
      </View>
      <View>
        <Text style={styles.label}>Saved</Text>
        <Text style={styles.positiveAmount}>$ 17,822</Text>
      </View>
      <View>
        <Text style={styles.label}>Spent</Text>
        <Text style={styles.negativeAmount}>$ 17,822</Text>
      </View>

      <LeftModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    flex: 0.075,
    paddingTop: StatusBar.currentHeight + 5,
    paddingBottom: 5,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  positiveAmount: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
  },
  negativeAmount: {
    color: "darkred",
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  leftNav: {
    color: "black",
    alignSelf: "center",
  },
});

export default Header;
