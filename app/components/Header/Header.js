import React, { useState } from "react";
import { useLocale } from "react-easy-localization";
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
import { connect } from "react-redux";

const Header = (props) => {
  const { isLoading, currencySymbol, budget, navigation } = props;
  const { i18n } = useLocale();
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
      {!isLoading ? (
        <View>
          <Text style={styles.label}>{i18n.Header.saved}</Text>
          <Text
            style={
              budget?.spentAmount > budget?.incomeAmount
                ? styles.overspentAmount
                : styles.positiveAmount
            }
          >
            {`${
              formatNumber(
                parseFloat(budget?.savedAmount).toFixed(2),
                currencySymbol
              ) || parseFloat(0).toFixed(2)
            }`}
          </Text>
        </View>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#e26a00" />
      )}

      {!isLoading ? (
        <View style={{ marginRight: 35 }}>
          <Text style={styles.label}>{i18n.Header.spent}</Text>
          <Text style={styles.negativeAmount}>
            {`${
              formatNumber(
                parseFloat(budget?.spentAmount).toFixed(2),
                currencySymbol
              ) || parseFloat(0).toFixed(2)
            }`}
          </Text>
        </View>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#e26a00" />
      )}

      <LeftModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    flex: 0.075,
    paddingTop: StatusBar.currentHeight + 5,
    paddingBottom: 9,
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
  overspentAmount: {
    color: "red",
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  label: {
    color: "black",
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

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
});

export default connect(mapStateToProps)(Header);
