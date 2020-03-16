import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter, Switch } from "react-router-dom";

ReactDom.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.querySelector("#root")
);
