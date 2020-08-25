import React from "react";
import { RiUserLine, RiMailSendLine, RiArrowGoBackLine } from "react-icons/ri";

import { Link } from "react-router-dom";

import "./styles.css";

import loginIllustrator from "../../assets/loginIllustrator.svg";

export default function Remember() {
  return (
    <div className="remember-container">
      <img src={loginIllustrator} alt="Solicitação de viagem" />
      <section className="form">
        <form>
          <h1>RECUPERAR SENHA</h1>

          <div className="input-group">
            <RiMailSendLine size={35} color="#3F3D56" />
            <input type="email" placeholder="E-mail" />
          </div>
          <button type="submit" className="button">
            Lembrar
          </button>
          <Link to="/">
            <button type="submit" className="button btnReturn">
              Voltar
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
}
