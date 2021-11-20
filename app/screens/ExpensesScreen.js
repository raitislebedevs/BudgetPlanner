import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { expenseCategory } from "../utils/categoryItems";
import AskModal from "../components/AskModal/AskModal";
import BudgetPieChart from "../components/BudgetPieChart/BudgetPieChart";
import SubmitActivity from "../components/SubmitActivity/SubmitActivity";
import { withLocale } from "react-easy-localization";

const ExpensesScreen = (props) => {
  const {
    period,
    budget,
    isLoading,
    currencySymbol,
    getGlobalBudgetData,
    i18n,
  } = props;
  const categoryItems = expenseCategory();
  const [id, setId] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userExpense, setUserExpense] = useState([]);
  const [inputValues, setInputValues] = useState({ ActivityDate: new Date() });

  useEffect(async () => {
    setUserExpense(budget?.expenseData);
  }, [budget.expenseData]);

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <AskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
      />
      <BudgetPieChart
        isLoading={isLoading}
        chartData={budget?.spentChartData}
        color={"darkred"}
      />

      <SubmitActivity
        isLoading={isLoading}
        currencySymbol={currencySymbol}
        inputValues={inputValues}
        setInputValues={setInputValues}
        activity={"expense"}
        categoryItems={categoryItems}
        colorTheme={"brown"}
        buttonText={i18n.ExpenseScreen.addExpense}
        period={period}
        submitButtonStyle={styles.submit}
        getGlobalBudgetData={getGlobalBudgetData}
      />
      {!isLoading ? (
        <>
          {userExpense.length > 0 && (
            <FinanceDetails
              financeData={userExpense}
              title={i18n.ExpenseScreen.label}
              highlight={highlight}
            />
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
  container: {
    flex: 1,
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
});
export default withLocale(ExpensesScreen);
