import React from "react";
import { withLocale } from "react-easy-localization";
import { StyleSheet, View } from "react-native";
import { colors } from "../../config/colors";
import PeriodButton from "../PeriodButton/PeriodButton";

const Period = (props) => {
  const { period, setPeriod, i18n } = props;
  const changeActivePeriod = (e) => {
    setPeriod(e.id);
  };
  return (
    <View style={styles.inlineButtons}>
      <PeriodButton
        title={i18n.Period.week}
        onPress={(e) => changeActivePeriod({ id: "week" })}
        mode={period === "week" ? "contained" : "outlined"}
        color={period === "week" ? "primary" : "white"}
      />
      <PeriodButton
        title={i18n.Period.month}
        onPress={(e) => changeActivePeriod({ id: "month" })}
        mode={period === "month" ? "contained" : "outlined"}
        color={period === "month" ? "primary" : "white"}
      />
      <PeriodButton
        title={i18n.Period.year}
        onPress={(e) => changeActivePeriod({ id: "year" })}
        mode={period === "year" ? "contained" : "outlined"}
        color={period === "year" ? "primary" : "white"}
      />
      <PeriodButton
        title={i18n.Period.all}
        onPress={(e) => changeActivePeriod({ id: "all" })}
        mode={period === "all" ? "contained" : "outlined"}
        color={period === "all" ? "primary" : "white"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inlineButtons: {
    display: "flex",
    paddingTop: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
});
export default withLocale(Period);
