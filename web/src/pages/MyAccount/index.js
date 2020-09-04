import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import { RiUserFollowLine, RiAccountBoxLine } from "react-icons/ri";

// import "./styles.css";

export default function PersonUser() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header
          title={"Minha conta"}
          icon={<RiAccountBoxLine size={40} />}
        ></Header>
      </div>
    </div>
  );
}
