import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Home from "./pages/Home";
import Remember from "./pages/ForgotPassword";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/home" component={Home} />
        <Route path="/remember" component={Remember} />
      </Switch>
    </BrowserRouter>
  );
}
