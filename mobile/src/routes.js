import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Execution from "./pages/Execution";
import ListIcons from "./pages/ListIcons";
import ServiceOrder from "./pages/ServiceOrder";

const Routes = createAppContainer(
  createSwitchNavigator({
    // ListIcons,
    Login,
    Home,
    ServiceOrder,
    Execution,
  })
);

export default Routes;
