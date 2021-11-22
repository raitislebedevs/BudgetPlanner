import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppIcon({ icon, color, backgroundColor }) {
  return (
    <View style={styles.icon}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={color}
        style={[styles.icon, backgroundColor]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {},
});
export default AppIcon;
