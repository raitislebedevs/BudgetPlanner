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
        {
          label: "Kids",
          icon: "human-child",
          value: "Kids",
          color: randomColor(),
        },
        {
          label: "Vacation",
          value: "Vacation",
          icon: "island",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Investment",
      value: "Investment",
      icon: "cash",
      color: randomColor(),
      items: [
        {
          label: "Markets",
          value: "Markets",
          icon: "finance",
          color: randomColor(),
        },
        {
          label: "Real Estate",
          value: "Real Estate",
          icon: "home-group",
          color: randomColor(),
        },
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
        {
          label: "Rent",
          value: "Rent",
          icon: "currency-usd",
          color: randomColor(),
        },
        {
          label: "Mortgage",
          value: "Mortgage",
          icon: "credit-card-outline",
          color: randomColor(),
        },
        {
          label: "Mobile",
          value: "Mobile",
          icon: "cellphone-basic",
          color: randomColor(),
        },
        {
          label: "Internet",
          value: "Internet",
          icon: "web",
          color: randomColor(),
        },
        {
          label: "Furnitures",
          value: "Furnitures",
          icon: "seat-outline",
          color: randomColor(),
        },
        {
          label: "Electricity",
          value: "Electricity",
          icon: "lightning-bolt",
          color: randomColor(),
        },
        {
          label: "Heating",
          value: "Heating",
          icon: "fire",
          color: randomColor(),
        },
        {
          label: "Utilities",
          value: "Utilities",
          icon: "trash-can-outline",
          color: randomColor(),
        },
        {
          label: "Household goods",
          value: "Household goods",
          icon: "silverware-clean",
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
        {
          label: "Grain Crops",
          value: "Grain Crops",
          icon: "barley",
          color: randomColor(),
        },
        {
          label: "Vegitables",
          value: "Vegitables",
          icon: "pickaxe",
          color: randomColor(),
        },
        {
          label: "Milk Products",
          value: "Milk Products",
          icon: "cow",
          color: randomColor(),
        },
        {
          label: "Confectionery",
          value: "Confectionery",
          icon: "instrument-triangle",
          color: randomColor(),
        },
        {
          label: "Greens & Salad",
          value: "Greens & Salad",
          icon: "tree-outline",
          color: randomColor(),
        },
        {
          label: "Nuts & Seeds",
          value: "Nuts & Seeds",
          icon: "peanut",
          color: randomColor(),
        },
        {
          label: "Tea & Cofee",
          value: "Tea & Cofee",
          icon: "coffee-maker",
          color: randomColor(),
        },
        {
          label: "Fish & Meet & Eggs",
          value: "Fish & Meet & Eggs",
          icon: "fish",
          color: randomColor(),
        },
        {
          label: "Additives",
          value: "Additives",
          icon: "shaker",
          color: randomColor(),
        },
        {
          label: "Sweets & Snaks",
          value: "Sweets & Snaks",
          icon: "spoon-sugar",
          color: randomColor(),
        },
        {
          label: "Restaurants & Cantains",
          value: "Restaurants & Cantains",
          icon: "food-steak",
          color: randomColor(),
        },
        {
          label: "Drinks",
          value: "Drinks",
          icon: "bottle-soda-classic-outline",
          color: randomColor(),
        },
        {
          label: "Junk Food",
          value: "Junk Food",
          icon: "food",
          color: randomColor(),
        },

        { label: "Other", value: "Other", icon: "help", color: randomColor() },
      ],
    },
    {
      label: "Transport",
      value: "Transport",
      icon: "car",
      color: randomColor(),
      items: [
        {
          label: "Bus & Taxi",
          value: "Bus & Taxi",
          icon: "taxi",
          color: randomColor(),
        },
        {
          label: "Gas & Electricity",
          value: "Gas & Electricity",
          icon: "gas-station-outline",
          color: randomColor(),
        },
        {
          label: "Insuarence",
          value: "Insuarence",
          icon: "shield-car",
          color: randomColor(),
        },
        {
          label: "Tax",
          value: "Tax",
          icon: "cash-register",
          color: randomColor(),
        },
        {
          label: "Maintainances & Repairs",
          value: "Maintainances & Repairs",
          icon: "hammer-wrench",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Health",
      value: "Health",
      icon: "hospital",
      color: randomColor(),
      items: [
        {
          label: "Doctor Visits",
          value: "Doctor Visits",
          icon: "doctor",
          color: randomColor(),
        },
        {
          label: "Medicine",
          value: "Medicine",
          icon: "needle",
          color: randomColor(),
        },
        {
          label: "Vitamins & Minerals",
          value: "Vitamins & Minerals",
          icon: "pill",
          color: randomColor(),
        },
        {
          label: "Physiotherapy",
          value: "Physiotherapy",
          icon: "yoga",
          color: randomColor(),
        },
        {
          label: "Insuarance",
          value: "Insuarance",
          icon: "credit-card-settings-outline",
          color: randomColor(),
        },
        {
          label: "Hospital",
          value: "Hospital",
          icon: "hospital-building",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Free Time",
      value: "Free Time",
      icon: "airplane",
      color: randomColor(),
      items: [
        {
          label: "Hobbies",
          value: "Hobbies",
          icon: "run",
          color: randomColor(),
        },
        {
          label: "Spontanious",
          value: "Spontanious",
          icon: "passport",
          color: randomColor(),
        },
        {
          label: "Travels",
          value: "Travels",
          icon: "train-car",
          color: randomColor(),
        },
        {
          label: "Gym",
          value: "Gym",
          icon: "weight-lifter",
          color: randomColor(),
        },
        {
          label: "Cinema & Movies",
          value: "Cinema & Movies",
          icon: "filmstrip-box-multiple",
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
        {
          label: "Cloth",
          value: "Cloth",
          icon: "redhat",
          color: randomColor(),
        },
        {
          label: "Pocket Money",
          value: "Pocket Money",
          icon: "cash-multiple",
          color: randomColor(),
        },
        {
          label: "Education",
          value: "Education",
          icon: "school-outline",
          color: randomColor(),
        },
        {
          label: "Sports",
          value: "Sports",
          icon: "basketball",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Charity",
      value: "Charity",
      icon: "charity",
      color: randomColor(),
      items: [
        {
          label: "Charities",
          value: "Charities",
          icon: "hand-heart",
          color: randomColor(),
        },
        {
          label: "Friends",
          value: "Friends",
          icon: "human-greeting",
          color: randomColor(),
        },
        {
          label: "Family",
          value: "Family",
          icon: "human-pregnant",
          color: randomColor(),
        },
        {
          label: "Organisation",
          value: "Organisation",
          icon: "office-building",
          color: randomColor(),
        },
        {
          label: "Church",
          value: "Church",
          icon: "church",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
    {
      label: "Other",
      value: "Other",
      icon: "alien",
      color: randomColor(),
      items: [
        {
          label: "Family",
          value: "Family",
          icon: "human-male-male",
          color: randomColor(),
        },
        {
          label: "Friends",
          value: "Friends",
          icon: "human",
          color: randomColor(),
        },
        { label: "Other", value: "Other", color: randomColor() },
      ],
    },
  ];
};
