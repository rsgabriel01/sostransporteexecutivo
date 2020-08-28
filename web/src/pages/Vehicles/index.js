import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiTaxiLine } from "react-icons/ri";

import "./styles.css";

export default function Vehicles() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header title={"Veículos"} icon={<RiTaxiLine size={40} />}></Header>
      </div>
    </div>
  );
}
