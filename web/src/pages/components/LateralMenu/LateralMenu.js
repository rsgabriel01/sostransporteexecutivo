import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import {
  RiHome4Line,
  RiFileListLine,
  RiUserStarLine,
  RiUserLocationLine,
  RiUser2Line,
  RiUserLine,
  RiLogoutBoxLine,
  RiArrowDropRightLine,
  RiArrowDropLeftLine,
} from "react-icons/ri";

import "./custom.scss";
// import "react-pro-sidebar/dist/css/styles.css";

export default function LateralMenu() {
  const [collapsedMenu, setCollapsedMenu] = useState(true);

  const [collapseIcon, setCollapseIcon] = useState(
    <RiArrowDropRightLine size={35} />
  );

  let history = useHistory();

  function handleCollapsedChange() {
    if (collapsedMenu == true) {
      setCollapsedMenu(false);
      handleCollapseIcon(false);
    } else {
      setCollapsedMenu(true);
      handleCollapseIcon(true);
    }
  }

  function handleCollapseIcon(boolean) {
    if (boolean == true) {
      setCollapseIcon(<RiArrowDropRightLine size={35} />);
    } else {
      setCollapseIcon(<RiArrowDropLeftLine size={35} />);
    }
  }

  function handleLogout() {
    history.push("/");
  }

  return (
    <ProSidebar collapsed={collapsedMenu} popperArrow={true}>
      <SidebarHeader>
        <Menu>
          <MenuItem
            icon={<RiUserLine size={35} />}
            suffix={
              <RiLogoutBoxLine size={20} onClick={handleLogout} />
              // <Link to="/" />
            }
          >
            Gabriel Souza
          </MenuItem>
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          <MenuItem icon={<RiHome4Line size={25} />}>Início</MenuItem>
          <MenuItem icon={<RiFileListLine size={25} />}>Solicitações</MenuItem>
          <SubMenu title="Pessoas" icon={<RiUserStarLine size={25} />}>
            <MenuItem prefix={<RiUserLine size={20} />}>Física</MenuItem>
            <MenuItem prefix={<RiUser2Line size={20} />}>Cliente</MenuItem>
            <MenuItem prefix={<RiUserLocationLine size={20} />}>
              Motorista
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuItem icon={collapseIcon} onClick={handleCollapsedChange}>
            Recolher
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
