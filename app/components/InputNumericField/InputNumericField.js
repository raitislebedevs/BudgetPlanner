import React from "react";
import { View } from "react-native";
import AppTextInput from "../AppTextInput/AppTextInput";

const InputNumericField = (props) => {
  const { handleOnChange, id, label, icon, currency } = props;

  const handleOnChangeNumber = (event) => {
    let value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    value = parseFloat(value).toFixed(2);
    handleOnChange({
      target: { value, id },
    });
  };
  return (
    <View style={{ width: "50%" }}>
      <AppTextInput
        icon={icon}
        placeholder={label}
        label={label}
        keyboardType="numeric"
        onChangeText={(e) => handleOnChangeNumber({ target: { value: e, id } })}
      />
    </View>
  );
};

export default InputNumericField;

// text.replace(/[^0-9]/g, '')
