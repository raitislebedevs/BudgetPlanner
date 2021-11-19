import moment from "moment";
import budgetJournal from "../services/budgetJournal";
import userBudget from "../services/userBudget";
import greenColorCodes from "./greenColorCodes";
import redColorCodes from "./redColorCodes";
import { sumWithReduce } from "./standaloneFunctions";
import { getLinkedUsers, getMyData } from "./userData";

let rawIncomeData = [];
let rawExpenseData = [];
let incomeData = [];
let expenseData = [];
let bezierChartData = {};
let incomeChartData = [];
let spentChartData = [];
let savedAmount = 0;
let incomeAmount = 0;
let spentAmount = 0;
let currency = "$";
let rawBudgetData = [];
let budgetPlanningData = [];
let budgetChart = [];
let user = {};

export const initilizeData = async (period) => {
  user = await getMyData();
  currency = user?.currency?.symbol;
  rawIncomeData = await getBudgetData(period, "income");

  // console.log("*******************************************");
  // console.log("*******************************************");
  // console.log("Raw Income Data", rawIncomeData);
  // console.log("*******************************************");
  // console.log("*******************************************");

  rawExpenseData = await getBudgetData(period, "expense");

  rawBudgetData = await getBudgetPlanData(period);
  await getGroupedIncomeData(currency);
  await getGroupedExpenseData(currency);
  await getGroupedPlannedData(currency);

  let refObj = JSON.stringify(expenseData);
  let newExpenseData = JSON.parse(refObj);
  await updateGroupedPlannedData(budgetPlanningData, newExpenseData);

  incomeAmount = sumWithReduce(incomeData, "total");
  spentAmount = sumWithReduce(expenseData, "total");
  savedAmount = incomeAmount - spentAmount;
  incomeChartData = chartData(incomeData, greenColorCodes);
  spentChartData = chartData(expenseData, redColorCodes);
  getBezierChartPeriod(period, incomeData, expenseData);

  // console.log("*******************************************");
  // console.log("*******************************************");
  // console.log("Income Data", incomeData);
  // console.log("*******************************************");
  // console.log("*******************************************");

  return {
    incomeData,
    expenseData,
    incomeAmount,
    spentAmount,
    savedAmount,
    incomeChartData,
    spentChartData,
    bezierChartData,
    currency,
    budgetPlanningData,
  };
};

const chartData = (userData, colorCodes) => {
  let colors = colorCodes();
  let count = 0;
  let data = userData.map((sum) => {
    count++;
    return {
      name: sum.label,
      amount: sum.total,
      color: colors[count],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    };
  });
  return data;
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

const getGroupedIncomeData = (currency) => {
  if (rawIncomeData.length == 0) return (incomeData = []);

  incomeData = groupDataByPeriod(rawIncomeData, currency);
};

const getGroupedExpenseData = (currency) => {
  if (rawExpenseData.length == 0) return (expenseData = []);

  expenseData = groupDataByPeriod(rawExpenseData, currency);
};

const getGroupedPlannedData = (currency) => {
  if (rawBudgetData.length == 0) return (budgetPlanningData = []);

  budgetPlanningData = groupDataByPeriod(rawBudgetData, currency);
};

const getBudgetData = async (period, activity) => {
  try {
    let users = await getLinkedUsers();
    let filter = { user_in: users, activity_contains: activity };
    let count = 0;

    getPeriodFilter(period, count, filter);

    const { data } = await budgetJournal.FIND({
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
    let users = await getLinkedUsers();
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
const groupDataByPeriod = (budgetData, currency) => {
  try {
    let groupedBudgetData = [];
    let groupedItemData = [];
    let group = groupDataByIndex(budgetData, "category");
    let icon = "";
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
        icon = categoryItems[el][0].icon;
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

      let categorySummary = {
        label: el,
        total: group[el].reduce(
          (a, b) => a + (parseFloat(b["activityAmount"]) || 0),
          0
        ),
        icon,
        currency: currency,
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

const getBudgetPeriodData = (period) => {
  switch (period) {
    case "week":
      return getWeekData();
    case "month":
      return getMonthData();
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

const getBezierChartPeriod = (period, income, expense) => {
  try {
    let periodData = getBudgetPeriodData(period);
    const { chartLabel, chartPeriods } = periodData;
    let chartData = {
      xLabels: chartLabel,
      incomeChartData: getBezierChartData(chartPeriods, income),
      expenseChartData: getBezierChartData(chartPeriods, expense),
    };
    bezierChartData = chartData;
  } catch (error) {
    console.log(error);
  }
};

const getBezierChartData = (dates, data) => {
  if (dates && data) {
    let chartData = [];
    dates.forEach((chartDate, dateIndex, array) => {
      let chartPoint = 0;
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

              // delete categoryItem.items[index];
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

const getMonthData = () => {
  try {
    let chartLabel = [];
    let chartPeriods = [];

    let dayPeriods = calculateMonthPeriods();
    let addDays = 0;
    for (var i = 0; i < dayPeriods.length; i++) {
      let monthLabels = `Week ${i + 1}`;
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

const groupDataByIndex = (budgetData, key) => {
  var data = budgetData,
    result = data.reduce(function (r, a) {
      r[a[key]] = r[a[key]] || [];
      delete a.user;
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