import React from "react";
import CategoryScreen from "../components/CategoryScreen/CategoryScreen";
import { incomeCategory } from "../utils/categoryItems";

function CategoryIncomeScreen({ navigation }) {
  const categories = incomeCategory();

  return (
    <CategoryScreen
      navigation={navigation}
      type={"incomeCategory"}
      defaultCategories={categories}
    />
  );
}

export default CategoryIncomeScreen;
