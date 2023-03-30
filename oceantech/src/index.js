import React from "react";
import App from "./app/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./app/app.scss";
import { Provider } from "react-redux";
import store from "app/redux/Store";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
