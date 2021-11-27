import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FinanceDetails from "../FinanseDetails/FinanceDetails";
// import * as actions from "../../Redux/actions";
import { groupDataByIndex } from "../../utils/budgetFunctions";

function GroupByUser(props) {
  const { financeData, highlight, color, linkedUserInfos, title } = props;
  const [userGroup, setUserGroup] = useState({});
  useEffect(() => {
    try {
      let result = groupDataByIndex(financeData, "user");
      setUserGroup(result);
      console.log("Result", result);
      console.log("Linked User", linkedUserInfos);
      if (linkedUserInfos.length != 0) {
        linkedUserInfos?.forEach((person) => {
          console.log("Person", person);
          console.log("User Data", result[person.id]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {linkedUserInfos.length != 0 &&
        linkedUserInfos?.map((person) => (
          <FinanceDetails
            key={person.id}
            financeData={userGroup[person.id]}
            title={
              linkedUserInfos.length == 1
                ? title
                : `${person.firstName} ${person.lastName}`
            }
            highlight={highlight}
            color={color}
          />
        ))}
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
  //   setCurrency: (value) => dispatch(actions.setCurrency(value)),
  //   setUser: (value) => dispatch(actions.setUser(value)),
  //   setUserInfo: (value) => dispatch(actions.setUserInfo(value)),
  //   setUserCategories: (value) => dispatch(actions.setUserCategories(value)),
  //   setLinkedUsers: (value) => dispatch(actions.setLinkedUsers(value)),
  //   setUserInvites: (value) => dispatch(actions.setUserInvites(value)),
  //   setLoader: (value) => dispatch(actions.setLoader(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupByUser);
