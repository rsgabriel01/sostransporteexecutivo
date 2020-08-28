import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiUserLocationLine } from "react-icons/ri";

import "./styles.css";

export default function Driver() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <div className="content-container">
          <Header
            title={"Motorista"}
            icon={<RiUserLocationLine size={40} />}
          ></Header>
        </div>
      </div>
    </div>
  );
}
