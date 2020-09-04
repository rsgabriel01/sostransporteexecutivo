import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import api from "../../services/api";

import { login, isAuthenticated } from "../../services/auth";

import Loading from "../components/Loading/Loading";

import loginIllustrator from "../../assets/loginIllustrator.svg";

import notify from "../../helpers/notifys";

import {
  RiUserLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
  RiLoginBoxLine,
  RiLoader4Line,
} from "react-icons/ri";

import "./styles.css";

import "react-toastify/dist/ReactToastify.css";

export default function Logon() {
  //#region Definitions

  let history = useHistory();
  const authorization = localStorage.getItem("authorization");
  //#endregion

  //#region States
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonLogin, setTextButtonLogin] = useState("Entrar");
  const [btnInactive, setBtnInactive] = useState("");

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState("password");
  //#endregion

  //#region Verify Session
  useEffect(() => {
    async function virifyAuthorization() {
      const response = await isAuthenticated();
      if (response) {
        console.log("response" + response);
        history.push("/main");
      } else {
        setLoadingPage(false);
      }
    }
    virifyAuthorization();
  }, []);
  //#endregion

  //#region Alter Icon Visible Password
  const [visibleIcon, setVisibleIcon] = useState(
    <RiEyeLine
      size={30}
      color="#3F3D56"
      className="eye"
      onClick={handleVisiblePassword}
    />
  );
  //#endregion

  //#region Visible/Not Visible Password
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
  //#endregion

  //#region Login
  async function handleLogin(e) {
    e.preventDefault();

    setTextButtonLogin("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    const data = {
      user,
      password,
    };

    try {
      const response = await api.post("/acess/login", data);

      console.log(response.data);

      login(response.data.session.token, response.data.id_person);

      history.push("/main");
    } catch (error) {
      setTextButtonLogin("Entrar");
      setLoadingButton(false);
      setBtnInactive("");

      if (error.response) {
        const dataError = error.response.data;
        const statusError = error.response.status;
        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          console.log(dataError.message);
          switch (dataError.message) {
            case '"password" length must be at least 8 characters long':
              notify("warning", "A senha deve conter no mínimo 8 caracteres.");
              break;
            case '"password" length must be at least 8 characters long':
              notify("warning", "A senha deve conter no mínimo 8 caracteres.");
              break;
            case '"password" length must be less than or equal to 16 characters long':
              notify("warning", "A senha deve conter no máximo 16 caracteres.");

              break;
            case "error":
              notify("warning", "teste3");

              break;
            default:
              notify("warning", dataError.message);
          }
        }
      } else if (error.request) {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log("Error", error.message);
      }
    }
  }
  //#endregion

  return (
    <>
      {loadingPage ? (
        <Loading type="bars" color="#0f4c82" />
      ) : (
        <div className="logon-container">
          <ToastContainer />
          <img src={loginIllustrator} alt="Solicitação de viagem" />
          <section className="form">
            <form onSubmit={handleLogin}>
              <h1>ACESSAR A PLATAFORMA</h1>

              <div className="input-group">
                <RiUserLine size={30} color="#3F3D56" />
                <input
                  type="text"
                  placeholder="Usuário"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <RiLock2Line size={30} color="#3F3D56" />
                <input
                  type={visiblePassword}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  maxLength="16"
                  required
                />
                {visibleIcon}
              </div>

              <Link to="/remember">Esqueci minha senha</Link>

              <button
                type="submit"
                className={`button btnDefault ${btnInactive}`}
                disabled={loadingButton}
              >
                {!loadingButton ? (
                  <RiLoginBoxLine size={30} />
                ) : (
                  <RiLoader4Line size={30} className="load-spinner-button" />
                )}
                {textButtonLogin}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
