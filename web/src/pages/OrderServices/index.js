import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiFileListLine } from "react-icons/ri";

import "./styles.css";

export default function OrderServices() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header
          title={"Ordens de Serviço"}
          icon={<RiFileListLine size={40} />}
        ></Header>
      </div>
    </div>
  );
}
