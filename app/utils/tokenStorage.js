import * as SecureStore from "expo-secure-store";
import userInfoServices from "../services/userInfoServices";
import userServices from "../services/userServices";

export async function save(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteToken(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return false;
  }
}

export async function getMyData() {
  try {
    const user = await getUser();
    const { data } = await getUserInfo(user?.data.userInfo);
    data.userId = user?.data?.id;
    return data;
  } catch (error) {}
  return null;
}

export async function getLinkedUsers() {
  let user = await getMyData();
  let users = [user.userId];
  user?.linkedUsers.forEach((person) => {
    users.push(person._id);
  });
  return users;
}

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
