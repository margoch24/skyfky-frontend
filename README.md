# SkyFly Frontend

## Made by Marharyta Cherednychenko from EIfu-23!

The goal of this coursework is to develop a web application that facilitates the process of buying flight tickets online, providing a convenient and efficient alternative to traditional methods. <br/>
This project aims to streamline the booking process, making it accessible from the comfort of your home, and offering additional features to enhance the user experience.

In today's world, we heavily rely on gadgets and apps to simplify our daily tasks and save time. This project aligns with that trend by creating an application that allows <br/>
users to purchase flight tickets without the need to visit a physical ticket office.

## Key Features

- **User Account Management**: Users can create and manage their accounts, providing a personalized experience.
- **Flight Booking**: Users can search for and book flights easily through the application.
- **User Interaction**: The app allows users to share their thoughts, leave reviews, and contact customer support anytime.
- **Admin Capabilities**: Administrators have the ability to create flights, manage passenger information, and perform other crucial tasks.

By eliminating the need for long lines and simplifying the booking process, this application ensures a hassle-free experience for all users. <br/>
Everything from booking to customer service is made easy with our app, revolutionizing the way people purchase flight tickets.

## Images of SkyFly

#### Detailed flight page

<img src="/public/assets/flight_page.png" alt="Flight page" style="width:500px;"/>

#### Search for most suitable flight

<img src="/public/assets/flights.png" alt="Flights" style="width:500px;"/>

#### Home page

<img src="/public/assets/home_page.png" alt="Home page" style="width:500px;"/>

#### Booking tickets

<img src="/public/assets/ticket_creation.png" alt="Booking tickets" style="width:500px;"/>

#### User profile, past and future tickets pages

<img src="/public/assets/user_tickets.png" alt="User tickets" style="width:500px;"/>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
