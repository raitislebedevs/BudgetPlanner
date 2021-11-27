import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { formatNumber } from "../../utils/standaloneFunctions";
import { colors } from "../../config/colors";
import RemoveSwipable from "../RemoveSwipable/RemoveSwipable";
import ListIcon from "../ListIcon/ListIcon";
import moment from "moment";
import { connect } from "react-redux";

const FinanceDetails = (props) => {
  const { financeData, title, highlight, budget, color, currencySymbol } =
    props;

  return (
    <View>
      <List.Section title={title}>
        {financeData?.map((items) => (
          <List.Accordion
            theme={{ colors: { primary: colors[color?.firstList] } }}
            title={items.label}
            description={items.description}
            style={styles.mainLabel}
            left={(props) => (
              <ListIcon
                {...props}
                icon={items?.icon}
                color={items?.color || colors.secondary}
              />
            )}
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
                    currencySymbol
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
                    {` ${currencySymbol} ${parseFloat(
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
                  theme={{ colors: { primary: colors[color?.secondList] } }}
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
                          currencySymbol
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
                          {` ${currencySymbol} ${parseFloat(
                            item.amountSpent
                          ).toFixed(2)}  `}
                        </Text>
                      )}
                    </View>
                  )}
                  left={(props) => (
                    <ListIcon
                      {...props}
                      icon={item?.icon || "help"}
                      color={item.color || colors.secondary}
                      halfSize={true}
                    />
                  )}
                  key={item.title}
                >
                  {item?.items &&
                    item?.items.map((singleEntry) => {
                      return (
                        <RemoveSwipable
                          key={`${singleEntry?.id}`}
                          onPress={() => highlight(singleEntry?.id)}
                        >
                          <List.Item
                            title={moment(singleEntry?.date).format(
                              "DD-MMM-YYYY"
                            )}
                            right={(props) => (
                              <View
                                style={[
                                  styles.budgetMarkings,
                                  styles.itemWidth,
                                ]}
                              >
                                <Text style={items.style}>
                                  {`${formatNumber(
                                    singleEntry?.amount,
                                    currencySymbol
                                  )}`}
                                </Text>
                              </View>
                            )}
                          />
                        </RemoveSwipable>
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
    backgroundColor: colors.gray,
    marginVertical: 2,
    paddingLeft: 25,
  },
  itemWidth: {
    alignSelf: "center",
    minWidth: 100,
  },
  budgetNotDefined: {
    color: colors.primaryBudget,
    alignSelf: "flex-start",
    minWidth: 100,
    fontWeight: "bold",
  },
  mainLabel: {
    color: colors.tertiary,
    marginVertical: 2,
    backgroundColor: colors.gray,
    borderRadius: 25,
  },
  item: { marginLeft: 10, backgroundColor: colors.gray, marginVertical: 2 },
});

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  currencySymbol: state.user.currrency,
});

export default connect(mapStateToProps)(FinanceDetails);
