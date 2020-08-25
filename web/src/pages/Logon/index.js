import React from "react";
import {
  RiUserLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
} from "react-icons/ri";

import { Link } from "react-router-dom";

import "./styles.css";

import loginIllustrator from "../../assets/loginIllustrator.svg";

export default function Logon() {
  return (
    <div className="logon-container">
      <img src={loginIllustrator} alt="Solicitação de viagem" />
      <section className="form">
        <form>
          <h1>ACESSAR A PLATAFORMA</h1>

          <div className="input-group">
            <RiUserLine size={35} color="#3F3D56" />
            <input type="text" placeholder="Usuário" />
          </div>

          <div className="input-group">
            <RiLock2Line size={35} color="#3F3D56" />
            <input type="password" placeholder="Senha" />
            <RiEyeLine size={35} color="#3F3D56" className="eye" />
          </div>

          <Link to="/remember">Esqueci minha senha</Link>

          <button type="submit" className="button">
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}
