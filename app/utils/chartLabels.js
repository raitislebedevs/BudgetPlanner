import moment from "moment";

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
            id: item.id,
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
      return formatAll();
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
  try {
    let periodLabel = [];
    let periodDates = [];

    let dayPeriods = getMonthDatePeriod();
    let addDays = 0;
    for (var i = 0; i < dayPeriods.length; i++) {
      let monthLabels = `Week ${i + 1}`;
      periodLabel.push(monthLabels);

      let monthPeriod = moment()
        .startOf("month")
        .add(addDays, "days")
        .format("YYYY-MM-DD");
      periodDates.push(monthPeriod);
      addDays = addDays + dayPeriods[i];
    }

    let monthPeriod = moment()
      .startOf("month")
      .add(addDays - 1, "days")
      .format("YYYY-MM-DD");
    periodDates.push(monthPeriod);

    // console.log("Period Dates", periodDates);
    return { periodLabel, periodDates };
  } catch (error) {
    console.log(error);
  }
};

const formatYear = () => {
  try {
    let periodLabel = [];
    let periodDates = [];
    let yearPeriod = getYearDatePeriod();

    for (let i = 0; i < yearPeriod.length; i++) {
      let monthLabel = moment().startOf("year").add(i, "months").format("MMM");

      periodLabel.push(monthLabel);

      let monthDate = moment()
        .startOf("year")
        .add(i, "months")
        .format("YYYY-MM-DD");
      periodDates.push(monthDate);
    }
    return { periodLabel, periodDates };
  } catch (error) {
    console.log("Format Year Error", error);
  }
};

const formatAll = () => {
  try {
    let periodLabel = [];
    let periodDates = [];

    for (let i = 5; i >= 0; i--) {
      let monthLabel = moment()
        .startOf("year")
        .subtract(i - 1, "years")
        .format("YYYY");

      periodLabel.push(monthLabel);

      let monthDate = moment()
        .endOf("year")
        .subtract(i, "years")
        .format("YYYY-MM-DD");
      periodDates.push(monthDate);
    }
    delete periodLabel[6];
    // console.log(periodDates, periodLabel);
    return { periodLabel, periodDates };
  } catch (error) {}
};

const getMonthDatePeriod = () => {
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

const getYearDatePeriod = () => {
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

const getAllDatePeriod = () => {
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
