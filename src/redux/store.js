import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import reducer from "./index";

const preloadedState = {};
const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares)
);

export default store;
