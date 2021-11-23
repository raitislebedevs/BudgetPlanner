import CoreServices from "./coreServices";
import { USER_CATEGORIES } from "../constants";

class UserCategories extends CoreServices {}

export default new UserCategories(USER_CATEGORIES.BASE);
