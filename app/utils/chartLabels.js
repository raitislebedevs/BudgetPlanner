import moment from "moment";
import { calculateMonth, calculateMonthDays } from "./budgetData";

export const getChartPeriod = (period, income, expense) => {
  try {
    let periodData = getPeriodData(period);
    const { periodLabel, periodDates } = periodData;
    let chartData = {
      xLabels: periodLabel,
      incomeData: getChartFunctionData(periodDates, income),
      expenseData: getChartFunctionData(periodDates, expense),
    };

    return chartData;
  } catch (error) {
    console.log(error);
  }
};
export const groupDataByPeriod = (budgetData, currency) => {
  try {
    let categorySummaryData = [];
    let categoryItemSummaryData = [];
    let categoryGroup = groupByIndex(budgetData, "category");
    let icon = "";
    let activity = "";

    Object.keys(categoryGroup).forEach((el) => {
      let itemDetails = groupByIndex(categoryGroup[el], "categoryItem");
      categoryItemSummaryData = [];
      Object.keys(itemDetails).forEach((el) => {
        let detailData = [];
        let categoryItemSummery = {
          title: el,
          amount: parseFloat(
            itemDetails[el].reduce(
              (a, b) => a + (parseFloat(b["activityAmount"]) || 0),
              0
            )
          ).toFixed(2),
        };
        icon = itemDetails[el][0].icon;
        activity = itemDetails[el][0].activity;

        itemDetails[el].forEach((item) => {
          detailData.push({
            date: item.activityDate,
            amount: parseFloat(item.activityAmount).toFixed(2),
          });
        });
        detailData.sort((a, b) => new Date(b.date) - new Date(a.date));
        categoryItemSummery.items = detailData;
        categoryItemSummaryData.push(categoryItemSummery);
      });

      let categorySummary = {
        label: el,
        total: categoryGroup[el].reduce(
          (a, b) => a + (parseFloat(b["activityAmount"]) || 0),
          0
        ),
        icon,
        currency,
        style: {
          color: activity == "income" ? "darkgreen" : "darkred",
          fontWeight: "bold",
        },

        data: categoryItemSummaryData,
      };
      categorySummaryData.push(categorySummary);
    });
    return categorySummaryData;
  } catch (error) {
    console.log(error);
  }
};

const getChartFunctionData = (dates, data) => {
  if (dates) {
    let chartData = [];
    dates.forEach((chartDate, dateIndex) => {
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

            // console.log("*********************************************");
            // console.log("Compare Date", compareDate);
            // console.log("Start Data", startDate);
            // console.log("End data", endDate);
            // console.log("RESULT:", result);

            // console.log(
            //   "COMPARE RESULTS WITH CURRENT ONE: ",
            //   point?.date === chartDate,
            //   result
            // );
            if (result) {
              chartPoint += parseFloat(point.amount);

              delete categoryItem.items[index];
            }
          });
        });
      });
      chartData.push(chartPoint);
    });

    console.log("Chart Data", chartData);
    return chartData;
  }
};

const getPeriodData = (period) => {
  switch (period) {
    case "week":
      return formatWeek();
    case "month":
      return formatMonth();
    case "year":
      return formatYear();
    case "all":
      return formatAll();
    default:
      break;
  }
};

const formatWeek = () => {
  let periodLabel = [];
  let periodDates = [];
  for (let index = 6; index >= 0; index--) {
    let day = moment().subtract(index, "days").format("YYYY-MM-DD");
    periodDates.push(day);
    let dayLabel = moment().subtract(index, "days").format("ddd");
    periodLabel.push(dayLabel);
  }
  return { periodLabel, periodDates };
};

const formatMonth = () => {
  let periodLabel = [];
  let periodDates = [];

  let days = calculateMonth();

  let startOfMonth = moment().startOf("month");
  let dayPeriods = getMonthDatePeriod(startOfMonth, days);
  let currentDate = moment();
  periodDates.push(startOfMonth);

  let period = Math.floor(days / 7);
  let index = 4;
  let count = 1;

  for (index; index > 0; index--) {
    let monthLabels = `Week ${count++}`;
    periodLabel.push(monthLabels);

    let monthDates = moment()
      .subtract(index * period, "days")
      .format("YYYY-MM-DD");
    periodDates.push(monthDates);
  }
  periodDates.push(currentDate);
  console.log("Period Dates", periodDates);
  return { periodLabel, periodDates };
};

const getMonthDatePeriod = (dayOfWeek, days) => {
  // let loopDays = days;
  // let periodDays = [];
  // const date = moment(dayOfWeek); // Thursday Feb 2015
  // let weekOne = 8 - date.day();
  // periodDays.push(weekOne);
  // for (let i = 0; i < loopDays; i + 7) {
  //   days = days - 7;
  //   periodDays.push(7);
  //   console.log(days);
  // }
  // periodDays.push(days);
  // console.log('Period Days Split in weeks', periodDays);
};

const formatYear = () => {
  let year = [];
  for (let index = 5; index >= 0; index--) {
    let month = moment().subtract(index, "months").format("MMM");
    year.push(month);
  }
  return year;
};

const formatAll = () => {
  let year = [];
  for (let index = 5; index >= 0; index--) {
    let month = moment().subtract(index, "years").format("YYYY");
    year.push(month);
  }
  return year;
};

//Helper Functions
const groupByIndex = (budgetData, key) => {
  var data = budgetData,
    result = data.reduce(function (r, a) {
      r[a[key]] = r[a[key]] || [];
      delete a.user;
      r[a[key]].push(a);
      return r;
    }, Object.create(null));

  return result;
};
