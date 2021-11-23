import * as Types from "./actionTypes";

export const setLoader = (payload) => ({
  type: Types.SET_LOADER,
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
