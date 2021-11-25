import * as Types from "../actionTypes";

const initialState = {
  userTheme: "light",
};

const theme = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER_THEME:
      return { userTheme: action.value };
  }
  return state;
};

export default theme;
