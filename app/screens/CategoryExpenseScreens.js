import React from "react";
import { withLocale } from "react-easy-localization";
import CategoryScreen from "../components/CategoryScreen/CategoryScreen";
import { expenseCategory } from "../utils/categoryItems";

function CategoryExpenseScreens({ navigation, i18n }) {
  const categories = expenseCategory(i18n);

  return (
    <CategoryScreen
      navigation={navigation}
      type={"expensCategory"}
      defaultCategories={categories}
    />
  );
}

export default withLocale(CategoryExpenseScreens);
