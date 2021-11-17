import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import AskModal from "../components/AskModal/AskModal";
import { incomeCategory } from "../utils/categoryItems";
import SubmitActivity from "../components/SubmitActivity/SubmitActivity";
import BudgetPieChart from "../components/BudgetPieChart/BudgetPieChart";

const IncomeScreen = (props) => {
  const { period, budget, isLoading, currencySymbol } = props;
  const categoryItems = incomeCategory();
  const [id, setId] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userIncome, setUserIncome] = useState([]);
  const [inputValues, setInputValues] = useState({ ActivityDate: new Date() });

  useEffect(async () => {
    setUserIncome(budget?.incomeData);
  }, [budget.incomeData]);

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
      <Text style={styles.text}>Income</Text>
      <BudgetPieChart
        isLoading={isLoading}
        chartData={budget?.incomeChartData || []}
        color={"darkgreen"}
      />

      <SubmitActivity
        isLoading={isLoading}
        currencySymbol={currencySymbol}
        inputValues={inputValues}
        setInputValues={setInputValues}
        activity={"income"}
        categoryItems={categoryItems}
        colorTheme={"darkgreen"}
        buttonText={"Add Income"}
        period={period}
        submitButtonStyle={styles.submit}
      />

      {!isLoading ? (
        <>
          {userIncome?.length > 0 && (
            <FinanceDetails
              financeData={userIncome}
              title="Income Data"
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
  container: {
    flex: 1,
  },
});

export default IncomeScreen;
