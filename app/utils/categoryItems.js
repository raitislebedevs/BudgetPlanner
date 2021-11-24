import { randomColor } from "./standaloneFunctions";

export const incomeCategory = () => {
  return [
    {
      label: "Income",
      value: "Income",
      icon: "wallet",
      color: randomColor(),
      items: [
        {
          label: "Salary",
          value: "Salary",
          icon: "wallet",
          color: randomColor(),
        },
        {
          label: "Gifts",
          value: "Gifts",
          icon: "gift-outline",
          color: randomColor(),
        },
        {
          label: "Scholarships",
          value: "Scholarships",
          icon: "school-outline",
          color: randomColor(),
        },
        {
          label: "Others",
          value: "Others",
          icon: "alien",
          color: randomColor(),
        },
      ],
    },
    {
      label: "Savings",
      value: "Savings",
      icon: "chart-bell-curve-cumulative",
      color: randomColor(),
      items: [
        { label: "Kids", value: "Kids", color: randomColor() },
        { label: "Vacation", value: "Vacation", color: randomColor() },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Investment",
      value: "Investment",
      icon: "cash",
      color: randomColor(),
      items: [
        { label: "Markets", value: "Markets", color: randomColor() },
        { label: "Real Estate", value: "Real Estate", color: randomColor() },
        { label: "Others", value: "Others", color: randomColor() },
      ],
    },
    {
      label: "Others",
      value: "Others",
      icon: "alien",
      color: randomColor(),
      items: [{ label: "Others", value: "Others", color: randomColor() }],
    },
  ];
};

export const expenseCategory = () => {
  return [
    {
      label: "Housing",
      value: "Housing",
      icon: "home",
      color: randomColor(),
      items: [
        { label: "Rent", value: "Rent", color: randomColor() },
        { label: "Mortgage", value: "Mortgage", color: randomColor() },
        { label: "Mobile", value: "Mobile", color: randomColor() },
        { label: "Internet", value: "Internet", color: randomColor() },
        { label: "Furnitures", value: "Furnitures", color: randomColor() },
        {
          label: "Household goods",
          value: "Household goods",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Food",
      value: "Food",
      icon: "food",
      color: randomColor(),
      items: [
        { label: "Grain Crops", value: "Grain Crops", color: randomColor() },
        { label: "Vegitables", value: "Vegitables", color: randomColor() },
        {
          label: "Milk Products",
          value: "Milk Products",
          color: randomColor(),
        },
        {
          label: "Confectionery",
          value: "Confectionery",
          color: randomColor(),
        },
        {
          label: "Greens & Salad",
          value: "Greens & Salad",
          color: randomColor(),
        },
        { label: "Tea & Cofee", value: "Tea & Cofee", color: randomColor() },
        {
          label: "Fish & Meet & Eggs",
          value: "Fish & Meet & Eggs",
          color: randomColor(),
        },
        { label: "Additives", value: "Additives", color: randomColor() },
        {
          label: "Sweets & Snaks",
          value: "Sweets & Snaks",
          color: randomColor(),
        },
        {
          label: "Restaurants & Cantains",
          value: "Restaurants & Cantains",
          color: randomColor(),
        },
        { label: "Drinks", value: "Drinks", color: randomColor() },
        { label: "Junk Food", value: "Junk Food", color: randomColor() },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Transport",
      value: "Transport",
      icon: "car",
      color: randomColor(),
      items: [
        { label: "Bus & Taxi", value: "Bus & Taxi", color: randomColor() },
        {
          label: "Gas & Electricity",
          value: "Gas & Electricity",
          color: randomColor(),
        },
        { label: "Insuarence", value: "Insuarence", color: randomColor() },
        { label: "Tax", value: "Tax", color: randomColor() },
        {
          label: "Maintainances & Repairs",
          value: "Maintainances & Repairs",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Health",
      value: "health",
      icon: "hospital",
      color: randomColor(),
      items: [
        {
          label: "Doctor Visits",
          value: "Doctor Visits",
          color: randomColor(),
        },
        { label: "Medicine", value: "Medicine", color: randomColor() },
        {
          label: "Vitamins & Minerals",
          value: "Vitamins & Minerals",
          color: randomColor(),
        },
        {
          label: "Physiotherapy",
          value: "Physiotherapy",
          color: randomColor(),
        },
        { label: "Insuarance", value: "Insuarance", color: randomColor() },
        { label: "Hospital", value: "Hospital", color: randomColor() },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Free Time",
      value: "Free Time",
      icon: "airplane",
      color: randomColor(),
      items: [
        { label: "Hobbies", value: "Hobbies", color: randomColor() },
        { label: "Spontanious", value: "Spontanious", color: randomColor() },
        { label: "Travels", value: "Travels", color: randomColor() },
        { label: "Gym", value: "Gym", color: randomColor() },
        {
          label: "Cinema & Movies",
          value: "Cinema & Movies",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Family",
      value: "Family",
      icon: "baby-carriage",
      color: randomColor(),
      items: [
        { label: "Cloth", value: "Cloth", color: randomColor() },
        { label: "Pocket Money", value: "Pocket Money", color: randomColor() },
        { label: "Education", value: "Education", color: randomColor() },
        { label: "Sports", value: "Sports", color: randomColor() },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Charity",
      value: "Charity",
      icon: "charity",
      color: randomColor(),
      items: [
        { label: "Charities", value: "Charities", color: randomColor() },
        { label: "Friends", value: "Friends", color: randomColor() },
        { label: "Family", value: "Family", color: randomColor() },
        { label: "Organisation", value: "Organisation", color: randomColor() },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Other",
      value: "Other",
      icon: "alien",
      color: randomColor(),
      items: [
        { label: "Family", value: "Family", color: randomColor() },
        { label: "Friends", value: "Friends", color: randomColor() },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
  ];
};
