import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";

import {} from "react-icons/ri";

import "./styles.css";

export default function User() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <h1>USER</h1>
      </div>
    </div>
  );
}
