import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiUser2Line } from "react-icons/ri";

import "./styles.css";

export default function Client() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header title={"Cliente"} icon={<RiUser2Line size={40} />}></Header>
      </div>
    </div>
  );
}
