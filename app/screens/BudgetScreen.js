import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Picker,
  TouchableHighlight,
} from "react-native";
import { Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { budgetData } from "../demoData/summarydata";
import { getChartPeriod } from "../utils/chartLabels";
import { ProgressChart } from "react-native-chart-kit";
import { getMyData } from "../utils/tokenStorage";

const BudgetScreen = (props) => {
  const { period } = props;
  const [categoryItems, setCategoryItems] = useState([
    {
      label: "Housing",
      value: "housing",
      items: [
        { label: "Rent", value: "rent" },
        { label: "Mortgage", value: "mortgage" },
        { label: "Mobile", value: "mobile" },
        { label: "Internet", value: "internet" },
        { label: "Furnitures", value: "furnitures" },
        { label: "Household goods", value: "householdGoods" },
        { label: "Other", value: "others" },
      ],
    },
    {
      label: "Food",
      value: "food",
      items: [
        { label: "Grain Crops", value: "grainCrops" },
        { label: "Vegitables", value: "vegitables" },
        { label: "Milk Products", value: "milkProducts" },
        { label: "Confectionery", value: "confectionery" },
        { label: "Greens & Salad", value: "greensSalad" },
        { label: "Tea & Cofee", value: "teaCofee" },
        { label: "Fish & Meet & Eggs", value: "fishMeetEggs" },
        { label: "Additives", value: "milkProducts" },
        { label: "Sweets & Snaks", value: "sweetsSnaks" },
        { label: "Restaurants & Cantains", value: "restarauntsCantains" },
        { label: "Drinks", value: "drinks" },
        { label: "Junk Food", value: "junkFood" },
        { label: "Other", value: "others" },
      ],
    },
    {
      label: "Transport",
      value: "transport",
      items: [
        { label: "Bus & Taxi", value: "busTaxi" },
        { label: "Gas & Electricity", value: "gasElectricity" },
        { label: "Insuarence", value: "insuarence" },
        { label: "Tax", value: "tax" },
        { label: "Maintainances & Repairs", value: "maintancesReparis" },
        { label: "Other", value: "others" },
      ],
    },
    {
      label: "Health",
      value: "health",
      items: [
        { label: "Doctor Visits", value: "doctorVisits" },
        { label: "Medicine", value: "medicine" },
        { label: "Vitamins & Minerals", value: "vitaminsMinerals" },
        { label: "Physiotherapy", value: "physiotherapy" },
        { label: "Insuarance", value: "insuarance" },
        { label: "Hospital", value: "hospital" },
        { label: "Other", value: "others" },
      ],
    },
    {
      label: "Free Time",
      value: "freeTime",
      items: [
        { label: "Hobbies", value: "hobbies" },
        { label: "Spontanious", value: "spontanious" },
        { label: "Travels", value: "travels" },
        { label: "Gym", value: "gym" },
        { label: "Cinema & Movies", value: "cinemaMovies" },
        { label: "Other", value: "others" },
      ],
    },
    {
      label: "Family",
      value: "family",
      items: [
        { label: "Cloth", value: "cloth" },
        { label: "Pocket Money", value: "pocketMoney" },
        { label: "Education", value: "education" },
        { label: "Sports", value: "sports" },
        { label: "Other", value: "others" },
      ],
    },
    {
      label: "Charity",
      value: "charity",
      items: [
        { label: "Charities", value: "charities" },
        { label: "Friends", value: "friends" },
        { label: "Family", value: "family" },
        { label: "Organisation", value: "organisation" },
        { label: "Other", value: "others" },
      ],
    },
    {
      label: "Other",
      value: "others",
      items: [
        { label: "Family", value: "family" },
        { label: "Friends", value: "friends" },
        { label: "Other", value: "others" },
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
  const [userOptions, setUserOptions] = useState([]);
  const [items, setItems] = useState([{ label: "Choose Category", value: "" }]);
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryItemValue, setCategoryItemValue] = useState("");
  const [chartLabels, setChartLabels] = useState(getChartPeriod("year"));

  useEffect(async () => {
    let periods = getChartPeriod(period);
    let user = await getMyData();

    user?.linkedUsers.map((person) => {
      users.push({
        label: person?.email,
        value: person?.id,
      });
    });

    users.push({
      label: `${user?.firstName} ${user?.lastName}`,
      value: user?.id,
    });

    setUserOptions(users);
    console.log(user);
    setChartLabels(periods);
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
      <View>
        <View style={styles.pickerItemContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={categoryValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setCategoryValue(itemValue)
              }
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
              selectedValue={categoryItemValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setCategoryItemValue(itemValue)
              }
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
          {/* <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userOptions}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setCategoryValue(itemValue)
              }
            >
              <Picker.Item label="User" value="" />
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
              selectedValue={budgetPeriods}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setCategoryItemValue(itemValue)
              }
            >
              <Picker.Item label="Period" value="" />
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
          </View> */}
        </View>
        <TextInput
          underlineColor="brown"
          label="Value"
          keyboardType="numeric"
        ></TextInput>
      </View>

      <TouchableHighlight
        style={styles.submit}
        onPress={() => null}
        underlayColor="purple"
      >
        <Text style={styles.submitText}>Add to budget</Text>
      </TouchableHighlight>
      <FinanceDetails
        financeData={budgetData}
        title="Budget"
        budgetData={true}
      />
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
  pickerItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BudgetScreen;
