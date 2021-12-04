import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import budgetJournal from "../../services/budgetJournal";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import InputNumericField from "../InputNumericField/InputNumericField";
import { getMyData } from "../../utils/userData";
import ToastMessage from "../ToastMessage/ToastMessage";
import { useLocale, withLocale } from "react-easy-localization";
import AppButton from "../AppButton/AppButton";
import AppPicker from "../AppPicker/AppPicker";
import { connect } from "react-redux";
import { colors } from "../../config/colors";
import { formatNumber } from "../../utils/standaloneFunctions";

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
    user,
    currency,
  } = props;
  const { i18n } = useLocale();
  const [showInput, setShowInput] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [receiptSum, setReceiptSum] = useState(0);
  const [receipt, setReceiptt] = useState([
    {
      category: "",
      categoryItem: "ANY",
      activityDate: new Date(),
      activityAmount: 0,
      activity: "",
      user: user?.userId,
    },
  ]);
  const [items, setItems] = useState([]);

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });

    if (id === "ActivityAmount") sumReceipt();
  };

  const handleOnChangeCategoryInputValue = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({
      ...inputValues,
      [id]: value,
      CategoryItem: "",
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

      let payload = {
        category: inputValues.Category,
        categoryItem: inputValues?.CategoryItem || "ANY",
        activityDate: inputValues.ActivityDate,
        activityAmount: inputValues.ActivityAmount,
        activity: activity,
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

  const addNewItem = () => {
    setReceiptt([
      ...receipt,
      {
        category: "",
        categoryItem: "ANY",
        activityDate: new Date(),
        activityAmount: 0,
        activity: "",
        user: user?.userId,
      },
    ]);
  };

  const sumReceipt = () => {
    console.log("Calls");
    let receiptAmount = 0;

    receipt.forEach((item) => {
      receiptAmount += item.activityAmount;
    });

    setReceiptSum(receiptAmount);
  };

  return (
    <>
      {showInput && (
        <>
          {!isSubmiting ? (
            <>
              {receipt.map((item) => (
                <View style={styles.submitContainer}>
                  <View style={styles.pickerItemContainer}>
                    <AppPicker
                      icon={"apps"}
                      underlineColor="brown"
                      placeholder={i18n.Common.category}
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
                      placeholder={i18n.Common.categoryItem}
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
              ))}
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
        {showInput ? (
          <>
            <View style={styles.receipt}>
              <Text>
                {i18n.Common.receipt} {formatNumber(receiptSum, currency)}
              </Text>
            </View>
            <AppButton
              title={i18n.Common.item}
              onPress={() => addNewItem()}
              color={"primary"}
            />
            <AppButton
              title={buttonText}
              onPress={() => submitEntry()}
              color={buttonColor}
            />
          </>
        ) : (
          <AppButton
            title={buttonText}
            onPress={() => submitEntry()}
            color={buttonColor}
          />
        )}
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user?.user,
  currency: state.user?.currrency,
});

export default connect(mapStateToProps)(SubmitActivity);

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
    // flexDirection: "row",
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "space-evenly",
  },
  submitContainer: {
    marginBottom: 15,
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  receipt: {
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 12,
    paddingTop: 10,
    paddingRight: "5%",
  },
});
