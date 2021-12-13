import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../config/colors";

function AppButton({ title, onPress, color = "primary", mode = "contained" }) {
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
    width: "100%",
    backgroundColor: colors.primary,
    color: colors.white,
    minWidth: 90,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
  },
  outlined: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2,
    minWidth: 90,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AppButton;
