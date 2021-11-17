import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import budgetJournal from "../../services/budgetJournal";
import { getMyData } from "../../utils/tokenStorage";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import InputNumericField from "../InputNumericField/InputNumericField";

const SubmitActivity = (props) => {
  const {
    currencySymbol,
    inputValues,
    setInputValues,
    activity,
    categoryItems,
    colorTheme,
    buttonText,
    period,
    submitButtonStyle,
  } = props;
  const [showInput, setShowInput] = useState(false);

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [items, setItems] = useState([]);

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleOnChangeCategoryInputValue = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value, CategoryItem: "" });
  };

  const handleOnChangeCategory = (event) => {
    const value = event?.target?.value;
    var category = categoryItems.filter(function (el) {
      return el.value == value;
    })[0];

    setItems(category?.items);
    handleOnChange({ target: { value: category?.icon, id: "icon" } });
    handleOnChangeCategoryInputValue(event);
  };

  const submitEntry = async () => {
    try {
      setIsSubmiting(true);
      if (!showInput) {
        setIsSubmiting(false);
        setShowInput(!showInput);
        return;
      }
      if (
        !inputValues.Category ||
        !inputValues.CategoryItem ||
        !inputValues.ActivityDate ||
        !inputValues.ActivityAmount
      ) {
        setIsSubmiting(false);
        return setErrorText("Fill all fields");
      }
      let user = await getMyData();
      let payload = {
        category: inputValues.Category,
        categoryItem: inputValues.CategoryItem,
        activityDate: inputValues.ActivityDate,
        activityAmount: inputValues.ActivityAmount,
        activity: activity,
        icon: inputValues.icon,
        user: user?.userId,
      };

      const { data } = await budgetJournal.CREATE(payload);
      setIsSubmiting(false);
      setShowInput(!showInput);
      setInputValues({});
      refreshData(period);
      return data;
    } catch (error) {
      console.log(error);
    }
    setIsSubmiting(false);
    return null;
  };

  return (
    <>
      {showInput && (
        <>
          {!isSubmiting ? (
            <>
              <View>
                <View style={styles.pickerItemContainer}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={inputValues?.Category}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => {
                        handleOnChangeCategory({
                          target: { value: itemValue, id: "Category" },
                        });
                      }}
                    >
                      <Picker.Item label="Category" value="" />
                      {categoryItems.map((item) => {
                        return (
                          <Picker.Item
                            label={item.label}
                            value={item.value}
                            key={item.label}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={inputValues?.CategoryItem}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => {
                        handleOnChange({
                          target: { value: itemValue, id: "CategoryItem" },
                        });
                      }}
                    >
                      <Picker.Item label="Category Item" value="" />
                      {items.map((item) => {
                        return (
                          <Picker.Item
                            label={item.label}
                            value={item.value}
                            key={item.label}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
                <DatePickerComponent handleOnChange={handleOnChange} />

                <InputNumericField
                  id={"ActivityAmount"}
                  handleOnChange={handleOnChange}
                  label={"Value"}
                  currency={currencySymbol}
                />
              </View>
            </>
          ) : (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={colorTheme}
            />
          )}
        </>
      )}
      <TouchableHighlight
        style={submitButtonStyle}
        onPress={() => null}
        underlayColor={"gold"}
        onPress={() => submitEntry()}
      >
        <Text style={styles.submitText}>{buttonText}</Text>
      </TouchableHighlight>
    </>
  );
};

export default SubmitActivity;

const styles = StyleSheet.create({
  pickerContainer: {
    paddingTop: 10,
    alignItems: "center",
    borderBottomColor: "brown",
    borderBottomWidth: 1,
    width: "50%",
    backgroundColor: "#e7e7e7",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  pickerItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  submitText: {
    color: "#fff",
    textAlign: "center",
  },
  loader: {
    marginTop: 25,
  },
});
