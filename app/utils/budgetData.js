import moment from "moment";
import budgetJournal from "../services/budgetJournal";
import { getLinkedUsers } from "./userData";

export async function defaultValue(filter) {
  try {
    const { data } = await budgetJournal.FIND({
      _where: filter,
    });

    return data;
  } catch (error) {}

  return null;
}

export async function getBudgetData(period, activity) {
  try {
    let users = await getLinkedUsers();
    let filter = { user_in: users, activity_contains: activity };
    let count = 0;

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

    const { data } = await budgetJournal.FIND({
      _where: filter,
    });
    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
}

export const calculateWeek = () => {
  let weekDays = 7;
  let currentMonth = moment().format("M");
  let substractMonth = moment().subtract(weekDays, "d").format("M");
  if (currentMonth == substractMonth) return weekDays;
  for (var i = weekDays - 1; i > 0; i--) {
    substractMonth = moment().subtract(i, "d").format("M");
    if (currentMonth == substractMonth) return i;
  }
};

export const calculateMonth = () => {
  let currentMonth = moment();
  let startOfMonth = moment().startOf("month");
  return currentMonth.diff(startOfMonth, "days"); // =1
};

export const calculateMonthDays = () => {
  let currentMonth = moment();
  let startOfMonth = moment().endOf("month");
  return currentMonth.diff(startOfMonth, "days"); // =1
};

export const calculateYear = () => {
  let currentMonth = moment();
  let yearStartDate = moment().startOf("year");
  return currentMonth.diff(yearStartDate, "days"); // =1
};
