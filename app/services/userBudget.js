import CoreServices from "./coreServices";
import { USER_BUDGET } from "../constants";

class UserBudget extends CoreServices {}

export default new UserBudget(USER_BUDGET.BASE);
