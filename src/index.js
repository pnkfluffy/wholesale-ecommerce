import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";

axios
  .get("/auth/user")
  .then((res) => {
    store.dispatch({ type: "GET_USER", payload: res.data });
    store.dispatch({ type: "APP_LOADED" });
  })
  .catch((err) => {
    store.dispatch({ type: "APP_LOADED" });
    console.log(err);
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
