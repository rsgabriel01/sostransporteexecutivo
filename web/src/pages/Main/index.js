import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import { isAuthenticated, logout } from "../../services/auth";

import {
  RiFileCopy2Line,
  RiArrowRightLine,
  RiTaxiWifiLine,
  RiCheckLine,
  RiFileList2Line,
  RiFilterLine,
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

  //#region Use Effect
  useEffect(() => {
    virifyAuthorization();
  }, []);
  //#endregion

  //#region Verify Session
  async function virifyAuthorization() {
    const response = await isAuthenticated();
    if (!response) {
      logout();
      history.push("/");
    } else {
      setLoading(false);
    }
  }

  //#endregion

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
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header
          title={"Solicitações"}
          icon={<RiFileList2Line size={40} />}
        ></Header>
        <>
          {loading ? (
            <Loading type="bars" color="#0f4c82" />
          ) : (
            <div className="solicitations-waiting-container">
              <div className="status-bar">
                <div className="group-tabs">
                  <Link to="/main">
                    <button type="button" className={`button tab-active`}>
                      <RiFileCopy2Line size={24} />
                      Aguardando
                    </button>
                  </Link>
                  <Link to="/main/met">
                    <button type="button" className={`button `}>
                      <RiArrowRightLine size={24} />
                      Atendidas
                    </button>
                  </Link>
                  <Link to="/main/executing">
                    <button type="button" className={`button `}>
                      <RiTaxiWifiLine size={22} />
                      Execução
                    </button>
                  </Link>
                  <Link to="/main/finished">
                    <button type="button" className={`button `}>
                      <RiCheckLine size={24} />
                      Finalizadas
                    </button>
                  </Link>
                </div>
                <div className="group-dates">
                  <div className="row">
                    <div className="column">
                      <label htmlFor="startDate">Inicio:</label>
                      <input type="date" id="startDate" />
                    </div>
                    <div className="column">
                      <label htmlFor="endDate">Fim:</label>
                      <input type="date" id="endDate" />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="button btnOther"
                    id="filterDate"
                  >
                    <RiFilterLine size={24} />
                  </button>
                </div>
              </div>

              <div className="solicitation-waiting-table">
                <table className="table-header">
                  <thead>
                    <tr id="table-header">
                      <th>NÚMERO</th>
                      <th>CLIENTE</th>
                      <th>SOLICITADO</th>
                      <th>ORIGEM</th>
                      <th>DESTINO</th>
                      <th>OBSERVAÇÃO</th>
                      <th>ATENDER</th>
                    </tr>
                  </thead>
                </table>

                <div className="div-responsive-table">
                  <table className="table-content">
                    <tbody>
                      <tr>
                        <td>1</td>
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

                      <tr>
                        <td>2</td>
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

                      <tr>
                        <td>3</td>
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

                      <tr>
                        <td>4</td>
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

                      <tr>
                        <td>5</td>
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

                      <tr>
                        <td>6</td>
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

                      <tr>
                        <td>7</td>
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

                      <tr>
                        <td>8</td>
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

                      <tr>
                        <td>9</td>
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

                      <tr>
                        <td>10</td>
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

                      <tr>
                        <td>11</td>
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

                      <tr>
                        <td>12</td>
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

                      <tr>
                        <td>13</td>
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

                      <tr>
                        <td>14</td>
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

                      <tr>
                        <td>15</td>
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

                      <tr>
                        <td>16</td>
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

                      <tr>
                        <td>17</td>
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

                      <tr>
                        <td>18</td>
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

                      <tr>
                        <td>19</td>
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

                      <tr>
                        <td>20</td>
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

                      <tr>
                        <td>21</td>
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

                      <tr>
                        <td>22</td>
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
