import CoreServices from "./coreServices";
import { BUDGET_JOURNALS } from "../constants";

class BudgetJournal extends CoreServices {}

export default new BudgetJournal(BUDGET_JOURNALS.BASE);
