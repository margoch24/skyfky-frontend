import { FiltersBlockProps, FiltersType, QueryType } from "common/types";

export enum CabinClassEnum {
  Economy = "economy",
  Business = "business",
  First = "first",
}

export const CABIN_CLASSES = [
  {
    value: CabinClassEnum.First,
    label: "First",
    rows: 5,
    firstRowIndex: 0,
  },
  {
    value: CabinClassEnum.Business,
    label: "Business",
    rows: 10,
    firstRowIndex: 5,
  },
  {
    value: CabinClassEnum.Economy,
    label: "Economy",
    rows: 15,
    firstRowIndex: 15,
  },
];

export const SCHEDULED = [
  {
    value: "once",
    label: "Once",
  },
  {
    value: "daily",
    label: "Daily",
  },

  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
];

export const CabinClassColors: { [key: string]: string } = {
  [CabinClassEnum.Business]: "#90A76A",
  [CabinClassEnum.Economy]: "#3590E3",
  [CabinClassEnum.First]: "#B94AD4",
};

export const FILTERS: FiltersBlockProps[] = [
  {
    queryKey: "price",
    title: "Price",
    type: FiltersType.NumberRange,
    values: {
      min: 1,
      max: 700,
      defaultMaxValue: 600,
      defaultMinValue: 100,
    },
  },

  {
    queryKey: "cabin_class",
    title: "Class",
    type: FiltersType.ToggleOptionsList,
    values: {
      options: [
        {
          title: "Economy",
          value: "economy",
        },
        {
          title: "Business",
          value: "business",
        },
        {
          title: "First",
          value: "first",
        },
      ],
      defaultOptions: [
        {
          title: "Economy",
          value: "economy",
        },
        {
          title: "Business",
          value: "business",
        },
        {
          title: "First",
          value: "first",
        },
      ],
    },
  },
];

export const DEFAULT_QUERY_FILTERS: QueryType = {
  cabin_class: ["economy", "business", "first"],
  price: {
    min: 100,
    max: 600,
  },
};
