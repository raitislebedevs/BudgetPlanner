import React, { useState } from "react";
import { useLocale } from "react-easy-localization";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import AskModal from "../components/AskModal/AskModal";
import FinanceDetails from "../components/FinanseDetails/FinanceDetails";
import { colors } from "../config/colors";
import { connect } from "react-redux";
import SummaryChart from "../components/SummaryChart.js/SummaryChart";

const SummaryScreen = (props) => {
  const { budget, chartLabels, isLoading, getGlobalBudgetData } = props;
  const { i18n } = useLocale();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");

  const highlight = (id) => {
    setId(id);
    setModalVisible(true);
  };
  return (
    <>
      <AskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        getGlobalBudgetData={getGlobalBudgetData}
      />
      {budget.savedAmount + budget.spentAmount != 0 ? (
        <ScrollView>
          {!isLoading ? (
            <>
              <SummaryChart chartLabels={chartLabels} />
              {budget?.incomeData?.length > 0 && (
                <FinanceDetails
                  financeData={budget.incomeData}
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
    </>
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
});

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
});

export default connect(mapStateToProps)(SummaryScreen);
