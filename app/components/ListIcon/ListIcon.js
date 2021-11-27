import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { colors } from "../../config/colors";

function ListIcon({ onPress, icon, color, subIcon, halfSize, ...others }) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <List.Icon
        icon={icon || "help"}
        onPress={onPress}
        color={colors.white}
        style={[
          styles.icon,
          { width: halfSize ? 20 : 25, height: halfSize ? 20 : 25 },
        ]}
        {...others}
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
    flex: 1,
    alignSelf: "center",
  },
});
