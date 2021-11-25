import { randomColor } from "./standaloneFunctions";

export const incomeCategory = (t) => {
  return [
    {
      label: t.IncomeCategories.income,
      value: t.IncomeCategories.income,
      icon: "wallet",
      color: randomColor(),
      items: [
        {
          label: t.IncomeCategories.salary,
          value: t.IncomeCategories.salary,
          icon: "wallet",
          color: randomColor(),
        },
        {
          label: t.IncomeCategories.gifts,
          value: t.IncomeCategories.gifts,
          icon: "gift-outline",
          color: randomColor(),
        },
        {
          label: t.IncomeCategories.school,
          value: t.IncomeCategories.school,
          icon: "school-outline",
          color: randomColor(),
        },
        {
          label: t.IncomeCategories.others,
          value: t.IncomeCategories.others,
          icon: "alien",
          color: randomColor(),
        },
      ],
    },
    {
      label: t.IncomeCategories.savings,
      value: t.IncomeCategories.savings,
      icon: "chart-bell-curve-cumulative",
      color: randomColor(),
      items: [
        {
          label: t.IncomeCategories.kids,
          icon: "human-child",
          value: t.IncomeCategories.kids,
          color: randomColor(),
        },
        {
          label: t.IncomeCategories.vacation,
          value: t.IncomeCategories.vacation,
          icon: "island",
          color: randomColor(),
        },
        {
          label: t.IncomeCategories.others,
          value: t.IncomeCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.IncomeCategories.investment,
      value: t.IncomeCategories.investment,
      icon: "cash",
      color: randomColor(),
      items: [
        {
          label: t.IncomeCategories.markets,
          value: t.IncomeCategories.markets,
          icon: "finance",
          color: randomColor(),
        },
        {
          label: t.IncomeCategories.realEstate,
          value: t.IncomeCategories.realEstate,
          icon: "home-group",
          color: randomColor(),
        },
        {
          label: t.IncomeCategories.others,
          value: t.IncomeCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.IncomeCategories.others,
      value: t.IncomeCategories.others,
      icon: "alien",
      color: randomColor(),
      items: [
        {
          label: t.IncomeCategories.others,
          value: t.IncomeCategories.others,
          color: randomColor(),
        },
      ],
    },
  ];
};

export const expenseCategory = (t) => {
  return [
    {
      label: t.ExpenseCategories.housing,
      value: t.ExpenseCategories.housing,
      icon: "home",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.rent,
          value: t.ExpenseCategories.rent,
          icon: "currency-usd",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.mortgage,
          value: t.ExpenseCategories.mortgage,
          icon: "credit-card-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.mobile,
          value: t.ExpenseCategories.mobile,
          icon: "cellphone-basic",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.internet,
          value: t.ExpenseCategories.internet,
          icon: "web",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.furnitures,
          value: t.ExpenseCategories.furnitures,
          icon: "seat-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.electricity,
          value: t.ExpenseCategories.electricity,
          icon: "lightning-bolt",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.heating,
          value: t.ExpenseCategories.heating,
          icon: "fire",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.utilities,
          value: t.ExpenseCategories.utilities,
          icon: "trash-can-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.householdGoods,
          value: t.ExpenseCategories.householdGoods,
          icon: "silverware-clean",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.ExpenseCategories.food,
      value: t.ExpenseCategories.food,
      icon: "food",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.grainCrops,
          value: t.ExpenseCategories.grainCrops,
          icon: "barley",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.vegitables,
          value: t.ExpenseCategories.vegitables,
          icon: "pickaxe",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.milkProducts,
          value: t.ExpenseCategories.milkProducts,
          icon: "cow",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.confectionery,
          value: t.ExpenseCategories.confectionery,
          icon: "instrument-triangle",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.greensSalad,
          value: t.ExpenseCategories.greensSalad,
          icon: "tree-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.nutsSeeds,
          value: t.ExpenseCategories.nutsSeeds,
          icon: "peanut",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.teaCoffee,
          value: t.ExpenseCategories.teaCoffee,
          icon: "coffee-maker",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.fishMeetEggs,
          value: t.ExpenseCategories.fishMeetEggs,
          icon: "fish",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.sweetsSnaks,
          value: t.ExpenseCategories.sweetsSnaks,
          icon: "shaker",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.drinks,
          value: t.ExpenseCategories.drinks,
          icon: "spoon-sugar",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.restaurants,
          value: t.ExpenseCategories.restaurants,
          icon: "food-steak",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.drinks,
          value: t.ExpenseCategories.drinks,
          icon: "bottle-soda-classic-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.junkFood,
          value: t.ExpenseCategories.junkFood,
          icon: "food",
          color: randomColor(),
        },

        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          icon: "help",
          color: randomColor(),
        },
      ],
    },
    {
      label: t.ExpenseCategories.transport,
      value: t.ExpenseCategories.transport,
      icon: "car",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.busTaxi,
          value: t.ExpenseCategories.busTaxi,
          icon: "taxi",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.gasElectricity,
          value: t.ExpenseCategories.gasElectricity,
          icon: "gas-station-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.insurance,
          value: t.ExpenseCategories.insurance,
          icon: "shield-car",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.tax,
          value: t.ExpenseCategories.tax,
          icon: "cash-register",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.maintaince,
          value: t.ExpenseCategories.maintaince,
          icon: "hammer-wrench",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.ExpenseCategories.health,
      value: t.ExpenseCategories.health,
      icon: "hospital",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.doxtorVisits,
          value: t.ExpenseCategories.doxtorVisits,
          icon: "doctor",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.medicine,
          value: t.ExpenseCategories.medicine,
          icon: "needle",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.vitaminsMinerals,
          value: t.ExpenseCategories.vitaminsMinerals,
          icon: "pill",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.physiotherapy,
          value: t.ExpenseCategories.physiotherapy,
          icon: "yoga",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.insurance,
          value: t.ExpenseCategories.insurance,
          icon: "credit-card-settings-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.hospital,
          value: t.ExpenseCategories.hospital,
          icon: "hospital-building",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.ExpenseCategories.freeTime,
      value: t.ExpenseCategories.freeTime,
      icon: "airplane",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.hobbies,
          value: t.ExpenseCategories.hobbies,
          icon: "run",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.spontanious,
          value: t.ExpenseCategories.spontanious,
          icon: "passport",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.travels,
          value: t.ExpenseCategories.travels,
          icon: "train-car",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.gym,
          value: t.ExpenseCategories.gym,
          icon: "weight-lifter",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.movies,
          value: t.ExpenseCategories.movies,
          icon: "filmstrip-box-multiple",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.ExpenseCategories.family,
      value: t.ExpenseCategories.family,
      icon: "baby-carriage",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.cloth,
          value: t.ExpenseCategories.cloth,
          icon: "redhat",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.pocketMoney,
          value: t.ExpenseCategories.pocketMoney,
          icon: "cash-multiple",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.education,
          value: t.ExpenseCategories.education,
          icon: "school-outline",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.sports,
          value: t.ExpenseCategories.sports,
          icon: "basketball",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.ExpenseCategories.charity,
      value: t.ExpenseCategories.charity,
      icon: "charity",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.charities,
          value: t.ExpenseCategories.charities,
          icon: "hand-heart",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.friends,
          value: t.ExpenseCategories.friends,
          icon: "human-greeting",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.organisation,
          value: t.ExpenseCategories.organisation,
          icon: "office-building",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.church,
          value: t.ExpenseCategories.church,
          icon: "church",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          color: randomColor(),
        },
      ],
    },
    {
      label: t.ExpenseCategories.others,
      value: t.ExpenseCategories.others,
      icon: "alien",
      color: randomColor(),
      items: [
        {
          label: t.ExpenseCategories.family,
          value: t.ExpenseCategories.family,
          icon: "human-male-male",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.friends,
          value: t.ExpenseCategories.friends,
          icon: "human",
          color: randomColor(),
        },
        {
          label: t.ExpenseCategories.others,
          value: t.ExpenseCategories.others,
          color: randomColor(),
        },
      ],
    },
  ];
};
