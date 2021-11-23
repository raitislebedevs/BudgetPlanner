import userInfoServices from "../services/userInfoServices";
import userServices from "../services/userServices";

export async function getMyData() {
  try {
    const user = await getUser();
    const { data } = await getUserInfo(user?.data.userInfo);
    data.userId = user?.data?.id;
    data.email = user?.data?.email;

    return data;
  } catch (error) {}
  return null;
}

export async function getUserData() {
  try {
    const { data } = await getUser();
    return data;
  } catch (error) {}
  return null;
}

export async function getUserInfoData(id) {
  try {
    const { data } = await getUserInfo(id);
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
