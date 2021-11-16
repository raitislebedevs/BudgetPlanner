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
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import DatePickerComponent from "../components/DatePickerComponent/DatePickerComponent";
import { groupDataByPeriod } from "../utils/chartLabels";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import budgetJournal from "../services/budgetJournal";
import { getMyData } from "../utils/tokenStorage";
import { getBudgetData } from "../utils/budgetData";
import InputNumericField from "../components/InputNumericField/InputNumericField";
import greenColorCodes from "../utils/greenColorCodes";
import AskModal from "../components/AskModal/AskModal";

const IncomeScreen = (props) => {
  const { period } = props;
  const [categoryItems, setCategoryItems] = useState([
    {
      label: "Income",
      value: "Income",
      icon: "wallet",
      items: [
        { label: "Salary", value: "Salary" },
        { label: "Gifts", value: "Gifts" },
        { label: "Scholarships", value: "Scholarships" },
        { label: "Others", value: "Others" },
      ],
    },
    {
      label: "Savings",
      value: "Savings",
      icon: "chart-bell-curve-cumulative",
      items: [
        { label: "Kids", value: "Kids" },
        { label: "Vacation", value: "Vacation" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "Investment",
      value: "Investment",
      icon: "money",
      items: [
        { label: "Markets", value: "Markets" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Others", value: "Others" },
      ],
    },
    {
      label: "Others",
      value: "Others",
      icon: "alien",
      items: [{ label: "Others", value: "Others" }],
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState([]);
  const [inputIncome, setInputIncome] = useState(false);
  const [incomeChartData, setIncomeChartData] = useState([]);
  const [userIncome, setUserIncome] = useState([]);
  const [icon, setIcon] = useState();
  const [currencySymbol, setCurrencySymbol] = useState("$");
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

  const addIncome = async () => {
    try {
      setIsAdding(true);
      if (!inputIncome) {
        setIsAdding(false);
        setInputIncome(!inputIncome);
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
        activity: "income",
        icon: icon,
        user: user?.userId,
      };

      const { data } = await budgetJournal.CREATE(payload);
      setSuccessText("Hurray it worked!! :)");
      setInputIncome(!inputIncome);
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
    let income = await getBudgetData(period, "income");
    setCurrencySymbol(user?.currency?.symbol);
    setUserIncome(await groupDataByPeriod(income, user?.currency?.symbol));
    setIsLoading(false);
  };

  useEffect(() => {
    if (userIncome) chartData();
  }, [userIncome]);

  const chartData = () => {
    let colors = greenColorCodes();
    let count = 0;
    let data = userIncome.map((sum) => {
      count++;
      return {
        name: sum.label,
        amount: sum.total,
        color: colors[count],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    });
    setIncomeChartData(data);
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

  const [id, setId] = useState(false);

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <AskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        reloadBudgetData={reloadBudgetData}
        id={id}
      />
      <Text style={styles.text}>Income</Text>
      {!isLoading ? (
        <>
          {incomeChartData.length > 0 && (
            <PieChart
              data={incomeChartData}
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
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="darkgreen"
        />
      )}

      {inputIncome && (
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
              color="darkgreen"
            />
          )}
        </>
      )}

      <TouchableHighlight
        style={styles.submit}
        onPress={() => null}
        underlayColor="darkgreen"
        onPress={() => addIncome()}
      >
        <Text style={styles.submitText}>Add Income</Text>
      </TouchableHighlight>

      {!isLoading ? (
        <>
          {userIncome?.length > 0 && (
            <FinanceDetails
              financeData={userIncome}
              title="Income Data"
              reloadBudgetData={reloadBudgetData}
              highlight={highlight}
            />
          )}
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
    backgroundColor: "darkgreen",
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

export default IncomeScreen;
