import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Execution from "./pages/Execution";
import ListOrders from "./pages/ListOrders";
import ServiceOrders from "./pages/ServiceOrder";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Home,
    Execution,
    ListOrders,
    ServiceOrders,
  })
);

export default Routes;
