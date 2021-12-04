import React, { useState } from "react";
import { useLocale } from "react-easy-localization";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Switch,
  RefreshControl,
} from "react-native";
import AskModal from "../components/AskModal/AskModal";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { colors } from "../config/colors";
import { connect } from "react-redux";
import SummaryChart from "../components/SummaryChart.js/SummaryChart";
import * as actions from "../Redux/actions";
import defaultStyles from "../config/appStyles";

const SummaryScreen = (props) => {
  const {
    budget,
    chartLabels,
    isLoading,
    getGlobalBudgetData,
    refreshing,
    setRefreshing,
    setSummaryChart,
  } = props;
  const { i18n } = useLocale();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [chart, setChart] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };

  const updateChartStyle = (e) => {
    setChart(!chart);
    if (e) return setSummaryChart("sum");
    return setSummaryChart("default");
  };

  return (
    <View style={styles.container}>
      <AskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        getGlobalBudgetData={getGlobalBudgetData}
      />
      {budget?.savedAmount + budget?.spentAmount != 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!isLoading ? (
            <>
              <SummaryChart chartLabels={chartLabels} />
              <View style={styles.toggle}>
                <Text style={[defaultStyles.appTextNormal, styles.toogleText]}>
                  {i18n.SummaryScreen.chartLabel}
                </Text>
                <Switch
                  trackColor={{ false: colors.primary, true: "#fff" }}
                  thumbColor={chart ? colors.primary : colors.lightGray}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={updateChartStyle}
                  value={chart}
                />
              </View>
              {budget?.incomeData?.length > 0 && (
                <FinanceDetails
                  financeData={budget?.incomeData}
                  title={i18n.IncomeScreen.label}
                  highlight={highlight}
                  color={{ firstList: "tertiary", secondList: "primary" }}
                />
              )}

              {budget?.expenseData?.length > 0 && (
                <FinanceDetails
                  financeData={budget.expenseData}
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
              color="#e26a00"
            />
          )}
        </ScrollView>
      ) : (
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>Enter some Data</Text>
        </View>
      )}
    </View>
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  budgetItem: {
    color: "purple",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 38,
  },
  headingTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    color: colors.tertiary,
  },

  markedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "green",
    borderWidth: 2,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  toogleText: {
    fontSize: 14,
    marginTop: 12,
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  refreshing: state.loader.refreshing,
  summaryChart: state.theme.summaryChart,
});

const mapDispatchToProps = (dispatch) => ({
  setRefreshing: (value) => dispatch(actions.setRefresh(value)),
  setSummaryChart: (value) => dispatch(actions.setSummaryChart(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);
