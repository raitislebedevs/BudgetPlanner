import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { colors } from "../../config/colors";

function ListIcon({ onPress, icon, color, halfSize, ...others }) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <List.Icon
        {...others}
        icon={icon || "help"}
        onPress={onPress}
        color={colors.white}
        style={[
          styles.icon,
          { width: halfSize ? 19 : 25, height: halfSize ? 19 : 25 },
        ]}
      />
    </View>
  );
}

export default ListIcon;
const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
  },
  icon: {
    alignSelf: "center",
  },
});
