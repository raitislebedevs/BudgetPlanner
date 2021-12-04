import * as Types from "../actionTypes";

const initialState = {
  userTheme: "light",
  summaryChart: "default",
};

const theme = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER_THEME:
      return { userTheme: action.value };
    case Types.SET_SUMMARY_CHART:
      return { summaryChart: action.value };
  }
  return state;
};

export default theme;
