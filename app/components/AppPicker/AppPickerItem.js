import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppPickerItem({ label, icon, color, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.icon, { backgroundColor: color }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={42}
              color={colors.white}
              style={styles.icon}
            />
          )}
        </View>
        {label && <Text style={styles.text}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
  },
  text: {
    fontWeight: "600",
    alignSelf: "center",
    maxWidth: 100,
  },
});

export default AppPickerItem;
