import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../config/colors";

function RightActions(props) {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
});

export default RightActions;
