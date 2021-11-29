import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FinanceDetails from "../FinanseDetails/FinanceDetails";
import { groupDataByIndex } from "../../utils/budgetFunctions";

function GroupByUser(props) {
  const { financeData, highlight, color, linkedUserInfos, title } = props;

  return (
    <>
      {linkedUserInfos.length != 0 &&
        linkedUserInfos?.map((person) => {
          if (financeData[person.id])
            return (
              <FinanceDetails
                key={person.id}
                financeData={financeData[person.id]}
                title={
                  linkedUserInfos.length == 1
                    ? title
                    : `${person.firstName} ${person.lastName}`
                }
                highlight={highlight}
                color={color}
              />
            );
        })}
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
