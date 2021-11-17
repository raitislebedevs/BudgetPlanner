import userInfoServices from "../services/userInfoServices";
import userServices from "../services/userServices";

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
