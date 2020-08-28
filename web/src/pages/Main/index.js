import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import { login, isAuthenticated } from "../../services/auth";

import {
  RiPhoneLine,
  RiFileCopy2Line,
  RiArrowRightLine,
  RiTaxiWifiLine,
  RiCheckLine,
} from "react-icons/ri";

import "./styles.css";

export default function Main() {
  let history = useHistory();

  const [AlterTab, setAlterTab] = useState("Solicitações");
  const [tabActive1, setTabActive1] = useState("tab-active");
  const [tabActive2, setTabActive2] = useState("");
  const [tabActive3, setTabActive3] = useState("");
  const [tabActive4, setTabActive4] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("carregou antes do response api");
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
  //#endreg

  useEffect(() => {
    console.log("carregou antes da promise");
  }, []);
  //#region handleAlterTab Active
  function handleAlterTab(text) {
    setAlterTab(text);
    if (text === "Solicitações") {
      setTabActive1("tab-active");
      setTabActive2("");
      setTabActive3("");
      setTabActive4("");
    } else if (text === "Atendidas") {
      setTabActive1("");
      setTabActive2("tab-active");
      setTabActive3("");
      setTabActive4("");
    } else if (text === "Execução") {
      setTabActive1("");
      setTabActive2("");
      setTabActive3("tab-active");
      setTabActive4("");
    } else if (text === "Finalizadas") {
      setTabActive1("");
      setTabActive2("");
      setTabActive3("");
      setTabActive4("tab-active");
    }
  }
  //#endregion

  return (
    <>
      {loading ? (
        <Loading type="bars" color="#0f4c82" />
      ) : (
        <div className="main-container">
          <LateralMenu></LateralMenu>
          <div className="content-container">
            <Header
              title={"Solicitações"}
              icon={<RiPhoneLine size={40} />}
            ></Header>
            <div className="solicitations-container">
              <div className="status-bar">
                <div className="group-tabs">
                  <button
                    type="button"
                    className={`button ${tabActive1}`}
                    onClick={() => {
                      handleAlterTab("Solicitações");
                    }}
                  >
                    <RiFileCopy2Line size={24} />
                    Aguardando
                  </button>

                  <button
                    type="button"
                    className={`button ${tabActive2}`}
                    onClick={() => {
                      handleAlterTab("Atendidas");
                    }}
                  >
                    <RiArrowRightLine size={24} />
                    Atendidas
                  </button>
                  <button
                    type="button"
                    className={`button ${tabActive3}`}
                    onClick={() => {
                      handleAlterTab("Execução");
                    }}
                  >
                    <RiTaxiWifiLine size={22} />
                    Execução
                  </button>

                  <button
                    type="button"
                    className={`button ${tabActive4}`}
                    onClick={() => {
                      handleAlterTab("Finalizadas");
                    }}
                  >
                    <RiCheckLine size={24} />
                    Finalizadas
                  </button>
                </div>
                {/* <div className="group-dates">
              <h1>group-dates</h1>
            </div> */}
              </div>

              <div className="solicitation-table">
                {/* <h1>{AlterTab}</h1> */}
                <table className="table-header">
                  <tr id="table-header">
                    <th>NÚMERO</th>
                    <th>CLIENTE</th>
                    <th>SOLICITADO</th>
                    <th>ORIGEM</th>
                    <th>DESTINO</th>
                    <th>OBSERVAÇÃO</th>
                    <th>ATENDER</th>
                  </tr>
                </table>

                <div className="div-responsive-table">
                  <table className="table-content">
                    <tr>
                      <td>123456789</td>
                      <td>honda Henjis</td>
                      <td>27/08/2020 15:30</td>
                      <td>SÃO CRISTOVÃO </td>
                      <td>CENTRO</td>
                      <td>CLIENTE COM</td>
                      <td>
                        <div className="answer">
                          <button
                            type="button"
                            className={`button btnDefault`}
                            onClick={() => {}}
                          >
                            <RiArrowRightLine size={24} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
