import React, { useState } from "react";
import {
  RiUserLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
  RiLoginBoxLine,
} from "react-icons/ri";

import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import loginIllustrator from "../../assets/loginIllustrator.svg";

export default function Logon() {
  let history = useHistory();

  const [visiblePassword, setVisiblePassword] = useState("password");
  const [visibleIcon, setVisibleIcon] = useState(
    <RiEyeLine
      size={30}
      color="#3F3D56"
      className="eye"
      onClick={handleVisiblePassword}
    />
  );

  function handleSubmit() {
    history.push("/main");
  }

  function handleVisiblePassword() {
    setVisiblePassword("text");
    setVisibleIcon(
      <RiEyeOffLine
        size={30}
        color="#3F3D56"
        className="eye"
        onClick={handleNotVisiblePassword}
      />
    );
  }

  function handleNotVisiblePassword() {
    setVisiblePassword("password");
    setVisibleIcon(
      <RiEyeLine
        size={30}
        color="#3F3D56"
        className="eye"
        onClick={handleVisiblePassword}
      />
    );
  }

  return (
    <div className="logon-container">
      <img src={loginIllustrator} alt="Solicitação de viagem" />
      <section className="form">
        <form>
          <h1>ACESSAR A PLATAFORMA</h1>

          <div className="input-group">
            <RiUserLine size={30} color="#3F3D56" />
            <input type="text" placeholder="Usuário" required />
          </div>

          <div className="input-group">
            <RiLock2Line size={30} color="#3F3D56" />
            <input type={visiblePassword} placeholder="Senha" required />
            {visibleIcon}
          </div>

          <Link to="/remember">Esqueci minha senha</Link>

          <button type="submit" onSubmit={handleSubmit} className="button">
            <RiLoginBoxLine size={30} />
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}
