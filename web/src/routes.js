import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Main from "./pages/Main";
import MainMet from "./pages/MainMet";
import MainExecuting from "./pages/MainExecuting";
import MainFinished from "./pages/MainFinished";
import Remember from "./pages/ForgotPassword";
import MyAccount from "./pages/MyAccount";
import ServiceOrdersRequest from "./pages/ServiceOrdersRequest";
import ServiceOrders from "./pages/ServiceOrders";
import Person from "./pages/Person";
import PersonUser from "./pages/PersonUser";
import PersonNew from "./pages/PersonNew";
import Client from "./pages/Client";
import ClientNew from "./pages/ClientNew";
import Driver from "./pages/Driver";
import DriverNew from "./pages/DriverNew";
import Vehicles from "./pages/Vehicles";
import VehiclesNew from "./pages/VehiclesNew";
import ReportsOsFinished from "./pages/ReportsOsFinished";
import NotFound from "./pages/NotFound";

import Loading from "./pages/components/Loading/Loading";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/main" exact component={Main} />
        <Route path="/main/met" exact component={MainMet} />
        <Route path="/main/executing" exact component={MainExecuting} />
        <Route path="/main/finished" exact component={MainFinished} />
        <Route path="/remember" exact component={Remember} />
        <Route path="/myaccount" exact component={MyAccount} />
        <Route
          path="/serviceorders/request"
          exact
          component={ServiceOrdersRequest}
        />
        <Route path="/serviceorders" exact component={ServiceOrders} />
        <Route path="/people/person" exact component={Person} />
        <Route path="/people/person/user/:id" component={PersonUser} />
        <Route path="/people/person/new" exact component={PersonNew} />
        <Route path="/people/client" exact component={Client} />
        <Route path="/people/client/new" exact component={ClientNew} />
        <Route path="/people/driver" exact component={Driver} />
        <Route path="/people/driver/new" exact component={DriverNew} />
        <Route path="/vehicles" exact component={Vehicles} />
        <Route path="/vehicles/new" exact component={VehiclesNew} />
        <Route
          path="/reports/os/finished"
          exact
          component={ReportsOsFinished}
        />
        <Route path="/loading" component={Loading} />
        <Route component={NotFound}>
          {/* <Redirect to="/dashboard" /> : <PublicHomePage /> */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
