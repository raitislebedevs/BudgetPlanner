import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const Period = (props) => {
  const { period, setPeriod } = props;
  const changeActivePeriod = (e) => {
    setPeriod(e.id);
  };
  return (
    <View style={styles.inlineButtons}>
      <Button
        onPress={(e) => changeActivePeriod({ id: "week" })}
        mode={period === "week" ? "contained" : "outlined"}
      >
        Week
      </Button>
      <Button
        onPress={(e) => changeActivePeriod({ id: "month" })}
        mode={period === "month" ? "contained" : "outlined"}
      >
        Month
      </Button>
      <Button
        onPress={(e) => changeActivePeriod({ id: "year" })}
        mode={period === "year" ? "contained" : "outlined"}
      >
        Year
      </Button>
      <Button
        onPress={(e) => changeActivePeriod({ id: "all" })}
        mode={period === "all" ? "contained" : "outlined"}
      >
        All
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inlineButtons: {
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
export default Period;
