import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../config/colors";
import defaultStyles from "../../config/appStyles";

function AppTextInput({
  icon,
  frameColor,
  rightIcon,
  placeholder,
  ...otherProps
}) {
  return (
    <View style={[styles.container]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={colors.mediumGray}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholder={placeholder}
        style={[defaultStyles.text, styles.textInput]}
        {...otherProps}
      />
      {rightIcon && (
        <MaterialCommunityIcons
          name={rightIcon}
          size={20}
          color={colors.mediumGray}
          style={styles.icon}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    width: "100%",
    fontSize: 14,
  },
});
export default AppTextInput;
