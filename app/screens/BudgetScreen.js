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
import { Dimensions } from "react-native";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { budgetData } from "../demoData/summarydata";
import { getChartPeriod } from "../utils/chartLabels";
import { ProgressChart } from "react-native-chart-kit";
import { getLinkedUsers, getMyData } from "../utils/tokenStorage";
import InputNumericField from "../components/InputNumericField/InputNumericField";
import userBudget from "../services/userBudget";
import { cleanObject } from "../utils/standaloneFunctions";

const BudgetScreen = (props) => {
  const { period } = props;
  const [categoryItems, setCategoryItems] = useState([
    {
      label: "Housing",
      value: "Housing",
      icon: "home",
      items: [
        { label: "Rent", value: "Rent" },
        { label: "Mortgage", value: "Mortgage" },
        { label: "Mobile", value: "Mobile" },
        { label: "Internet", value: "Internet" },
        { label: "Furnitures", value: "Furnitures" },
        { label: "Household goods", value: "Household goods" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Food",
      value: "Food",
      icon: "food",
      items: [
        { label: "Grain Crops", value: "Grain Crops" },
        { label: "Vegitables", value: "Vegitables" },
        { label: "Milk Products", value: "Milk Products" },
        { label: "Confectionery", value: "Confectionery" },
        { label: "Greens & Salad", value: "Greens & Salad" },
        { label: "Tea & Cofee", value: "Tea & Cofee" },
        { label: "Fish & Meet & Eggs", value: "Fish & Meet & Eggs" },
        { label: "Additives", value: "Additives" },
        { label: "Sweets & Snaks", value: "Sweets & Snaks" },
        { label: "Restaurants & Cantains", value: "Restaurants & Cantains" },
        { label: "Drinks", value: "Drinks" },
        { label: "Junk Food", value: "Junk Food" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Transport",
      value: "Transport",
      icon: "car",
      items: [
        { label: "Bus & Taxi", value: "Bus & Taxi" },
        { label: "Gas & Electricity", value: "Gas & Electricity" },
        { label: "Insuarence", value: "Insuarence" },
        { label: "Tax", value: "Tax" },
        { label: "Maintainances & Repairs", value: "Maintainances & Repairs" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Health",
      value: "Health",
      icon: "hospital",
      items: [
        { label: "Doctor Visits", value: "Doctor Visits" },
        { label: "Medicine", value: "Medicine" },
        { label: "Vitamins & Minerals", value: "Vitamins & Minerals" },
        { label: "Physiotherapy", value: "Physiotherapy" },
        { label: "Insuarance", value: "Insuarance" },
        { label: "Hospital", value: "Hospital" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Free Time",
      value: "Free Time",
      icon: "airplane",
      items: [
        { label: "Hobbies", value: "Hobbies" },
        { label: "Spontanious", value: "Spontanious" },
        { label: "Travels", value: "Travels" },
        { label: "Gym", value: "Gym" },
        { label: "Cinema & Movies", value: "Cinema & Movies" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Family",
      value: "Family",
      icon: "baby-carriage",
      items: [
        { label: "Cloth", value: "Cloth" },
        { label: "Pocket Money", value: "Pocket Money" },
        { label: "Education", value: "Education" },
        { label: "Sports", value: "Sports" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Charity",
      value: "Charity",
      icon: "charity",
      items: [
        { label: "Charities", value: "Charities" },
        { label: "Friends", value: "Friends" },
        { label: "Family", value: "Family" },
        { label: "Organisation", value: "Organisation" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Other",
      value: "Other",
      icon: "alien",
      items: [
        { label: "Family", value: "Family" },
        { label: "Friends", value: "Friends" },
        { label: "Other", value: "Other" },
      ],
    },
  ]);
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
  const [isLoading, setIsLoading] = useState(true);
  const [inputValues, setInputValues] = useState();
  const [items, setItems] = useState([{ label: "Choose Category", value: "" }]);
  const [inputBudget, setInputBudget] = useState(false);
  const [inputingBudget, setInputingBudget] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [userBudgetData, setUserBudgetData] = useState([]);

  useEffect(async () => {
    setIsLoading(true);
    try {
      let users = await getLinkedUsers();
      let filter = { user_in: users };
      console.log(filter);
      const { data } = await userBudget.FIND(filter);
      setUserBudgetData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [period]);

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

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#C04848",
    backgroundGradientTo: "#480048",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const data = {
    labels: ["Income", "Expenses", "Saved", "Vacation"], // optional
    data: [0.4, 0.6, 0.8, 0.25],
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
        limit: inputValues.ActivityAmount,
        icon: icon,
        user: user.userId,
      });

      console.log(payload);
      const { data } = await userBudget.CREATE(payload);
      setSuccessText("Hurray it worked!! :)");
      setInputBudget(!inputBudget);
      setInputingBudget(false);
      setErrorText("");
      setSuccessText("");
      setInputValues();
      await reloadBudgetData();
      return data;
    } catch (error) {
      console.log(error);
    }
    setInputingBudget(false);
    return null;
  };
  const reloadBudgetData = async () => {
    setIsLoading(true);
    let user = await getMyData();
    setCurrencySymbol(user?.currency?.symbol);
    setIsLoading(false);
  };
  /// Getting initiall data

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Budget Plan</Text>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={10}
        chartConfig={chartConfig}
        hideLegend={false}
      />
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
            financeData={budgetData}
            title="Budget"
            budgetData={true}
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
