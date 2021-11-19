import React from "react";
import { TextInput } from "react-native-paper";

const InputNumericField = (props) => {
  const { handleOnChange, id, label, currency } = props;

  const handleOnChangeNumber = (event) => {
    let value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    value = parseFloat(value).toFixed(2);
    handleOnChange({
      target: { value, id },
    });
  };
  return (
    <TextInput
      underlineColor="brown"
      label={label}
      // value={numericValue}
      keyboardType="numeric"
      onChangeText={(e) => handleOnChangeNumber({ target: { value: e, id } })}
    ></TextInput>
  );
};

export default InputNumericField;

// text.replace(/[^0-9]/g, '')
