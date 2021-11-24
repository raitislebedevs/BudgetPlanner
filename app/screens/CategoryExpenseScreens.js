import React from "react";
import CategoryScreen from "../components/CategoryScreen/CategoryScreen";
import { expenseCategory } from "../utils/categoryItems";

function CategoryExpenseScreens({ navigation }) {
  const categories = expenseCategory();

  return (
    <CategoryScreen
      navigation={navigation}
      type={"expensCategory"}
      defaultCategories={categories}
    />
  );
}

export default CategoryExpenseScreens;
