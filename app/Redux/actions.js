import * as Types from "./actionTypes";

export const setLoader = (payload) => ({
  type: Types.SET_LOADER,
  value: payload,
});

export const setRefresh = (payload) => ({
  type: Types.SET_REFRESH,
  value: payload,
});

export const setCurrency = (payload) => ({
  type: Types.SET_CURRENCY,
  value: payload,
});

export const setUser = (payload) => ({
  type: Types.SET_USER,
  value: payload,
});

export const setUserInfo = (payload) => ({
  type: Types.SET_USER_INFO,
  value: payload,
});

export const setLinkedUsers = (payload) => ({
  type: Types.SET_LINKED_USERS,
  value: payload,
});

export const setUserInvites = (payload) => ({
  type: Types.SET_USER_INVITES,
  value: payload,
});

export const setUserCategories = (payload) => ({
  type: Types.SET_USER_CATEGORIES,
  value: payload,
});

export const setUserTheme = (payload) => ({
  type: Types.SET_USER_THEME,
  value: payload,
});

export const setLinkedUserInfos = (payload) => ({
  type: Types.SET_LINKED_USER_INFOS,
  value: payload,
});

export const setSummaryChart = (payload) => ({
  type: Types.SET_SUMMARY_CHART,
  value: payload,
});
