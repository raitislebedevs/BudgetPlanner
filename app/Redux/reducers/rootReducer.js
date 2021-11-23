import { combineReducers } from "redux";
import loader from "./loader";
import user from "./user";

const rootReducer = combineReducers({
  loader,
  user,
});

export default rootReducer;
