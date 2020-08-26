import React from "react";

// import { RiPhoneLine } from "react-icons/ri";

import "./styles.css";

export default function Header({ title, icon }) {
  return (
    <header>
      {icon}
      <h1>{title.toUpperCase()}</h1>
    </header>
  );
}
