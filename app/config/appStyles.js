import { Platform, StatusBar } from "react-native";
import { colors } from "./colors";

export default {
  text: {
    color: colors.darkGray,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  appTextNormal: {
    color: colors.darkGray,
    fontSize: 17,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  appTextPrimary: {
    color: colors.primary,
    fontSize: 17,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  appTextSecondary: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 17,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  appTextTertiary: {
    color: colors.tertiary,
    fontWeight: "bold",
    fontSize: 17,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  headingText: {
    color: colors.darkGray,
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  statusbar: {
    backgroundColor: colors.primary,
    paddingTop: StatusBar.currentHeight + 10,
  },
};
