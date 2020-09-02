import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getToken, logout } from "../../../services/auth";

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
  RiAccountCircleLine,
  RiUser2Line,
  RiUserLine,
  RiLogoutBoxLine,
  RiArrowDropRightLine,
  RiArrowDropLeftLine,
  RiFileTextLine,
  RiTaxiLine,
  RiAccountBoxLine,
  RiFileList2Line,
} from "react-icons/ri";

import "./custom.scss";
// import "react-pro-sidebar/dist/css/styles.css";

import api from "../../../services/api";

export default function LateralMenu() {
  const [collapsedMenu, setCollapsedMenu] = useState(true);

  const [collapseIcon, setCollapseIcon] = useState(
    <RiArrowDropRightLine size={35} />
  );

  let history = useHistory();

  function handleCollapsedChange() {
    if (collapsedMenu === true) {
      setCollapsedMenu(false);
      handleCollapseIcon(false);
    } else {
      setCollapsedMenu(true);
      handleCollapseIcon(true);
    }
  }

  function handleCollapseIcon(boolean) {
    if (boolean === true) {
      setCollapseIcon(<RiArrowDropRightLine size={35} />);
    } else {
      setCollapseIcon(<RiArrowDropLeftLine size={35} />);
    }
  }

  function handleLogout() {
    const authorization = localStorage.getItem("authorization");

    api
      .get("/acess/logout", {
        headers: {
          token: getToken(),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          logout();
          history.push("/");
        }
      });
  }

  return (
    <ProSidebar collapsed={collapsedMenu}>
      <SidebarHeader>
        <Menu>
          <SubMenu
            title="Gabriel Souza"
            icon={<RiAccountCircleLine size={50} />}
          >
            <MenuItem prefix={<RiAccountBoxLine size={20} />}>
              Minha Conta
              <Link to="/myaccount" />
            </MenuItem>
            <MenuItem
              prefix={<RiLogoutBoxLine size={20} />}
              onClick={handleLogout}
            >
              Sair
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarHeader>

      <SidebarContent>
        <Menu popperArrow={false}>
          <MenuItem icon={<RiHome4Line size={25} />}>
            Início
            <Link to="/main" />
          </MenuItem>

          <MenuItem icon={<RiFileListLine size={25} />}>
            Ordens de Serviço
            <Link to="/serviceorders" />
          </MenuItem>

          <SubMenu title="Pessoas" icon={<RiUserStarLine size={25} />}>
            <MenuItem prefix={<RiUserLine size={20} />}>
              Física
              <Link to="/people/person" />
            </MenuItem>

            <MenuItem prefix={<RiUser2Line size={20} />}>
              Cliente
              <Link to="/people/client" />
            </MenuItem>

            <MenuItem prefix={<RiUserLocationLine size={20} />}>
              Motorista
              <Link to="/people/driver" />
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<RiTaxiLine size={25} />}>
            Veiculos
            <Link to="/vehicles" />
          </MenuItem>
          <SubMenu title="Relatorios" icon={<RiFileTextLine size={25} />}>
            <MenuItem prefix={<RiFileList2Line size={20} />}>
              OS Finalizadas
              <Link to="/reports/os/finished" />
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
