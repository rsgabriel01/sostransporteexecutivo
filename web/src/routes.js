import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Main from "./pages/Main";
import Remember from "./pages/ForgotPassword";
import User from "./pages/User";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/main" component={Main} />
        <Route path="/remember" component={Remember} />
        <Route path="/User" component={User} />
      </Switch>
    </BrowserRouter>
  );
}
