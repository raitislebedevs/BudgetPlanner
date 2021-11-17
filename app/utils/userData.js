import * as SecureStore from "expo-secure-store";
import userInfoServices from "../services/userInfoServices";
import userServices from "../services/userServices";

export const save = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const deleteToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

export const getValueFor = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return false;
  }
};

export const getMyData = async () => {
  try {
    const user = await getUser();
    const { data } = await getUserInfo(user?.data.userInfo);
    data.userId = user?.data?.id;
    return data;
  } catch (error) {}
  return null;
};

export const getLinkedUsers = async () => {
  let user = await getMyData();
  let users = [user.userId];
  user?.linkedUsers.forEach((person) => {
    users.push(person._id);
  });
  return users;
};

async function getUser() {
  let user = await userServices.GET_ME();
  return user;
}

async function getUserInfo(id) {
  let user = await userInfoServices.GET(id);
  return user;
}

async function getUserId() {
  let user = await userServices.GET_ME();
  return user?.data?.id;
}
