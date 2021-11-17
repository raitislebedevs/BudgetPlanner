import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { expenseCategory } from "../utils/categoryItems";
import AskModal from "../components/AskModal/AskModal";
import BudgetPieChart from "../components/BudgetPieChart/BudgetPieChart";
import SubmitActivity from "../components/SubmitActivity/SubmitActivity";

const ExpensesScreen = (props) => {
  const { period, budget, isLoading, currencySymbol } = props;
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
      <Text style={styles.text}>Expenses</Text>
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
        activity={"expanse"}
        categoryItems={categoryItems}
        colorTheme={"brown"}
        buttonText={"Add Expense"}
        period={period}
        submitButtonStyle={styles.submit}
      />
      {!isLoading ? (
        <>
          {userExpense.length > 0 && (
            <FinanceDetails
              financeData={userExpense}
              title="Expense Data"
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
export default ExpensesScreen;
