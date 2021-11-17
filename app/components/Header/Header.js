import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatNumber } from "../../utils/standaloneFunctions";
import LeftModal from "../LeftModal/LeftModal";

const Header = (props) => {
  const { isLoading, currencySymbol, budget } = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(async () => {
    //await budget.initilizeData(period);
  });

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
      {!isLoading ? (
        <View>
          <Text style={styles.label}>Saved</Text>
          <Text style={styles.positiveAmount}>
            {`${
              formatNumber(budget?.savedAmount, currencySymbol) ||
              parseFloat(0).toFixed(2)
            }`}
          </Text>
        </View>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#e26a00" />
      )}

      {!isLoading ? (
        <View>
          <Text style={styles.label}>Spent</Text>
          <Text style={styles.negativeAmount}>
            {`${
              formatNumber(budget?.spentAmount, currencySymbol) ||
              parseFloat(0).toFixed(2)
            }`}
          </Text>
        </View>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#e26a00" />
      )}

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
    fontSize: 15,
    fontWeight: "bold",
  },
  negativeAmount: {
    color: "darkred",
    fontSize: 15,
    fontWeight: "bold",
  },
  label: {
    color: "#480048",
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
  leftNav: {
    color: "black",
    alignSelf: "center",
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 45,
  },
});

export default Header;
