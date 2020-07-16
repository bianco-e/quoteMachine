import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./views/App";
import AddQuote from "./views/AddQuote";

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <App />} />
      <Route exact path="/nuevacita" render={() => <AddQuote />} />
    </BrowserRouter>
  );
};

export default Router;
