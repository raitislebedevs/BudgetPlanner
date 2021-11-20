import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import budgetJournal from "../../services/budgetJournal";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import InputNumericField from "../InputNumericField/InputNumericField";
import { getMyData } from "../../utils/userData";
import ToastMessage from "../ToastMessage/ToastMessage";
import { withLocale } from "react-easy-localization";
import AppButton from "../AppButton/AppButton";

const SubmitActivity = (props) => {
  const {
    currencySymbol,
    inputValues,
    setInputValues,
    getGlobalBudgetData,
    activity,
    categoryItems,
    colorTheme,
    buttonText,
    buttonColor,
    i18n,
  } = props;
  const [showInput, setShowInput] = useState(false);

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [items, setItems] = useState([]);

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleOnChangeCategoryInputValue = (event, iconTarget) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({
      ...inputValues,
      [id]: value,
      CategoryItem: "",
      [iconTarget?.id]: iconTarget.value,
    });
  };

  const handleOnChangeCategory = (event) => {
    const value = event?.target?.value;
    var category = categoryItems.filter(function (el) {
      return el.value == value;
    })[0];

    setItems(category?.items);
    let iconTarget = { value: category?.icon, id: "icon" };
    handleOnChangeCategoryInputValue(event, iconTarget);
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
        return ToastMessage(
          "error",
          "Hold your horses",
          "Please fill all fields"
        );
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
      getGlobalBudgetData();
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
              <View style={styles.submitContainer}>
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
                      <Picker.Item label={i18n.Common.category} value="" />
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
                      <Picker.Item label={i18n.Common.categoryItem} value="" />
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
                <DatePickerComponent
                  i18n={i18n}
                  handleOnChange={handleOnChange}
                />

                <InputNumericField
                  id={"ActivityAmount"}
                  handleOnChange={handleOnChange}
                  label={i18n.Common.amount}
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
      <View style={styles.submitButton}>
        <AppButton
          title={buttonText}
          onPress={() => submitEntry()}
          color={buttonColor}
        />
      </View>
      {/* <TouchableHighlight
        style={submitButtonStyle}
        onPress={() => null}
        underlayColor={"gold"}
        onPress={() => submitEntry()}
      >
        <Text style={styles.submitText}>{buttonText}</Text>
      </TouchableHighlight> */}
    </>
  );
};

export default withLocale(SubmitActivity);

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
  submitButton: {
    marginLeft: "5%",
    marginRight: "5%",
  },
  submitContainer: {
    marginBottom: 15,
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
});
