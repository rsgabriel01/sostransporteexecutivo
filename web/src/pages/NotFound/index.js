import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import Loading from "../components/Loading/Loading";

import { isAuthenticated, logout } from "../../services/auth";

import { RiArrowLeftLine } from "react-icons/ri";

import "./styles.css";

import notFoundImage from "../../assets/notFoundImage.svg";

export default function NotFound() {
  let history = useHistory();

  const [loading, setLoading] = useState(true);

  return (
    <div className="notfound-container">
      <img src={notFoundImage} alt="Solicitação de viagem" />
      <div className="message-notfound">
        <h1>Oops... quebrou!</h1>
        <p>Não conseguimos encontrar a página que você está procurando.</p>

        <div className="button-group">
          <button
            type="button"
            className="button btnDefault"
            onClick={() => {
              history.push("/");
            }}
          >
            <RiArrowLeftLine size={25} />
            Início
          </button>
        </div>
      </div>
    </div>
  );
}
