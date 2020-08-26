import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiPhoneLine } from "react-icons/ri";

import "./styles.css";

export default function Main() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header
          title={"Solicitações"}
          icon={<RiPhoneLine size={40} />}
        ></Header>
      </div>
    </div>
  );
}
