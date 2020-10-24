import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import {
  getDateForDatePickerWithClassDate,
  getDateOfDatePickerValue,
} from "../../helpers/dates";

import { isAuthenticated, logout } from "../../services/auth";

import {
  RiFileCopy2Line,
  RiArrowRightLine,
  RiTaxiWifiLine,
  RiCheckLine,
  RiFileList2Line,
  RiFilterLine,
  RiCloseLine,
} from "react-icons/ri";

import "./styles.css";

export default function MainMet() {
  let history = useHistory();

  const date = new Date();

  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    getDateForDatePickerWithClassDate(date)
  );
  const [endDate, setEndDate] = useState(
    getDateForDatePickerWithClassDate(date)
  );

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

  //#region Use Effect
  useEffect(() => {
    virifyAuthorization();
  }, []);
  //#endregion

  //#region Handle Set Start Date
  function testObjectConsult() {
    const data = {
      startDate: getDateOfDatePickerValue(startDate),
      endDate: getDateOfDatePickerValue(endDate),
    };

    return data;
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
            <div className="solicitations-met-container">
              <div className="status-bar">
                <div className="group-tabs">
                  <Link to="/main">
                    <button type="button" className={`button `}>
                      <RiFileCopy2Line size={24} />
                      Aguardando
                    </button>
                  </Link>
                  <Link to="/main/met">
                    <button type="button" className={`button tab-active`}>
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
                      <input
                        type="date"
                        id="startDate"
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          console.log(testObjectConsult());
                        }}
                        value={startDate}
                      />
                    </div>
                    <div className="column">
                      <label htmlFor="endDate">Fim:</label>
                      <input
                        type="date"
                        id="endDate"
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          console.log(testObjectConsult());
                        }}
                        value={endDate}
                      />
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

              <div className="solicitation-met-table">
                <table className="table-header">
                  <thead>
                    <tr id="table-header">
                      <th>CÓDIGO</th>
                      <th>CLIENTE</th>
                      <th>ATENDIDO</th>
                      <th>MOTORISTA</th>
                      <th>ORIGEM</th>
                      <th>DESTINO</th>
                      <th>OBSERVAÇÃO</th>
                      <th>AÇÕES</th>
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
                        <td>JOÃO</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>CLIENTE COM</td>
                        <td>
                          <div className="answer">
                            <button
                              type="button"
                              title="Cancelar ordem de serviço"
                              className={`button btnCancel`}
                              onClick={() => {}}
                            >
                              <RiCloseLine size={24} />
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
