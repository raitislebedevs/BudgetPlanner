// import * as moment from "node_modules/moment/moment";

export const formatNumber = (num, currency) => {
  if (num) {
    return `${currency || "$"} ${num
      ?.toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

  return "";
};

export const formatPhoneNumber = (phone) => {
  if (phone)
    return phone
      ?.toString()
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{3})/g, "$1 ")
      .trim();

  return "";
};

export const getDayCount = (inputDate) => {
  let inputTime = new Date(inputDate);
  return Math.floor((new Date() - inputTime) / (1000 * 60 * 60 * 24));
};

export const getExpiryCount = (inputDate) => {
  let inputTime = new Date(inputDate);
  return Math.floor((inputTime - new Date()) / (1000 * 60 * 60 * 24));
};

export const cleanObject = (obj) => {
  let propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    var propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

// export const formatMonth = (date, t) => {
//   let year = moment(Date.parse(date)).format("YYYY");
//   let month = t(`common:month.${moment(Date.parse(date)).format("MMM")}`);
//   return `${year} ${month}`;
// };

// export const formatYear = (date) => {
//   let year = moment(Date.parse(date)).format("YYYY");
//   return `${year}`;
// };

// export const formatDate = (date, t) => {
//   let year = moment(Date.parse(date)).format("YYYY");
//   let days = moment(Date.parse(date)).format("DD");
//   let month = t(`common:month.${moment(Date.parse(date)).format("MMM")}`);
//   return `${year} ${month} ${days}`;
// };

// export const addDays = (date, days) => {
//   if (!days) {
//     return "-";
//   }
//   var result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return moment(result).format("YYYY-MM-DD");
// };

export const referralCode = () => {
  return "xxxxxxx-xxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const itemColumnSize = (items) => {
  return items?.length === 1 ? 6 : 8;
};

export const textColumnSize = (items) => {
  return items?.length === 1 ? 6 : 4;
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const upperCaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPosition = (string, subString, index) => {
  return string.split(subString, index).join(subString).length;
};
