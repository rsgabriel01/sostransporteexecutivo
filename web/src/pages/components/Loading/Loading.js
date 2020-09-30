import React from "react";
import ReactLoading from "react-loading";

import "./styles.css";

export default function Loading({ type, color, height = "5%", width = "5%" }) {
  return (
    <div className="loading">
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
}
