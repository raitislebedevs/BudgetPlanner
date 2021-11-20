import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../config/colors";

function PeriodButton({
  title,
  onPress,
  color = "primary",
  mode = "contained",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles[mode], { backgroundColor: colors[color] }]}
    >
      <Text
        style={[
          styles.text,
          { color: mode == "contained" ? colors.white : colors.primary },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  contained: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    minWidth: 90,
    padding: 8,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  outlined: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 0,
    minWidth: 90,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PeriodButton;