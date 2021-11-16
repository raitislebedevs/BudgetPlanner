import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import { formatNumber } from "../../utils/standaloneFunctions";
import AskModal from "../AskModal/AskModal";

const FinanceDetails = (props) => {
  const { financeData, title, budgetData, reloadBudgetData } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(false);

  const hilightEntry = (id) => {
    setId(id);
    setModalVisible(true);
  };
  return (
    <View>
      <AskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        reloadBudgetData={reloadBudgetData}
      />
      <List.Section title={title}>
        {financeData.map((items) => (
          <List.Accordion
            title={items.label}
            description={items.description}
            left={(props) => <List.Icon {...props} icon={items?.icon} />}
            right={(props) => (
              <View style={styles.budgetMarkings}>
                <Text style={items.style}>
                  {`${formatNumber(items.total, items?.currency)}`}
                </Text>
                {budgetData && (
                  <Text
                    style={
                      items.percentage > 0
                        ? styles.positiveBudget
                        : styles.negativeBudget
                    }
                  >
                    {` ${items.percentage} % `}
                  </Text>
                )}
              </View>
            )}
            key={items.label}
          >
            {items.data.map((item) => {
              return (
                <List.Accordion
                  title={item.title}
                  style={styles.listIem}
                  right={(props) => (
                    <View style={styles.budgetMarkings}>
                      <Text style={items.style}>
                        {`${formatNumber(item.amount, items?.currency)}`}
                      </Text>
                      {budgetData && (
                        <Text
                          style={
                            item.percentage > 0
                              ? styles.positiveBudget
                              : styles.negativeBudget
                          }
                        >
                          {` ${item.percentage} % `}
                        </Text>
                      )}
                    </View>
                  )}
                  key={item.title}
                >
                  {item?.items &&
                    item?.items.map((singleEntry) => {
                      return (
                        <List.Item
                          title={singleEntry?.date}
                          onPress={() => hilightEntry(singleEntry?.id)}
                          right={(props) => (
                            <View style={styles.budgetMarkings}>
                              <Text style={items.style}>
                                {`${formatNumber(
                                  singleEntry?.amount,
                                  items?.currency
                                )}`}
                              </Text>
                              {budgetData && (
                                <Text
                                  style={
                                    singleEntry.percentage > 0
                                      ? styles.positiveBudget
                                      : styles.negativeBudget
                                  }
                                >
                                  {` ${singleEntry.percentage} % `}
                                </Text>
                              )}
                            </View>
                          )}
                        />
                      );
                    })}
                </List.Accordion>
              );
            })}
          </List.Accordion>
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  positiveBudget: {
    color: "green",
  },
  negativeBudget: {
    color: "red",
  },
  budgetMarkings: {
    alignItems: "center",
  },
  listIem: {
    backgroundColor: "#E8E8E8",
  },
});
export default FinanceDetails;
