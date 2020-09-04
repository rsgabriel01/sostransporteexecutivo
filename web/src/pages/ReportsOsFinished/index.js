import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiFileList2Line } from "react-icons/ri";

// import "./styles.css";

export default function ReportsOsFinished() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header
          title={"Relatório de Ordens de Serviço Finalizadas"}
          icon={<RiFileList2Line size={40} />}
        ></Header>
      </div>
    </div>
  );
}
