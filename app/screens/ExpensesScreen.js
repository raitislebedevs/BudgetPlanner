import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Picker,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import DatePickerComponent from "../components/DatePickerComponent/DatePickerComponent";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import InputNumericField from "../components/InputNumericField/InputNumericField";
import Period from "../components/Period/Period";
import budgetJournal from "../services/budgetJournal";
import { getBudgetData } from "../utils/budgetData";
import { groupDataByPeriod } from "../utils/chartLabels";
import { getMyData } from "../utils/tokenStorage";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import redColorCodes from "../utils/redColorCodes";

const ExpensesScreen = (props) => {
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
      value: "health",
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
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [isAdding, setIsAdding] = useState(false);
  const [userExpense, setUserExpense] = useState([]);
  const [expenseChartData, setExpenseChartData] = useState([]);
  const [expenseInput, setExpenseInput] = useState(false);
  const [icon, setIcon] = useState();
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [inputValues, setInputValues] = useState({ ActivityDate: new Date() });

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

    setIcon(category?.icon);
    setItems(category?.items);

    handleOnChangeCategoryInputValue(event);
  };

  const addExpense = async () => {
    try {
      setIsAdding(true);
      if (!expenseInput) {
        setIsAdding(false);
        setExpenseInput(!expenseInput);
        return;
      }
      setErrorText("");
      setSuccessText("");
      if (
        !inputValues.Category ||
        !inputValues.CategoryItem ||
        !inputValues.ActivityDate ||
        !inputValues.ActivityAmount
      ) {
        setIsAdding(false);
        return setErrorText("Fill all fields");
      }
      let user = await getMyData();
      let payload = {
        category: inputValues.Category,
        categoryItem: inputValues.CategoryItem,
        activityDate: inputValues.ActivityDate,
        activityAmount: inputValues.ActivityAmount,
        activity: "expense",
        icon: icon,
        user: user?.userId,
      };

      const { data } = await budgetJournal.CREATE(payload);
      setSuccessText("Hurray it worked!! :)");
      setExpenseInput(!expenseInput);
      setIsAdding(false);
      setErrorText("");
      setSuccessText("");
      setInputValues();
      await reloadBudgetData({ ActivityDate: new Date() });
      return data;
    } catch (error) {
      console.log(error);
    }
    setIsAdding(false);
    return null;
  };

  useEffect(async () => {
    await reloadBudgetData();
  }, [period]);

  const reloadBudgetData = async () => {
    setIsLoading(true);
    let user = await getMyData();
    let expenses = await getBudgetData(period, "expense");
    setCurrencySymbol(user?.currency?.symbol);
    setUserExpense(await groupDataByPeriod(expenses, user?.currency?.symbol));
    setIsLoading(false);
  };

  useEffect(() => {
    if (userExpense) chartData();
  }, [userExpense]);

  const chartData = () => {
    let colors = redColorCodes();
    let count = 0;
    let data = userExpense.map((sum) => {
      //const rndInt = Math.floor(Math.random() * colors.length) + 1;
      count++;
      return {
        name: sum.label,
        amount: sum.total,
        color: colors[count],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    });
    setExpenseChartData(data);
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Expenses</Text>
      {!isLoading ? (
        <>
          {expenseChartData.length > 0 && (
            <PieChart
              data={expenseChartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={"amount"}
              // backgroundColor={"transparent"}
              paddingLeft={"15"}
              // hasLegend= {false}
              center={[0, 0]}
              absolute
            />
          )}
        </>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="darkred" />
      )}

      {expenseInput && (
        <>
          {!isAdding ? (
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
              color="darkred"
            />
          )}
        </>
      )}
      <TouchableHighlight
        style={styles.submit}
        onPress={() => null}
        underlayColor="darred"
        onPress={() => addExpense()}
      >
        <Text style={styles.submitText}>Add Expense</Text>
      </TouchableHighlight>

      {!isLoading ? (
        <>
          {userExpense.length > 0 && (
            <FinanceDetails financeData={userExpense} title="Expense Data" />
          )}
        </>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="darkred" />
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
    marginTop: 10,
    borderRadius: 10,
    padding: 10,

    zIndex: 10,
  },

  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "darkred",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
  dropDownContainer: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
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
  loader: {
    marginTop: 25,
  },
});
export default ExpensesScreen;
