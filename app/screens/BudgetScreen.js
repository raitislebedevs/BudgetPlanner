import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
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
import { colors } from "../config/colors";
import AppButton from "../components/AppButton/AppButton";
import { useLocale } from "react-easy-localization";
import AppPicker from "../components/AppPicker/AppPicker";
import { connect } from "react-redux";

const BudgetScreen = (props) => {
  const { budget, isLoading, currrency, getGlobalBudgetData, reduxCategories } =
    props;
  const { i18n } = useLocale();
  const [budgetPeriods, setBudgetPeriods] = useState([
    {
      label: i18n.BudgetScreen.period.week,
      value: "Week",
    },
    {
      label: i18n.BudgetScreen.period.month,
      value: "Month",
    },
    {
      label: i18n.BudgetScreen.period.year,
      value: "Year",
    },
  ]);
  const categoryItems = reduxCategories || expenseCategory(i18n);
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
        !inputValues?.activityAmount
      ) {
        setInputingBudget(false);
        return setErrorText("Fill all fields");
      }
      let user = await getMyData();

      let payload = cleanObject({
        category: inputValues?.category,
        categoryItem: inputValues?.categoryItem || "ANY",
        period: inputValues?.period,
        activityAmount: inputValues?.activityAmount,
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
        getGlobalBudgetData={getGlobalBudgetData}
      />
      <View style={styles.chartContainer}>
        <BudgetChart budget={budget} isLoading={isLoading} />
      </View>
      {inputBudget && (
        <>
          {!inputingBudget ? (
            <>
              <View style={styles.submitContainer}>
                <View style={styles.pickerItemContainer}>
                  <AppPicker
                    icon={"apps"}
                    underlineColor="brown"
                    placeholder={i18n.Common.category}
                    items={categoryItems}
                    onSelectItem={(value) => {
                      handleOnChangeCategory({
                        target: { value: value, id: "category" },
                      });
                    }}
                    selectedItem={inputValues?.category}
                  />
                  <AppPicker
                    icon="apps"
                    underlineColor="brown"
                    placeholder={i18n.Common.categoryItem}
                    items={items}
                    onSelectItem={(value) => {
                      handleOnChange({
                        target: { value, id: "categoryItem" },
                      });
                    }}
                    selectedItem={inputValues?.categoryItem}
                  />
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
                      <Picker.Item
                        label={i18n.BudgetScreen.period.label}
                        value=""
                      />
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
                  <View style={styles.numericValue}>
                    <InputNumericField
                      icon={"cash"}
                      id={"activityAmount"}
                      handleOnChange={handleOnChange}
                      label={i18n.Common.amount}
                      currency={currrency}
                    />
                  </View>
                </View>
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

      <View style={styles.buttonStyle}>
        <AppButton
          title={i18n.BudgetScreen.addBudget}
          onPress={() => addBudget()}
          color={"primary"}
        />
      </View>

      {!isLoading ? (
        <>
          <FinanceDetails
            financeData={budget?.budgetPlanningData || []}
            title={i18n.BudgetScreen.label}
            highlight={highlight}
            budget={budget}
            color={{ firstList: "primary", secondList: "primary" }}
          />
        </>
      ) : (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={colors.secondary}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    borderRadius: 10,
    marginLeft: "5%",
    marginRight: "5%",
  },

  pickerItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerPeriodContainer: {
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderRadius: 25,
    maxHeight: 60,
  },

  numericValue: {
    display: "flex",
    width: "100%",
  },

  submitContainer: {
    marginLeft: "2.5%",
    marginRight: "2.5%",
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
  chartContainer: {
    flex: 1,
    marginLeft: "2%",
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  reduxCategories: state.user?.categories?.expensCategory,
  currrency: state.user.currrency || "$",
});

export default connect(mapStateToProps)(BudgetScreen);
