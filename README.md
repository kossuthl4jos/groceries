The aim of the project is create a simple groceries app, which can hold multiple grocery lists, where each list consists of items to be purchased, and items already purchased by someone. The price for the purchase can be also recorded.

To use the app you need to register a user with username and password.
The password is stored in the local storage, or through a custom backend anywhere you like, but make sure you don't pick your favourite one.

Works best with Chrome.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environmental variables

Store your variables in a `.env` file, they'll be parsed when the application is compiled.
`NODE_ENV` => "development"
`WEBPACK_PORT` => the port for this application

`BACKEND` => "remote" or "local"
If you choose "local" all data will be saved to the local storage. This is when you don't want or need to bother with a backend
If you choose "remote", `REMOTE_BACKEND_HOST` will also be important as this app will make the calls to this URL.

If you want to try the backend version, you can clone this repo:
https://github.com/kossuthl4jos/groceries-backend

Just run it locally (like `http://localhost:3001`) and specify the `REMOTE_BACKEND_HOST` to match it `REMOTE_BACKEND_HOST = http://localhost:3001`


`REMOTE_BACKEND_HOST` => the host for the backend application serving this app

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

### `npm test`
### `npm test:watch`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
