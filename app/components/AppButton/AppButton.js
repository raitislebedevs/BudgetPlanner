import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../config/colors";

function AppButton({ title, onPress, color = "primary", mode = "contained" }) {
  useEffect(() => {
    console.log(mode);

    // console.log(styles[mode]);
  });
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
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginBottom: 5,
  },
  outlined: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
export default AppButton;
