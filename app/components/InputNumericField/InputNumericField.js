import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { formatNumber } from "../../utils/standaloneFunctions";

const InputNumericField = (props) => {
  const { handleOnChange, id, label } = props;
  const [numericValue, setNumericValue] = useState("");

  const handleOnChangeNumber = (event) => {
    let value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    let decimalNumber = [];
    let parts = value.split(".");
    parts[0] = parts[0].replace(/[^0-9]/g, "");
    decimalNumber.push(parts[0]);
    if (parts.length > 1) {
      parts[1] = parts[1]
        ? parts[1].replace(/[^0-9]/g, "").substring(0, 2)
        : "00";
      decimalNumber.push(parts[1]);
      value = decimalNumber.join(".");
      value = parseFloat(value).toFixed(2);
    }

    if (parts.length == 1) {
      value = decimalNumber.join(".");
      value = parseFloat(value);
    }

    if (isNaN(value)) {
      value = 0;
    }

    setNumericValue(formatNumber(value));

    handleOnChange({
      target: { value, id },
    });
  };
  return (
    <TextInput
      underlineColor="brown"
      label={label}
      value={numericValue}
      keyboardType="numeric"
      onChangeText={(e) => handleOnChangeNumber({ target: { value: e, id } })}
    ></TextInput>
  );
};

export default InputNumericField;

// text.replace(/[^0-9]/g, '')
