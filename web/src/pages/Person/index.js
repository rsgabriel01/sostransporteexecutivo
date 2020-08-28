import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiUserStarLine } from "react-icons/ri";

import "./styles.css";

export default function Person() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header
          title={"PeSSOA Física"}
          icon={<RiUserStarLine size={40} />}
        ></Header>
      </div>
    </div>
  );
}
