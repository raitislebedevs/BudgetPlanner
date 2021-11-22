import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import budgetJournal from "../../services/budgetJournal";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import InputNumericField from "../InputNumericField/InputNumericField";
import { getMyData } from "../../utils/userData";
import ToastMessage from "../ToastMessage/ToastMessage";
import { withLocale } from "react-easy-localization";
import AppButton from "../AppButton/AppButton";
import AppPicker from "../AppPicker/AppPicker";

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
  const [categoryIcon, setCategoryIcon] = useState("apps");

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [items, setItems] = useState([]);

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });

    console.log(inputValues);
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
                  <AppPicker
                    icon={categoryIcon}
                    underlineColor="brown"
                    placeholder="Category"
                    items={categoryItems}
                    onSelectItem={(itemValue) => {
                      handleOnChangeCategory({
                        target: { value: itemValue, id: "Category" },
                      });
                    }}
                    selectedItem={inputValues?.Category}
                  />
                  <AppPicker
                    icon="apps"
                    underlineColor="brown"
                    placeholder="Category Item"
                    items={items}
                    onSelectItem={(value) => {
                      handleOnChange({
                        target: { value, id: "CategoryItem" },
                      });
                    }}
                    selectedItem={inputValues?.CategoryItem}
                  />
                </View>
                <View style={styles.valueDetails}>
                  <DatePickerComponent
                    i18n={i18n}
                    handleOnChange={handleOnChange}
                  />

                  <InputNumericField
                    icon={"cash"}
                    id={"ActivityAmount"}
                    handleOnChange={handleOnChange}
                    label={i18n.Common.amount}
                    currency={currencySymbol}
                  />
                </View>
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
    </>
  );
};

export default withLocale(SubmitActivity);

const styles = StyleSheet.create({
  pickerItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  valueDetails: {
    flexDirection: "row",
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
