import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Main from "./pages/Main";
import Remember from "./pages/ForgotPassword";
import MyAccount from "./pages/MyAccount";
import ServiceOrdersRequest from "./pages/ServiceOrdersRequest";
import ServiceOrders from "./pages/ServiceOrders";
import Person from "./pages/Person";
import PersonUser from "./pages/PersonUser";
import Client from "./pages/Client";
import Driver from "./pages/Driver";
import Vehicles from "./pages/Vehicles";
import ReportsOsFinished from "./pages/ReportsOsFinished";
import NotFound from "./pages/NotFound";

import Loading from "./pages/components/Loading/Loading";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/main" component={Main} />
        <Route path="/remember" component={Remember} />
        <Route path="/myaccount" component={MyAccount} />
        <Route path="/serviceorders/request" component={ServiceOrdersRequest} />
        <Route path="/serviceorders" component={ServiceOrders} />
        <Route path="/people/person" component={Person} />
        <Route path="/people/person/user/id/:id" component={PersonUser} />
        <Route path="/people/client" component={Client} />
        <Route path="/people/driver" component={Driver} />
        <Route path="/Vehicles" component={Vehicles} />
        <Route path="/reports/os/finished" component={ReportsOsFinished} />
        <Route path="/loading" component={Loading} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
