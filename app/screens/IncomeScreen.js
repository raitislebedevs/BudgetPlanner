import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import AskModal from "../components/AskModal/AskModal";
import SubmitActivity from "../components/SubmitActivity/SubmitActivity";
import BudgetPieChart from "../components/BudgetPieChart/BudgetPieChart";
import { useLocale } from "react-easy-localization";
import { colors } from "@material-ui/core";
import { connect } from "react-redux";
import { incomeCategory } from "../utils/categoryItems";
import greenColorCodes from "../utils/greenColorCodes";

const IncomeScreen = (props) => {
  const {
    period,
    budget,
    isLoading,
    currencySymbol,
    getGlobalBudgetData,
    reduxItems,
  } = props;

  const { i18n } = useLocale();
  const categoryItems = reduxItems || incomeCategory(i18n);
  const [id, setId] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userIncome, setUserIncome] = useState([]);
  const [inputValues, setInputValues] = useState({ ActivityDate: new Date() });
  const colorCodes = greenColorCodes();
  useEffect(async () => {
    setUserIncome(budget?.incomeData);
  }, [budget.incomeData]);

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <BudgetPieChart
          chartData={budget?.incomeChartData || []}
          color={"green"}
          colorCodes={colorCodes}
        />

        <SubmitActivity
          isLoading={isLoading}
          currencySymbol={currencySymbol}
          inputValues={inputValues}
          setInputValues={setInputValues}
          activity={"income"}
          categoryItems={categoryItems}
          colorTheme={"primary"}
          buttonColor={"tertiary"}
          buttonText={i18n.IncomeScreen.addIncome}
          period={period}
          submitButtonStyle={styles.submit}
          getGlobalBudgetData={getGlobalBudgetData}
        />

        {!isLoading ? (
          <>
            {userIncome?.length > 0 && (
              <FinanceDetails
                financeData={userIncome}
                title={i18n.IncomeScreen.label}
                highlight={highlight}
                color={{ firstList: "tertiary", secondList: "primary" }}
              />
            )}
          </>
        ) : (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={colors.primary}
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
    backgroundColor: "darkgreen",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.loader?.isLoading,
  reduxItems: state.user?.categories?.incomeCategory,
});

export default connect(mapStateToProps)(IncomeScreen);
