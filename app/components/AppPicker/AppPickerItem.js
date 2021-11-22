import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppPickerItem({ label, icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={42}
              color={colors.white}
              style={styles.icon}
            />
          )}
        </View>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 22,
  },
  icon: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
  },
  text: {
    padding: 20,
  },
});

export default AppPickerItem;
