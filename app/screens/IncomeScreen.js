import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AskModal from "../components/AskModal/AskModal";
import SubmitActivity from "../components/SubmitActivity/SubmitActivity";
import BudgetPieChart from "../components/BudgetPieChart/BudgetPieChart";
import { useLocale } from "react-easy-localization";
import { colors } from "@material-ui/core";
import { connect } from "react-redux";
import { incomeCategory } from "../utils/categoryItems";
import greenColorCodes from "../utils/greenColorCodes";
import * as actions from "../Redux/actions";
import GroupByUser from "../components/GroupByUser/GroupByUser";

const IncomeScreen = (props) => {
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
  const categoryItems = reduxItems || incomeCategory(i18n);
  const [id, setId] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userIncome, setUserIncome] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const colorCodes = greenColorCodes();
  useEffect(async () => {
    setUserIncome(budget?.incomeData);
  }, [budget.incomeData]);

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
          chartData={budget?.incomeChartData || []}
          color={"green"}
          colorCodes={colorCodes}
          income={true}
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
              <GroupByUser
                financeData={budget?.incomeUserData}
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
  refreshing: state.loader.refreshing,
});

const mapDispatchToProps = (dispatch) => ({
  setRefreshing: (value) => dispatch(actions.setRefresh(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomeScreen);
