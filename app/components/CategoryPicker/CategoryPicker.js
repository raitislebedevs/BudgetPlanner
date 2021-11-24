import React from "react";
import { Text, View } from "react-native";
import AppIcon from "../AppIcon/AppIcon";

function CategoryPicker({ item, label, onPress }) {
  return (
    <View style={styles.container}>
      <AppIcon backgroundColor={item.backgroundColor} name={item?.icon} />
      <Text>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CategoryPicker;
