# Basic currency converter

Web application that allows users to convert currencies and view historical currency exchange rates.
It was developed as part of a frontend developer test assignment.

## Features

### Converter

- Users can input an amount in one currency and select both the source currency and the desired target currency.

### Historical currency table

- Users can view historical currency exchange rates for a specific date.

- Users can select a base currency from a dropdown menu or by clicking on a row with desirable currency in the table.

- Users can sort the table by clicking on the headers.

## Running locally

1. Install dependencies

2. Get a key on [API site](https://apilayer.com/marketplace/exchangerates_data-api)

3. Set your API Access Key in `.env` like it is shown in `.env.example`

4. Start development server

### Development server

Server with hot reload at `http://localhost:3000/`

```
npm run start
```

### Production build

```
npm run build
```

## Tools

- [Webpack](https://webpack.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [PostCss](https://postcss.org/)
- [Eslint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Prettier](https://prettier.io/)
- [Lint-staged](https://github.com/okonet/lint-staged)
