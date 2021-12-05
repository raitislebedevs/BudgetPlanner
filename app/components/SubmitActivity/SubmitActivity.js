import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import budgetJournal from "../../services/budgetJournal";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import InputNumericField from "../InputNumericField/InputNumericField";
import ToastMessage from "../ToastMessage/ToastMessage";
import { useLocale } from "react-easy-localization";
import AppButton from "../AppButton/AppButton";
import AppPicker from "../AppPicker/AppPicker";
import { connect } from "react-redux";
import { colors } from "../../config/colors";
import { formatNumber, randomString } from "../../utils/standaloneFunctions";
import RemoveSwipable from "../RemoveSwipable/RemoveSwipable";

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

  const [items, setItems] = useState([]);

  useEffect(() => {
    initilizeInputValues();
  }, []);

  const initilizeInputValues = () => {
    setInputValues([
      {
        id: randomString(),
        Category: "",
        CategoryItem: "",
        ActivityDate: new Date(),
        ActivityAmount: 0,
        activity: activity,
        user: user?.id,
      },
    ]);
    setReceiptSum(0);
  };

  const handleOnChange = (event) => {
    let entry = getSelectedValue(event?.id);
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    entry[id] = value;

    const index = inputValues.findIndex((entry) => entry.id == event?.id);
    setInputValues([...resultArray(inputValues, entry, index)]);
    if (id === "ActivityAmount") sumReceipt();
  };

  const handleOnChangeCategoryInputValue = (event) => {
    let entry = getSelectedValue(event?.id);

    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    entry[id] = value;
    entry.CategoryItem = "";
    const index = inputValues.findIndex((entry) => entry.id == event?.id);
    setInputValues([...resultArray(inputValues, entry, index)]);
  };

  const handleOnChangeCategory = (event) => {
    const value = event?.target?.value;
    var category = categoryItems.filter(function (el) {
      return el.value == value;
    })[0];

    setItems(category?.items);
    handleOnChangeCategoryInputValue(event);
  };

  const submitEntry = async () => {
    try {
      let newInputValues = [...inputValues];
      let errorCount = 0;

      if (!showInput) {
        setShowInput(!showInput);
        return;
      }
      newInputValues.forEach((item) => {
        if (!item.Category || !item.ActivityDate || !item.ActivityAmount) {
          item.error = i18n.Error.itemFields;
          errorCount++;
          return;
        }
        item.error = "";
      });
      setInputValues([...newInputValues]);
      if (errorCount) {
        return;
      }

      if (!errorCount) {
        await inputValues.forEach((item) => {
          submitSingleEntry(item);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitSingleEntry = async (singleEntry) => {
    try {
      setIsSubmiting(true);

      if (
        !singleEntry.Category ||
        !singleEntry.ActivityDate ||
        !singleEntry.ActivityAmount
      ) {
        setIsSubmiting(false);
        return;
      }

      let payload = {
        category: singleEntry.Category,
        categoryItem: singleEntry?.CategoryItem || "ANY",
        activityDate: singleEntry.ActivityDate,
        activityAmount: singleEntry.ActivityAmount,
        activity: activity,
        user: user?.id,
      };
      const { data } = await budgetJournal.CREATE(payload);
      setIsSubmiting(false);
      setShowInput(!showInput);
      initilizeInputValues();
      getGlobalBudgetData();
      return data;
    } catch (error) {
      console.log(error);
    }
    setIsSubmiting(false);
    return null;
  };

  const addNewItem = () => {
    if (inputValues.length > 100) return;
    setInputValues([
      ...inputValues,
      {
        id: randomString(),
        Category: "",
        CategoryItem: "",
        ActivityDate: new Date(),
        ActivityAmount: 0,
        activity: activity,
        user: user?.id,
      },
    ]);
  };

  const sumReceipt = () => {
    let receiptAmount = 0;
    inputValues?.forEach((item) => {
      if (isNaN(parseFloat(item?.ActivityAmount))) return;
      receiptAmount += parseFloat(item?.ActivityAmount);
    });
    setReceiptSum(receiptAmount);
  };

  const removeItem = (id) => {
    let newReceipt = inputValues.filter((item) => item.id != id);
    setInputValues(newReceipt);
  };

  const getSelectedValue = (id) => {
    if (!id) return;
    let entry = {};
    const filter = inputValues.filter((entry) => entry.id == id);
    if (typeof filter[0] === "undefined") {
      entry.id = id;
    } else {
      entry = filter[0];
    }
    return entry;
  };

  const resultArray = (array, element, index) => {
    let resultArray = [
      ...array.slice(0, index),
      element,
      ...array.slice(index + 1),
    ];
    return resultArray;
  };

  return (
    <>
      {showInput && (
        <>
          {!isSubmiting ? (
            <>
              {inputValues.map((item) => (
                <RemoveSwipable
                  key={item.id}
                  onPress={() => removeItem(item.id)}
                >
                  <View style={styles.submitContainer}>
                    <View style={styles.pickerItemContainer}>
                      <AppPicker
                        icon={"apps"}
                        underlineColor="brown"
                        placeholder={i18n.Common.category}
                        items={categoryItems}
                        onSelectItem={(itemValue) => {
                          handleOnChangeCategory({
                            id: item.id,
                            target: { value: itemValue, id: "Category" },
                          });
                        }}
                        selectedItem={getSelectedValue(item?.id)?.Category}
                      />
                      <AppPicker
                        icon="apps"
                        underlineColor="brown"
                        placeholder={i18n.Common.categoryItem}
                        items={items}
                        onSelectItem={(value) => {
                          handleOnChange({
                            id: item.id,
                            target: { value, id: "CategoryItem" },
                          });
                        }}
                        selectedItem={getSelectedValue(item?.id)?.CategoryItem}
                      />
                    </View>
                    <View style={styles.valueDetails}>
                      <DatePickerComponent
                        i18n={i18n}
                        handleOnChange={(value) => {
                          handleOnChange({
                            id: item.id,
                            ...value,
                          });
                        }}
                      />
                      <InputNumericField
                        icon={"cash"}
                        id={"ActivityAmount"}
                        handleOnChange={(value) => {
                          handleOnChange({
                            id: item.id,
                            ...value,
                          });
                        }}
                        label={i18n.Common.amount}
                        currency={currencySymbol}
                      />
                    </View>
                  </View>

                  <View style={styles.error}>
                    <Text style={styles.error}>
                      {item?.error && item.error}
                    </Text>
                  </View>
                </RemoveSwipable>
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
                {i18n.Common.receipt}{" "}
                {formatNumber(parseFloat(receiptSum).toFixed(2), currency)}
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
  error: {
    marginBottom: 3,
    color: colors.danger,
    fontSize: 12,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
