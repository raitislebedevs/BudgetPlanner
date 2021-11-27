import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import InputNumericField from "../components/InputNumericField/InputNumericField";
import userBudget from "../services/userBudget";
import { cleanObject, formatNumber } from "../utils/standaloneFunctions";
import { getMyData } from "../utils/userData";
import { expenseCategory } from "../utils/categoryItems";
import BudgetChart from "../components/BudgetChart/BudgetChart";
import AskModal from "../components/AskModal/AskModal";
import { colors } from "../config/colors";
import AppButton from "../components/AppButton/AppButton";
import { useLocale } from "react-easy-localization";
import AppPicker from "../components/AppPicker/AppPicker";
import { connect } from "react-redux";
import * as actions from "../Redux/actions";
import AppTextInput from "../components/AppTextInput/AppTextInput";
import IOSPicker from "../components/IOSPicker/IOSPicker";

const BudgetScreen = (props) => {
  const {
    budget,
    isLoading,
    currrency,
    getGlobalBudgetData,
    reduxCategories,
    refreshing,
    setRefreshing,
  } = props;
  const { i18n } = useLocale();
  const [budgetPeriods, setBudgetPeriods] = useState([
    {
      label: i18n.BudgetScreen.period.label,
      value: "",
    },
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
    console.log(event);
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
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <>
      {/* <IOSPicker pickerModal={pickerModal} setPickerModal={setPickerModal} /> */}
      {!isLoading ? (
        <View style={styles.summaryContainer}>
          <View>
            <Text style={styles.label}>{i18n.Header.planned}</Text>
            <Text
              style={
                budget?.spentAmount > budget?.budgetAmount
                  ? styles.overspentAmount
                  : styles.positiveAmount
              }
            >
              {`${
                formatNumber(
                  parseFloat(budget?.budgetAmount).toFixed(2),
                  currrency
                ) || parseFloat(0).toFixed(2)
              }`}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>{i18n.Header.spent}</Text>
            <Text style={styles.negativeAmount}>
              {`${
                formatNumber(
                  parseFloat(budget?.spentAmount).toFixed(2),
                  currrency
                ) || parseFloat(0).toFixed(2)
              }`}
            </Text>
          </View>
        </View>
      ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#e26a00" />
      )}
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                      {Platform.OS === "android" ? (
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
                      ) : (
                        <>
                          <IOSPicker
                            icon={"calendar-clock"}
                            style={{ height: 100, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => {
                              handleOnChange({
                                target: { value: itemValue, id: "period" },
                              });
                            }}
                            i18n={i18n}
                            items={budgetPeriods}
                            placeholder={
                              budgetPeriods.filter(
                                (item) => item.value == inputValues?.period
                              )[0]?.label || i18n.BudgetScreen.period.label
                            }
                          />
                        </>
                      )}
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
                  <Text
                    style={errorText ? styles.errorText : styles.successText}
                  >
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
    </>
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
  positiveAmount: {
    color: "green",
    fontSize: 11,
    fontWeight: "bold",
  },
  negativeAmount: {
    color: "darkred",
    fontSize: 11,
    fontWeight: "bold",
  },
  overspentAmount: {
    color: "red",
    fontSize: 11,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  label: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
  },
  leftNav: {
    color: "black",
    alignSelf: "center",
  },
  summaryContainer: {
    marginTop: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  loader: {
    marginTop: 25,
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  reduxCategories: state.user?.categories?.expensCategory,
  currrency: state.user.currrency || "$",
  refreshing: state.loader.refreshing,
});

const mapDispatchToProps = (dispatch) => ({
  setRefreshing: (value) => dispatch(actions.setRefresh(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetScreen);
