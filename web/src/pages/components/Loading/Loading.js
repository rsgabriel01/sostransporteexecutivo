import React from "react";
import ReactLoading from "react-loading";

import "./styles.css";

export default function Loading({ type, color }) {
  return (
    <div className="loading">
      <ReactLoading type={type} color={color} height={"10%"} width={"10%"} />
      <h1></h1>
    </div>
  );
}
