import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import defaultStyles from "../../config/appStyles";

export default DatePickerComponent = (props) => {
  const { handleOnChange, i18n } = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleConfirm = (e) => {
    if (e) {
      setDate(e);
      handleOnChange({ target: { value: e, id: "ActivityDate" } });
    }
    setOpen(false);
  };

  return (
    <View style={{ width: "50%" }}>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name={"calendar"}
            size={20}
            color={colors.mediumGray}
            style={styles.icon}
          />
          <Text style={[defaultStyles.text, styles.text]}>
            {date ? moment(date).format("DD MMM YYYY") : i18n.Common.date}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {open && (
        <DateTimePicker
          value={new Date(date)}
          mode="date"
          onChange={(event, date) => {
            handleConfirm(date);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 5,
    flex: 1,
  },
  modaItem: {
    marginTop: 42,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});
