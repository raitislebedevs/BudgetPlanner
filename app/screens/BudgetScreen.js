import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import InputNumericField from "../components/InputNumericField/InputNumericField";
import userBudget from "../services/userBudget";
import { cleanObject } from "../utils/standaloneFunctions";
import { getMyData } from "../utils/userData";
import { expenseCategory } from "../utils/categoryItems";
import BudgetChart from "../components/BudgetChart/BudgetChart";
import AskModal from "../components/AskModal/AskModal";

const BudgetScreen = (props) => {
  const { budget, isLoading, currencySymbol, getGlobalBudgetData } = props;
  const categoryItems = expenseCategory();
  const [budgetPeriods, setBudgetPeriods] = useState([
    {
      label: "Week",
      value: "Week",
    },
    {
      label: "Month",
      value: "Month",
    },
    {
      label: "Year",
      value: "Year",
    },
  ]);

  const [icon, setIcon] = useState();
  const [inputValues, setInputValues] = useState();
  const [items, setItems] = useState([{ label: "Choose Category", value: "" }]);
  const [inputBudget, setInputBudget] = useState(false);
  const [inputingBudget, setInputingBudget] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [id, setId] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };

  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleOnChangeCategory = (event) => {
    const value = event?.target?.value;

    var category = categoryItems.filter(function (el) {
      return el.value == value;
    })[0];
    setIcon(category?.icon);
    setItems(category?.items);
    handleOnChange(event);
  };

  const addBudget = async () => {
    try {
      setInputingBudget(true);
      if (!inputBudget) {
        setInputingBudget(false);
        setInputBudget(!inputBudget);
        return;
      }
      setErrorText("");
      setSuccessText("");
      if (
        !inputValues?.category ||
        !inputValues?.period ||
        !inputValues?.ActivityAmount
      ) {
        setInputingBudget(false);
        return setErrorText("Fill all fields");
      }
      let user = await getMyData();

      let payload = cleanObject({
        category: inputValues?.category,
        categoryItem: inputValues?.categoryItem || "ANY",
        period: inputValues?.period,
        activityAmount: inputValues.ActivityAmount,
        icon: icon,
        user: user.userId,
      });

      const { data } = await userBudget.CREATE(payload);
      setSuccessText("Hurray it worked!! :)");
      setInputBudget(!inputBudget);
      setInputingBudget(false);
      setErrorText("");
      setSuccessText("");
      setInputValues();
      getGlobalBudgetData();
      return data;
    } catch (error) {
      console.log(error);
    }
    setInputingBudget(false);
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <AskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        budget={true}
      />
      <BudgetChart budget={budget} isLoading={isLoading} />
      {inputBudget && (
        <>
          {!inputingBudget ? (
            <>
              <View>
                <View style={styles.pickerItemContainer}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={inputValues?.category}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => {
                        handleOnChangeCategory({
                          target: { value: itemValue, id: "category" },
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
                      selectedValue={inputValues?.categoryItem}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => {
                        handleOnChange({
                          target: { value: itemValue, id: "categoryItem" },
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
                <View style={styles.pickerItemContainer}>
                  <View style={styles.pickerPeriodContainer}>
                    <Picker
                      selectedValue={inputValues?.period}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => {
                        handleOnChange({
                          target: { value: itemValue, id: "period" },
                        });
                      }}
                    >
                      <Picker.Item label="Period" value="" />
                      {budgetPeriods.map((item) => {
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
                <InputNumericField
                  id={"ActivityAmount"}
                  handleOnChange={handleOnChange}
                  label={"Value"}
                  currency={currencySymbol}
                />
              </View>
              <View style={errorText ? styles.errorText : styles.successText}>
                <Text style={errorText ? styles.errorText : styles.successText}>
                  {errorText ? errorText : successText}
                </Text>
              </View>
            </>
          ) : (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="darkgreen"
            />
          )}
        </>
      )}
      <TouchableHighlight
        style={styles.submit}
        onPress={() => addBudget()}
        underlayColor="purple"
      >
        <Text style={styles.submitText}>Add to budget</Text>
      </TouchableHighlight>

      {!isLoading ? (
        <>
          <FinanceDetails
            financeData={budget?.budgetPlanningData || []}
            title="Budget"
            highlight={highlight}
            budget={budget}
          />
        </>
      ) : (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="darkgreen"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  dropDown: {
    backgroundColor: "lightgray",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  submit: {
    marginRight: 45,
    marginLeft: 45,
    marginTop: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "darkblue",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
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
  pickerPeriodContainer: {
    paddingTop: 10,
    alignItems: "center",
    borderBottomColor: "brown",
    borderBottomWidth: 1,
    width: "100%",
    backgroundColor: "#e7e7e7",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  pickerItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    fontWeight: "bold",
    color: "darkred",
    alignItems: "center",
  },
  successText: {
    fontWeight: "bold",
    color: "green",
    alignItems: "center",
  },
});

export default BudgetScreen;
