import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { expenseCategory } from "../utils/categoryItems";
import AskModal from "../components/AskModal/AskModal";
import BudgetPieChart from "../components/BudgetPieChart/BudgetPieChart";
import SubmitActivity from "../components/SubmitActivity/SubmitActivity";
import { connect } from "react-redux";
import { useLocale } from "react-easy-localization";
import redColorCodes from "../utils/redColorCodes";

const ExpensesScreen = (props) => {
  const {
    period,
    budget,
    isLoading,
    currencySymbol,
    getGlobalBudgetData,
    categoryItems,
  } = props;
  const { i18n } = useLocale();
  const [id, setId] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userExpense, setUserExpense] = useState([]);
  const [inputValues, setInputValues] = useState({ ActivityDate: new Date() });
  const colorCodes = redColorCodes();
  useEffect(async () => {
    setUserExpense(budget?.expenseData);
  }, [budget.expenseData]);

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <BudgetPieChart
          isLoading={isLoading}
          chartData={budget?.spentChartData}
          color={"red"}
          colorCodes={colorCodes}
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
          buttonColor={"secondary"}
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
                color={{ firstList: "secondary", secondList: "primary" }}
              />
            )}
          </>
        ) : (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="darkred"
          />
        )}
        <AskModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          id={id}
          getGlobalBudgetData={getGlobalBudgetData}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "darkred",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  categoryItems: state.user?.categories?.expensCategory || expenseCategory(),
});

export default connect(mapStateToProps)(ExpensesScreen);
