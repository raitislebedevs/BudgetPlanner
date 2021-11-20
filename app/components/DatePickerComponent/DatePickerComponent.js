import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default DatePickerComponent = (props) => {
  const { handleOnChange, i18n } = props;
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const handleFocus = () => {
    setOpen(true);
  };

  const hideDatePicker = () => {
    setOpen(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
    handleOnChange({ target: { value: date, id: "ActivityDate" } });
  };

  return (
    <>
      <TextInput
        underlineColor="brown"
        label={i18n.Common.date}
        value={date && date.toDateString()}
        onFocus={() => handleFocus()}
        onChangeText={() => handleFocus()}
      ></TextInput>
      <DateTimePickerModal
        isVisible={open}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </>
  );
};
