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

  // console.log("User Data", data);
  // await save("user_data", JSON.stringify(data));
  // let result = await SecureStore.getItemAsync("user_data");
  // if (result) {
  //   return JSON.parse(result);
  // } else {
  //   return false;
  // }
}

const getRawLinkedUsers = (users) => {
  let linkedUsers = [];
  users.map((user) => {
    linkedUsers.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userInfo: user.userInfo,
    });
  });

  return linkedUsers;
};

export async function getLinkedUsers() {
  let user = await getMyData();
  let users = [user.id];
  user?.linkedUsers.forEach((person) => {
    users.push(person._id);
  });
  return users;
}
/// Tokens
// token
