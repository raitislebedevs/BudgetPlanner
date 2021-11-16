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
    const user = await userServices.GET_ME();
    const { data } = await userInfoServices.GET(user?.data.userInfo);
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
