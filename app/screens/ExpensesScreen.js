import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { expenseCategory } from "../utils/categoryItems";
import AskModal from "../components/AskModal/AskModal";
import BudgetPieChart from "../components/BudgetPieChart/BudgetPieChart";
import SubmitActivity from "../components/SubmitActivity/SubmitActivity";
import { connect } from "react-redux";
import { useLocale } from "react-easy-localization";
import redColorCodes from "../utils/redColorCodes";
import * as actions from "../Redux/actions";
import GroupByUser from "../components/GroupByUser/GroupByUser";

const ExpensesScreen = (props) => {
  const {
    period,
    budget,
    isLoading,
    currencySymbol,
    getGlobalBudgetData,
    reduxItems,
    refreshing,
    setRefreshing,
  } = props;
  const { i18n } = useLocale();
  const categoryItems = reduxItems || expenseCategory(i18n);
  const [id, setId] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userExpense, setUserExpense] = useState([]);
  const [inputValues, setInputValues] = useState({ ActivityDate: new Date() });
  const colorCodes = redColorCodes();
  useEffect(async () => {
    setUserExpense(budget?.expenseData);
  }, [budget?.expenseData]);

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
              <GroupByUser
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
  reduxItems: state.user?.categories?.expensCategory,
  refreshing: state.loader.refreshing,
});

const mapDispatchToProps = (dispatch) => ({
  setRefreshing: (value) => dispatch(actions.setRefresh(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesScreen);
