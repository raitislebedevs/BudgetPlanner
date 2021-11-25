import React from "react";
import { withLocale } from "react-easy-localization";
import CategoryScreen from "../components/CategoryScreen/CategoryScreen";
import { incomeCategory } from "../utils/categoryItems";

function CategoryIncomeScreen({ navigation, i18n }) {
  const categories = incomeCategory(i18n);

  return (
    <CategoryScreen
      navigation={navigation}
      type={"incomeCategory"}
      defaultCategories={categories}
    />
  );
}

export default withLocale(CategoryIncomeScreen);
