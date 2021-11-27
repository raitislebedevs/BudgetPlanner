import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FinanceDetails from "../FinanseDetails/FinanceDetails";
import * as actions from "../../Redux/actions";
import userInfoServices from "../../services/userInfoServices";
import { groupDataByIndex } from "../../utils/budgetFunctions";

function GroupByUser(props) {
  const { financeData, title, highlight, color, linkedUsers, linkedUserInfos } =
    props;
  const [userGroup, setUserGroup] = useState([]);
  useEffect(() => {
    try {
      // console.log("Linked Userinfo", linkedUserInfos);
      // setUserGroup(groupDataByIndex(financeData, "user"));
      // console.log(userGroup);
    } catch (error) {}
  });

  return (
    <>
      {/* {linkedUserInfos?.forEach((element) => { */}
      <FinanceDetails
        financeData={financeData}
        title={title}
        highlight={highlight}
        color={color}
      />
      {/* })} */}
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state?.loader.isLoading,
  localCurrency: state.user?.currrency,
  linkedUsers: state.user?.linkedUsers,
  linkedUserInfos: state?.user?.linkedUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (value) => dispatch(actions.setCurrency(value)),
  setUser: (value) => dispatch(actions.setUser(value)),
  setUserInfo: (value) => dispatch(actions.setUserInfo(value)),
  setUserCategories: (value) => dispatch(actions.setUserCategories(value)),
  setLinkedUsers: (value) => dispatch(actions.setLinkedUsers(value)),
  setUserInvites: (value) => dispatch(actions.setUserInvites(value)),
  setLoader: (value) => dispatch(actions.setLoader(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupByUser);
