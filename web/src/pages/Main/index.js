import React from "react";

import LateralMenu from "../components/LateralMenu";

import {} from "react-icons/ri";

import "./styles.css";

export default function Main() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="main">
        <h1>HOME</h1>
      </div>
    </div>
  );
}
