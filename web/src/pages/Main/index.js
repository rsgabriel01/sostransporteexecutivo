import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";

import {
  RiPhoneLine,
  RiFileCopy2Line,
  RiArrowRightLine,
  RiTaxiWifiLine,
  RiCheckLine,
} from "react-icons/ri";

import "./styles.css";

export default function Main() {
  const [AlterTab, setAlterTab] = useState("Solicitações");
  const [tabActive1, setTabActive1] = useState("tab-active");
  const [tabActive2, setTabActive2] = useState("");
  const [tabActive3, setTabActive3] = useState("");
  const [tabActive4, setTabActive4] = useState("");

  //#region handleAlterTab
  function handleAlterTab(text) {
    setAlterTab(text);
    if (text == "Solicitações") {
      setTabActive1("tab-active");
      setTabActive2("");
      setTabActive3("");
      setTabActive4("");
    } else if (text == "Atendidas") {
      setTabActive1("");
      setTabActive2("tab-active");
      setTabActive3("");
      setTabActive4("");
    } else if (text == "Execução") {
      setTabActive1("");
      setTabActive2("");
      setTabActive3("tab-active");
      setTabActive4("");
    } else if (text == "Finalizadas") {
      setTabActive1("");
      setTabActive2("");
      setTabActive3("");
      setTabActive4("tab-active");
    }
  }
  //#endregion

  return (
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
            <div className="group-dates">
              <h1>group-dates</h1>
            </div>
          </div>
          <div className="solicitation-table">
            <h1>{AlterTab}</h1>

            <table
              style={{
                width: "100%",
                textAlign: "left",
                borderCollapse: "collapse",
                wordWrap: "break-word",
                tableLayout: "fixed",
              }}
            >
              <tr
                style={{
                  background: "#0F4C82",
                  color: "#ffffff",
                  height: "30px",
                }}
              >
                <th
                  style={{
                    borderRadius: "3px 0px 0px 3px",
                  }}
                >
                  NÚMERO
                </th>
                <th>CLIENTE</th>
                <th>SOLICITADO</th>
                <th>ORIGEM</th>
                <th>DESTINO</th>
                <th>OBSERVAÇÃO</th>
                <th
                  style={{
                    borderRadius: "0px 3px 3px 0px",
                  }}
                >
                  ATENDER
                </th>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM CAMISETA VERMELHA E CALÇA PRETA</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                    padding: "10px",
                  }}
                >
                  <button
                    type="button"
                    className={`button btnDefault ${tabActive4}`}
                    onClick={() => {}}
                    style={{ height: "30px", width: "30px" }}
                  >
                    <RiArrowRightLine size={24} />
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
