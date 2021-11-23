import * as Types from "../actionTypes";

const initialState = {
  currrency: "",
  user: {},
  userInfo: {},
  linkedUsers: [],
  userInvites: [],
  categories: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENCY:
      return { ...state, currrency: action.value };
    case Types.SET_USER:
      return { ...state, user: action.value };
    case Types.SET_USER_INFO:
      return { ...state, userInfo: action.value };
    case Types.SET_LINKED_USERS:
      return { ...state, linkedUsers: action.value };
    case Types.SET_USER_INVITES:
      return { ...state, userInvites: action.value };
    case Types.SET_USER_CATEGORIES:
      return { ...state, categories: action.value };
  }
  return state;
};

export default user;
