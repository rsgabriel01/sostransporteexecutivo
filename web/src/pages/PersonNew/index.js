import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import api from "../../services/api";

import { isAuthenticated } from "../../services/auth";

import {
  RiCheckLine,
  RiCloseLine,
  RiBookLine,
  RiUserLine,
  RiArrowLeftLine,
} from "react-icons/ri";

// import "./styles.css";

export default function ServiceOrdersRequest() {
  //#region Definitions
  let history = useHistory();
  const [loading, setLoading] = useState(true);

  //#endregion

  //#region Verify Session
  useEffect(() => {
    async function virifyAuthorization() {
      const response = await isAuthenticated();
      if (!response) {
        console.log("response" + response);
        history.push("/");
      } else {
        setLoading(false);
      }
    }
    virifyAuthorization();
  }, []);
  //#endregion

  //#region Request Service Order
  async function handleRequestOs(e) {
    e.preventDefault();

    // const data = {
    //   user,
    //   password,
    // };

    // try {
    //   const response = await api.post("/acess/login", data);

    //   console.log(response.data);

    //   history.push("/main");
    // } catch (error) {
    //   if (error.response) {
    //     const dataError = error.response.data;
    //     const statusError = error.response.status;

    //     if (statusError === 400 && dataError.message) {
    //       alert(dataError.message);
    //     }
    //     console.log(error.response);
    //     console.log(error.response.data);
    //     console.log(statusError);
    //   } else if (error.request) {
    //     console.log(error.request);
    //   } else {
    //     console.log("Error", error.message);
    //   }
    // }
  }
  //#endregion

  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <>
        {loading ? (
          <Loading type="bars" color="#0f4c82" />
        ) : (
          <div className="content-container">
            <Header
              title={"Pessoa Física"}
              icon={<RiUserLine size={40} />}
            ></Header>
            <div className="person-new-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/person/new">
                    <button type="button" className={`button tab-active`}>
                      <RiBookLine size={24} />
                      Dados
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form onSubmit={handleRequestOs}>
                  <div className="form-title">
                    <RiUserLine size={30} />
                    <h1>NOVA PESSOA FÍSICA</h1>
                  </div>

                  <div className="button-group">
                    <button
                      type="button"
                      className="button btnReturn"
                      onClick={() => {
                        history.push("/people/person/");
                      }}
                    >
                      <RiArrowLeftLine size={25} />
                      Voltar
                    </button>
                    <button
                      type="button"
                      className="button btnCancel btnInactive"
                      disabled="true"
                    >
                      <RiCloseLine size={30} />
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="button btnSuccess btnInactive"
                      disabled="true"
                    >
                      <RiCheckLine size={30} />
                      Salvar
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
