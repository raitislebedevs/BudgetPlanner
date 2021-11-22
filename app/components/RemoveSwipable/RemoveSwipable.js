import React from "react";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Animated } from "react-native";
import { colors } from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function RemoveSwipable({ children, onPress }) {
  const rightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={[styles.delteBox, { transform: [{ scale: scale }] }]}
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
  return <Swipeable renderRightActions={rightActions}>{children}</Swipeable>;
}

export default RemoveSwipable;

const styles = StyleSheet.create({
  delteBox: {
    backgroundColor: colors.danger,
    color: colors.white,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
  },
});
