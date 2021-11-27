import { useState } from "react";
import currencyServices from "../services/currencyServices";

export const handleGetCurrencies = async () => {
  try {
    const emptyValue = {
      fullValue: {},
      label: "Currency",
      value: "",
    };

    let filter = { _limit: 200, _sort: "popularity:desc" };

    let { data, error } = await currencyServices.FIND(filter);

    if (data) {
      data = data.map((item) => ({
        value: item.id,
        label: `${item.name} - ${item.symbol}`,
        symbol: item.symbol,
        key: item.id,
      }));
      data = [emptyValue, ...data];
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
