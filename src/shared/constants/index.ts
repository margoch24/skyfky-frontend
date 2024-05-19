import { FiltersBlockProps, FiltersType } from "common/types";
import { FilterNumberRange } from "components/wrappers/FilterNumberRange";
import { FilterToggleOptionsList } from "components/wrappers/FilterToggleOptionsList";
import { FC } from "react";

export const MAX_CHILD_AGE = 17;
export const MIN_ADULT_AGE = 18;
export const TOTAL_SEATS_AMOUNT = 30;
export const DEFAULT_LIMIT = 20;

export enum CurrencyEnum {
  EUR = "EUR",
  USD = "USD",
}

export const CurrencyToSign: { [key: string]: string } = {
  [CurrencyEnum.EUR]: "€",
  [CurrencyEnum.USD]: "$",
};

export const CURRENCIES = [
  {
    value: CurrencyEnum.EUR,
    label: CurrencyToSign[CurrencyEnum.EUR],
    default: true,
  },
  {
    value: CurrencyEnum.USD,
    label: CurrencyToSign[CurrencyEnum.USD],
  },
];

export enum PagePath {
  Home = "/",
  Login = "/login",
  Register = "/register",
  Account = "/account",
  CreateFlight = "/create-flight",
  CreateReview = "/create-review",
  Flight = "/flight",
  CreateTicket = "/create-ticket",
  Flights = "/flights",
  About = "/about",
  ContactUs = "/contact-us",
  All = "*",
}

export enum ButtonTheme {
  Dark = "dark",
  Light = "light",
  Transparent = "transparent",
}

export const HeaderLinks = [
  {
    title: "Home",
    path: PagePath.Home,
  },
  {
    title: "About",
    path: PagePath.About,
  },
  {
    title: "Flights",
    path: PagePath.Flights,
  },
  {
    title: "Contact Us",
    path: PagePath.ContactUs,
  },
];

export const FooterLinks = [
  {
    title: "Terms & Conditions",
    path: "/terms-conditions",
  },
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
  },
];

export const StatisticsData = [
  {
    key: "Planes",
    value: 300,
  },
  {
    key: "Employees",
    value: 4000,
  },
  {
    key: "Years of Experience",
    value: 10,
  },
  {
    key: "Countries",
    value: 70,
  },
];

export const FilterBlockTypeToComponentMap: {
  [key in string]: FC<FiltersBlockProps>;
} = {
  [FiltersType.NumberRange]: FilterNumberRange,
  [FiltersType.ToggleOptionsList]: FilterToggleOptionsList,
};
