import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../config/colors";
import AppButton from "../AppButton/AppButton";

const Period = (props) => {
  const { period, setPeriod } = props;
  const changeActivePeriod = (e) => {
    setPeriod(e.id);
  };
  return (
    <View style={styles.inlineButtons}>
      <AppButton
        title={"Week"}
        onPress={(e) => changeActivePeriod({ id: "week" })}
        mode={period === "week" ? "contained" : "outlined"}
        color={period === "week" ? "primary" : "white"}
      />
      <AppButton
        title={"Month"}
        onPress={(e) => changeActivePeriod({ id: "month" })}
        mode={period === "month" ? "contained" : "outlined"}
        color={period === "month" ? "primary" : "white"}
      />
      <AppButton
        title={"Year"}
        onPress={(e) => changeActivePeriod({ id: "year" })}
        mode={period === "year" ? "contained" : "outlined"}
        color={period === "year" ? "primary" : "white"}
      />
      <AppButton
        title={"All"}
        onPress={(e) => changeActivePeriod({ id: "all" })}
        mode={period === "all" ? "contained" : "outlined"}
        color={period === "all" ? "primary" : "white"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inlineButtons: {
    display: "flex",
    paddingTop: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
});
export default Period;
