import moment from "moment";
import budgetJournal from "../services/budgetJournal";
import userBudget from "../services/userBudget";
import greenColorCodes from "./greenColorCodes";
import redColorCodes from "./redColorCodes";
import { sumWithReduce } from "./standaloneFunctions";

let rawIncomeData = [];
let rawExpenseData = [];
let incomeData = [];
let expenseData = [];
let incomeUserData = [];
let expenseUserData = [];
let bezierChartData = {};
let incomeChartData = [];
let spentChartData = [];
let savedAmount = 0;
let incomeAmount = 0;
let budgetAmount = 0;
let spentAmount = 0;
let currency = "$";
let rawBudgetData = [];
let budgetPlanningData = [];
let budgetChartData = {};
let user = {};
let linkedUsers;

export const initilizeData = async (
  period,
  t,
  reduxUser,
  reduxLinkedUsers,
  categoryDetails,
  chartState
) => {
  if (!reduxUser || reduxLinkedUsers?.length == 0) return;

  linkedUsers = reduxLinkedUsers;
  user = reduxUser;
  currency = reduxUser?.currency?.symbol;
  rawIncomeData = await getBudgetData(period, "income");
  rawExpenseData = await getBudgetData(period, "expense");
  rawBudgetData = await getBudgetPlanData(period);
  console.log("Raw data", rawExpenseData);
  getGroupedIncomeData();
  getGroupedExpenseData();
  getGroupedPlannedData();

  getGroupedUserIncomeData();
  getGroupedUserExpenseData();

  updateCategories(incomeData, categoryDetails?.incomeCategory);
  updateCategories(expenseData, categoryDetails?.expensCategory);
  updateCategories(budgetPlanningData, categoryDetails?.expensCategory);

  updateUserCategories(incomeUserData, categoryDetails?.incomeCategory);
  updateUserCategories(expenseUserData, categoryDetails?.expensCategory);

  let refObj = JSON.stringify(expenseData);
  let newExpenseData = JSON.parse(refObj);
  updateGroupedPlannedData(budgetPlanningData, newExpenseData);
  updateAnyBudget(budgetPlanningData);
  incomeAmount = sumWithReduce(incomeData, "total");
  spentAmount = sumWithReduce(expenseData, "total");
  savedAmount = incomeAmount - spentAmount;
  incomeChartData = chartData(incomeData, greenColorCodes);
  spentChartData = chartData(expenseData, redColorCodes);
  getBezierChartPeriod(period, incomeData, expenseData, t, chartState);
  getBudgetChartData();

  // console.log("Income User Data", incomeUserData);
  // console.log("Expense User Data", expenseUserData);
  return {
    incomeData,
    expenseData,
    incomeAmount,
    spentAmount,
    savedAmount,
    incomeChartData,
    spentChartData,
    bezierChartData,
    incomeUserData,
    expenseUserData,
    currency,
    budgetPlanningData,
    budgetChartData,
    budgetAmount,
  };
};

const chartData = (userData, colorCodes) => {
  let data = userData.map((sum) => {
    return {
      x: sum.label,
      y: sum.total,
    };
  });
  return data;
};

const getBudgetChartData = () => {
  let budgetPlanChartData = [];
  let budgetSpentChartData = [];
  budgetAmount = 0;
  budgetPlanningData.forEach((plan) => {
    budgetAmount += plan.total;
    budgetPlanChartData.push({ x: plan.label, y: plan.total });
    budgetSpentChartData.push({ x: plan.label, y: plan.amountSpent });
  });

  let maxPositive = Math.max.apply(
    Math,
    budgetPlanChartData.map(function (o) {
      return o.y;
    })
  );

  let maxNegative = Math.max.apply(
    Math,
    budgetSpentChartData.map(function (o) {
      return o.y;
    })
  );

  let maxValue = Math.max(maxPositive, maxNegative);
  let yAxis = [0];
  let step = Math.round(maxValue / 7);

  for (let i = 0; i < 8; i++) {
    yAxis.push(step * i + 0.5 * step);
  }

  budgetChartData = {
    spentData: budgetSpentChartData,
    budgetData: budgetPlanChartData,
    yAxis,
  };
};
export const refreshData = async (period) => {
  resetValues();
  await initilizeData(period);
};

const resetValues = () => {
  rawIncomeData = [];
  rawExpenseData = [];
  incomeData = [];
  expenseData = [];
  bezierChartData = {};
  savedAmount = 0;
  incomeAmount = 0;
  spentAmount = 0;
};
const getGroupedUserIncomeData = () => {
  if (rawIncomeData.length == 0) return (incomeUserData = []);
  incomeUserData = groupUserDataByPeriod(rawIncomeData);
};

const getGroupedUserExpenseData = () => {
  if (rawExpenseData.length == 0) return (expenseUserData = []);

  expenseUserData = groupUserDataByPeriod(rawExpenseData);
};

const getGroupedIncomeData = () => {
  if (rawIncomeData.length == 0) return (incomeData = []);

  incomeData = groupDataByPeriod(rawIncomeData);
};

const getGroupedExpenseData = () => {
  if (rawExpenseData.length == 0) return (expenseData = []);

  expenseData = groupDataByPeriod(rawExpenseData);
};

const getGroupedPlannedData = () => {
  if (rawBudgetData.length == 0) return (budgetPlanningData = []);

  budgetPlanningData = groupDataByPeriod(rawBudgetData);
};

const getBudgetData = async (period, activity) => {
  try {
    let users = linkedUsers;
    let filter = { user_in: users, activity_contains: activity };
    let count = 0;

    getPeriodFilter(period, count, filter);

    const { data } = await budgetJournal.FIND({
      _limit: 999999999999,
      _where: filter,
    });
    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const getBudgetPlanData = async (period) => {
  try {
    let users = linkedUsers;
    let filter = { user_in: users, period_contains: period };

    getBudgetPeriodFilter(period, filter);
    const { data } = await userBudget.FIND({
      _where: filter,
    });
    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const updateGroupedPlannedData = (budgetEntries, spentEntries) => {
  try {
    spentEntries.forEach((item) => {
      item.data.forEach((dataPoint) => {
        let index;
        let titleIndex;
        if (budgetEntries.filter((e) => e.label === item.label).length > 0) {
          index = budgetEntries.indexOf(
            budgetEntries.filter((e) => e.label === item.label)[0]
          );
          if (
            budgetEntries[index].data.filter((e) => e.title === dataPoint.title)
              .length > 0
          ) {
            titleIndex = budgetEntries[index].data.indexOf(
              budgetEntries[index].data.filter(
                (e) => e.title === dataPoint.title
              )[0]
            );

            return (budgetEntries[index].data[titleIndex].amountSpent =
              dataPoint.amount);
          }

          const dataItem = dataPoint;
          dataItem.amountSpent = dataPoint.amount;
          dataItem.amount = 0;
          budgetEntries[index].data.push(dataItem);
        }
      });

      if (budgetEntries.filter((e) => e.label === item.label).length > 0) {
        const index = budgetEntries.indexOf(
          budgetEntries.filter((e) => e.label === item.label)[0]
        );
        return (budgetEntries[index].amountSpent = item.total);
      }

      const budgetItem = item;
      budgetItem.amountSpent = item.total;
      budgetItem.total = 0;
      budgetItem.data.forEach((dataItem) => {
        const entry = dataItem;
        entry.amountSpent = dataItem.amount;
        entry.amount = 0;
      });

      budgetEntries.push(budgetItem);
    });

    budgetEntries.forEach((item) => {
      if (!item?.amountSpent) {
        item.amountSpent = 0.0;
      }
      item.data.forEach((dataPoint) => {
        if (!dataPoint?.amountSpent) {
          dataPoint.amountSpent = 0.0;
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const updateAnyBudget = (budgetData) => {
  budgetData.forEach((category) => {
    let anyPlan = category?.data.filter((item) => item.title == "ANY")[0];

    category?.data.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );

    if (!anyPlan || category?.data.length < 2) return;

    let overSpent = category?.data.filter(
      (item) => item.title != "ANY" && item.amountSpent - item.amount > 0
    );
    overSpent.forEach((transferable) => {
      let difference = transferable.amountSpent - transferable.amount;
      if (difference > anyPlan.amount) {
        transferable.amount = anyPlan.amount;
        anyPlan.amount = 0;
        return;
      }
      transferable.amount = transferable.amountSpent;
      anyPlan.amount -= transferable.amountSpent;
    });
  });
};
const groupDataByPeriod = (budgetData) => {
  try {
    let groupedBudgetData = [];
    let groupedItemData = [];
    let group = groupDataByIndex(budgetData, "category");
    let activity = "";

    Object.keys(group).forEach((el) => {
      let categoryItems = groupDataByIndex(group[el], "categoryItem");
      groupedItemData = [];
      Object.keys(categoryItems).forEach((el) => {
        let itemData = [];
        let categoryItemSummery = {
          title: el,
          amount: parseFloat(
            categoryItems[el].reduce(
              (a, b) => a + (parseFloat(b["activityAmount"]) || 0),
              0
            )
          ).toFixed(2),
        };
        activity = categoryItems[el][0].activity;

        categoryItems[el].forEach((item) => {
          itemData.push({
            date: item.activityDate || item?.createdAt,
            amount: parseFloat(item.activityAmount).toFixed(2),
            id: item.id,
          });
        });
        itemData.sort((a, b) => new Date(b.date) - new Date(a.date));
        categoryItemSummery.items = itemData;
        groupedItemData.push(categoryItemSummery);
      });
      //This value here does not Parses great
      let totalValue = group[el].reduce(
        (a, b) => a + (parseFloat(b["activityAmount"]) || 0),
        0
      );
      // console.log({
      //   label: el,
      //   user: group[el][0].user.userInfo,
      //   total: totalValue,
      // });
      let categorySummary = {
        label: el,
        user: group[el][0].user.userInfo,
        total: totalValue,
        style: {
          color: activity == "expense" ? "darkred" : "darkgreen",
          fontWeight: "bold",
        },

        data: groupedItemData,
      };
      groupedBudgetData.push(categorySummary);
    });
    return groupedBudgetData;
  } catch (error) {
    console.log(error);
  }
};

const groupUserDataByPeriod = (budgetData) => {
  try {
    let journalData = {};
    linkedUsers.forEach((user) => {
      let userData = budgetData.filter((item) => item.user.id == user);
      let userItem = groupDataByPeriod(userData);
      if (userData.length > 0)
        journalData = {
          ...journalData,
          [userData[0]?.user.userInfo]: userItem,
        };
    });

    return journalData;
  } catch (error) {
    console.log(error);
  }
};

const getBudgetPeriodData = (period, lang) => {
  switch (period) {
    case "week":
      return getWeekData();
    case "month":
      return getMonthData(lang);
    case "year":
      return getYearData();
    case "all":
      return getAllData();
    default:
      return getAllData();
  }
};

const calculateWeek = () => {
  let weekDays = 7;
  let currentMonth = moment().format("M");
  let substractMonth = moment().subtract(weekDays, "d").format("M");
  if (currentMonth == substractMonth) return weekDays;
  for (var i = weekDays - 1; i > 0; i--) {
    substractMonth = moment().subtract(i, "d").format("M");
    if (currentMonth == substractMonth) return i;
  }
};

const calculateMonth = () => {
  let currentMonth = moment();
  let startOfMonth = moment().startOf("month");
  return currentMonth.diff(startOfMonth, "days"); // =1
};

const calculateMonthDays = () => {
  let currentMonth = moment();
  let startOfMonth = moment().endOf("month");
  return currentMonth.diff(startOfMonth, "days"); // =1
};

const calculateYear = () => {
  let currentMonth = moment();
  let yearStartDate = moment().startOf("year");
  return currentMonth.diff(yearStartDate, "days"); // =1
};

const getBezierChartPeriod = (period, income, expense, lang, chartState) => {
  try {
    let periodData = getBudgetPeriodData(period, lang);
    const { chartLabel, chartPeriods } = periodData;

    let xLabel = chartLabel;
    let incomeChartData = getBezierChartData(chartPeriods, income, chartState);
    let expenseChartData = getBezierChartData(
      chartPeriods,
      expense,
      chartState
    );

    let postiveLine = formatChartData(xLabel, incomeChartData);
    let negativeLine = formatChartData(xLabel, expenseChartData);

    let chartData = { positive: postiveLine, negative: negativeLine };
    let maxPositive = Math.max.apply(
      Math,
      chartData.positive.map(function (o) {
        return o.amount;
      })
    );

    let maxNegative = Math.max.apply(
      Math,
      chartData.negative.map(function (o) {
        return o.amount;
      })
    );

    let maxValue = Math.max(maxPositive, maxNegative);
    let yAxis = [0];
    let step = Math.round(maxValue / 7);

    for (let i = 0; i < 8; i++) {
      yAxis.push(step * i + 0.5 * step);
    }

    chartData.yAxis = yAxis;

    bezierChartData = chartData;
  } catch (error) {
    console.log(error);
  }
};

const formatChartData = (xLabel, incomeChartData) => {
  let lineData = [];
  xLabel.forEach((el, index) => {
    lineData.push({
      period: el,
      amount: incomeChartData[index],
    });
  });

  return lineData;
};

const getBezierChartData = (dates, data, chartState) => {
  if (dates && data) {
    let chartPoint = 0;
    let chartData = [];
    dates.forEach((chartDate, dateIndex, array) => {
      if (chartState === "default") chartPoint = 0;
      data.forEach((category) => {
        category?.data.forEach((categoryItem) => {
          categoryItem?.items.forEach((point, index) => {
            let result = false;

            var compareDate = moment(point?.date, "YYYY-MM-DD");
            var startDate = moment(chartDate, "YYYY-MM-DD");

            if (dates?.length >= dateIndex + 1) {
              var endDate = moment(dates[dateIndex + 1], "YYYY-MM-DD");
            } else {
              var endDate = moment(dates[dateIndex], "YYYY-MM-DD");
            }

            result =
              compareDate.isBetween(startDate, endDate) ||
              compareDate.isSame(startDate);

            if (dateIndex === array.length - 1) {
              result =
                compareDate.isBetween(startDate, endDate) ||
                compareDate.isSame(startDate) ||
                compareDate.isSame(endDate);
            }

            if (result) {
              chartPoint += parseFloat(point.amount);
            }
          });
        });
      });
      chartData.push(chartPoint);
    });

    return chartData;
  }
};

const getWeekData = () => {
  let chartLabel = [];
  let chartPeriods = [];
  for (let index = 6; index >= 0; index--) {
    let day = moment().subtract(index, "days").format("YYYY-MM-DD");
    chartPeriods.push(day);
    let dayLabel = moment().subtract(index, "days").format("ddd");
    chartLabel.push(dayLabel);
  }
  return { chartLabel, chartPeriods };
};

const getMonthData = (lang) => {
  try {
    let chartLabel = [];
    let chartPeriods = [];

    let dayPeriods = calculateMonthPeriods();
    let addDays = 0;
    for (var i = 0; i < dayPeriods.length; i++) {
      let monthLabels = `${lang.Common.week} ${i + 1}`;
      chartLabel.push(monthLabels);

      let monthPeriod = moment()
        .startOf("month")
        .add(addDays, "days")
        .format("YYYY-MM-DD");
      chartPeriods.push(monthPeriod);
      addDays = addDays + dayPeriods[i];
    }

    let monthPeriod = moment()
      .startOf("month")
      .add(addDays - 1, "days")
      .format("YYYY-MM-DD");
    chartPeriods.push(monthPeriod);

    return { chartLabel, chartPeriods };
  } catch (error) {
    console.log(error);
  }
};

const getYearData = () => {
  try {
    let chartLabel = [];
    let chartPeriods = [];
    let yearPeriod = calculateYearPeriods();

    for (let i = 0; i < yearPeriod.length; i++) {
      let monthLabel = moment().startOf("year").add(i, "months").format("MMM");

      chartLabel.push(monthLabel);

      let monthDate = moment()
        .startOf("year")
        .add(i, "months")
        .format("YYYY-MM-DD");
      chartPeriods.push(monthDate);
    }
    return { chartLabel, chartPeriods };
  } catch (error) {
    console.log("Format Year Error", error);
  }
};

const getAllData = () => {
  try {
    let chartLabel = [];
    let chartPeriods = [];

    for (let i = 5; i >= 0; i--) {
      let monthLabel = moment()
        .startOf("year")
        .subtract(i - 1, "years")
        .format("YYYY");

      chartLabel.push(monthLabel);

      let monthDate = moment()
        .endOf("year")
        .subtract(i, "years")
        .format("YYYY-MM-DD");
      chartPeriods.push(monthDate);
    }
    delete chartLabel[6];
    return { chartLabel, chartPeriods };
  } catch (error) {}
};

const calculateMonthPeriods = () => {
  let periodDays = [];
  let days = moment().daysInMonth();
  let dayOfWeek = moment().startOf("month");

  const date = moment(dayOfWeek); // Thursday Feb 2015
  let weekOne = 8 - date.day();
  periodDays.push(weekOne);
  days -= 7;
  while (Math.floor(days / 7) > 0) {
    days -= 7;
    periodDays.push(7);
  }
  periodDays.push(days);
  return periodDays;
};

const calculateYearPeriods = () => {
  try {
    let yearPeriod = [];
    let startDate = moment().startOf("year");
    yearPeriod.push(startDate);
    for (let i = 1; i < 12; i++) {
      yearPeriod.push(moment(startDate).add(i, "months"));
    }
    return yearPeriod;
  } catch (error) {
    console.log("Year Period Error", error);
  }
};

const calculateBOTPeriods = () => {
  try {
    let yearPeriod = [];
    let startDate = moment().startOf("year");
    yearPeriod.push(startDate);
    for (let i = 1; i < 12; i++) {
      yearPeriod.push(moment(startDate).add(i, "months"));
    }
    return yearPeriod;
  } catch (error) {
    console.log("Year Period Error", error);
  }
};

export const groupDataByIndex = (budgetData, key) => {
  var data = budgetData,
    result = data?.reduce(function (r, a) {
      r[a[key]] = r[a[key]] || [];
      a.user;
      r[a[key]].push(a);
      return r;
    }, Object.create(null));

  return result;
};

export const groupUserDataByIndex = (budgetData, key) => {
  var data = budgetData,
    result = data?.reduce(function (r, a) {
      r[a[key]] = r[a[key]] || [];
      a.user;
      r[a[key]].push(a);
      return r;
    }, Object.create(null));

  return result;
};

function getPeriodFilter(period, count, filter) {
  switch (period) {
    case "week":
      count = calculateWeek();
      filter.activityDate_gte = moment().subtract(count, "d").format();
      break;
    case "month":
      count = calculateMonth();
      filter.activityDate_gte = moment().subtract(count, "d").format();
      break;
    case "year":
      count = calculateYear();
      filter.activityDate_gte = moment().subtract(count, "d").format();
      break;
    default:
      break;
  }
  return count;
}

function getBudgetPeriodFilter(period, filter) {
  switch (period) {
    case "day":
      filter.period_contains = "Day";
      break;
    case "week":
      filter.period_contains = "Week";
      break;
    case "month":
      filter.period_contains = "Month";
      break;
    case "year":
      filter.period_contains = "Year";
      break;
    case "all":
      filter.period_contains = "All";
      break;
    default:
      break;
  }
}

function updateCategories(data, category) {
  if (!category) return;

  data?.forEach((group) => {
    let item = category.filter((c) => c.value == group.label)[0];
    if (!item) return;
    let items = item.items;
    group.icon = item.icon;
    group.color = item.color;
    group.data?.forEach((cat) => {
      let innerItem = items.filter((i) => i.value == cat.title)[0];
      cat.icon = innerItem?.icon;
      cat.color = innerItem?.color;
    });
  });
}

function updateUserCategories(data, category) {
  if (!category) return;

  for (const key in data) {
    data[key].forEach((group) => {
      let item = category.filter((c) => c.value == group.label)[0];
      if (!item) return;
      let items = item.items;
      group.icon = item.icon;
      group.color = item.color;
      group.data.forEach((cat) => {
        let innerItem = items.filter((i) => i.value == cat.title)[0];
        cat.icon = innerItem?.icon;
        cat.color = innerItem?.color;
      });
    });
  }
}
