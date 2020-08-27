import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";

import {} from "react-icons/ri";

import "./styles.css";

export default function Client() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <h1>CLIENT</h1>
      </div>
    </div>
  );
}
