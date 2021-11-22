import React from "react";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Animated } from "react-native";
import { colors } from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EditSwipable({ children, onPress, onPressEdit }) {
  const rightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={[styles.deleteBox, { transform: [{ scale: scale }] }]}
        >
          <MaterialCommunityIcons
            name={"delete-outline"}
            size={40}
            color={colors.white}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const leftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onPressEdit}>
        <Animated.View
          style={[styles.editBox, { transform: [{ scale: scale }] }]}
        >
          <MaterialCommunityIcons
            name={"apps"}
            size={30}
            color={colors.white}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      renderRightActions={rightActions}
      renderLeftActions={leftActions}
    >
      {children}
    </Swipeable>
  );
}

export default EditSwipable;

const styles = StyleSheet.create({
  deleteBox: {
    backgroundColor: colors.danger,
    color: colors.white,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
  },
  editBox: {
    backgroundColor: colors.tertiary,
    color: colors.white,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
  },
});
