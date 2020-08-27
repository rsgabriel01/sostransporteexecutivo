import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

import {
  RiUserLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
  RiLoginBoxLine,
} from "react-icons/ri";

import loginIllustrator from "../../assets/loginIllustrator.svg";

import Loading from "../components/Loading/Loading";

import "./styles.css";

import api from "../../services/api";

export default function Logon() {
  //#region Definitions

  let history = useHistory();
  const authorization = localStorage.getItem("authorization");
  //#endregion

  //#region States
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState("password");
  //#endregion

  //#region Verify Session
  useEffect(() => {
    async function virifyAuthorization() {
      await api
        .get("/acess/session", {
          headers: {
            token: authorization,
          },
        })
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.message === "Token de sessão válido."
          ) {
            history.push("/main");
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
    virifyAuthorization();
  }, [authorization]);
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

    const data = {
      user,
      password,
    };

    try {
      const response = await api.post("/acess/login", data);

      console.log(response.data);

      localStorage.setItem("id_executingperson", response.data.id_person);
      localStorage.setItem("authorization", response.data.session.token);

      history.push("/main");
    } catch (error) {
      if (error.response) {
        const dataError = error.response.data;
        const statusError = error.response.status;

        if (statusError === 400 && dataError.message) {
          alert(dataError.message);
        }
        // Request made and server responded
        console.log(error.response);
        console.log(error.response.data);
        console.log(statusError);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  }
  //#endregion

  return (
    <>
      {loading ? (
        <Loading type="bars" color="#0f4c82" />
      ) : (
        <div className="logon-container">
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
                  required
                />
                {visibleIcon}
              </div>

              <Link to="/remember">Esqueci minha senha</Link>

              <button type="submit" className="button btnDefault">
                <RiLoginBoxLine size={30} />
                Entrar
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
