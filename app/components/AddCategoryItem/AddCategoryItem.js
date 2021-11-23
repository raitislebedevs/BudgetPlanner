import React from "react";
import { StyleSheet, View } from "react-native";
import AppTextInput from "../AppTextInput/AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

function AddCategoryItem({ onPressSuccess, onPressCancel, handleOnChange }) {
  return (
    <View>
      <AppTextInput
        icon={"pen"}
        placeholder={"Category name"}
        onChangeText={handleOnChange}
      />
      <View style={styles.choiseContainer}>
        <TouchableOpacity style={styles.choice} onPress={onPressSuccess}>
          <MaterialCommunityIcons
            name={"check"}
            size={30}
            color={colors.success}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.choice} onPress={onPressCancel}>
          <MaterialCommunityIcons
            name={"cancel"}
            size={30}
            color={colors.danger}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddCategoryItem;
const styles = StyleSheet.create({
  choiseContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  choice: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 50,
  },
});
