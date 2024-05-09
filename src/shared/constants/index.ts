export const CURRENCIES = [
  {
    value: "EUR",
    label: "€",
    default: true,
  },
  {
    value: "USD",
    label: "$",
  },
];

export enum PagePath {
  Home = "/",
  Login = "/login",
  Register = "/register",
  Account = "/account",
  CreateFlight = "/create-flight",
  CreateReview = "/create-review",
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
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Flights",
    path: "/flights",
  },
  {
    title: "Contact Us",
    path: "/contact-us",
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
