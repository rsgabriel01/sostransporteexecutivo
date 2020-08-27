import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Main from "./pages/Main";
import Remember from "./pages/ForgotPassword";
import User from "./pages/User";
import Solicitation from "./pages/Solicitation";
import Person from "./pages/Person";
import Client from "./pages/Client";
import Driver from "./pages/Driver";
import Vehicles from "./pages/Vehicles";
import ReportsOsFinished from "./pages/ReportsOsFinished";

import Loading from "./pages/components/Loading/Loading";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/main" component={Main} />
        <Route path="/remember" component={Remember} />
        <Route path="/user" component={User} />
        <Route path="/solicitation" component={Solicitation} />
        <Route path="/people/person" component={Person} />
        <Route path="/people/client" component={Client} />
        <Route path="/people/driver" component={Driver} />
        <Route path="/Vehicles" component={Vehicles} />
        <Route path="/reports/os/finished" component={ReportsOsFinished} />
        <Route path="/loading" component={Loading} />
      </Switch>
    </BrowserRouter>
  );
}
