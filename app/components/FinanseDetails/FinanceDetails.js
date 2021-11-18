import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { formatNumber } from "../../utils/standaloneFunctions";

const FinanceDetails = (props) => {
  const { financeData, title, highlight, budget } = props;

  return (
    <View>
      <List.Section title={title}>
        {financeData?.map((items) => (
          <List.Accordion
            title={items.label}
            description={items.description}
            left={(props) => <List.Icon {...props} icon={items?.icon} />}
            right={(props) => (
              <View style={styles.budgetMarkings}>
                <Text
                  style={
                    budget && items.total === 0
                      ? styles.budgetNotDefined
                      : [items.style, styles.itemWidth]
                  }
                >
                  {`${formatNumber(
                    parseFloat(items.total).toFixed(2),
                    items?.currency
                  )}  `}
                  {budget &&
                    `  ${
                      items.total - items?.amountSpent > 0
                        ? "👍"
                        : items.total == 0
                        ? "❗"
                        : "👎"
                    }`}
                </Text>
                {budget && (
                  <Text
                    style={
                      items.total - items.amountSpent > 0
                        ? styles.positiveBudget
                        : styles.negativeBudget
                    }
                  >
                    {` ${items?.currency} ${parseFloat(
                      items.amountSpent
                    ).toFixed(2)}  `}
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
                      <Text
                        style={
                          budget && item.amount === 0
                            ? styles.budgetNotDefined
                            : [items.style, styles.itemWidth]
                        }
                      >
                        {`${formatNumber(
                          parseFloat(item.amount).toFixed(2),
                          items?.currency
                        )} ${item.amount == 0 ? "❗" : ""}`}
                      </Text>
                      {budget && item.title != "ANY" && (
                        <Text
                          style={
                            item.percentage > 0
                              ? styles.positiveBudget
                              : styles.negativeBudget
                          }
                        >
                          {` ${items?.currency} ${parseFloat(
                            item.amountSpent
                          ).toFixed(2)}  `}
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
                          onPress={() => highlight(singleEntry?.id)}
                          key={`${singleEntry?.id}`}
                          right={(props) => (
                            <View
                              style={[styles.budgetMarkings, styles.itemWidth]}
                            >
                              <Text style={items.style}>
                                {`${formatNumber(
                                  singleEntry?.amount,
                                  items?.currency
                                )}`}
                              </Text>
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
    alignSelf: "flex-start",
    minWidth: 100,
  },
  negativeBudget: {
    color: "red",
    alignSelf: "flex-start",
    minWidth: 100,
  },
  budgetMarkings: {
    alignItems: "flex-start",
  },
  listIem: {
    backgroundColor: "#E8E8E8",
  },
  itemWidth: {
    alignSelf: "flex-start",
    minWidth: 100,
  },
  budgetNotDefined: {
    color: "darkblue",
    alignSelf: "flex-start",
    minWidth: 100,
    fontWeight: "bold",
  },
});
export default FinanceDetails;
