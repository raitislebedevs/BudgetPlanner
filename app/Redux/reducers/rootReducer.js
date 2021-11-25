import { combineReducers } from "redux";
import loader from "./loader";
import user from "./user";
import theme from "./theme";

const rootReducer = combineReducers({
  loader,
  user,
  theme,
});

export default rootReducer;
