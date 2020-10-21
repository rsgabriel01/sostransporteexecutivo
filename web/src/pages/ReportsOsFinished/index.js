import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import {
  getDateForDatePickerWithClassDate,
  getDateOfDatePickerValue,
} from "../../helpers/dates";

import { isAuthenticated, logout } from "../../services/auth";

import {
  RiFileTextLine,
  RiSearchLine,
  RiFileSearchLine,
  RiPrinterLine,
  RiFileExcel2Line,
} from "react-icons/ri";

import "./styles.css";

export default function Main() {
  let history = useHistory();

  const date = new Date();

  const [loading, setLoading] = useState(true);
  // const [idClient, setIdClient] = useState("");
  const [companyName, setCompanyName] = useState("");
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
      <LateralMenu />
      <div className="content-container">
        <Header
          title={"Relatório de ordens de serviço finalizadas"}
          icon={<RiFileTextLine size={40} />}
        />
        <>
          {loading ? (
            <Loading type="bars" color="#0f4c82" />
          ) : (
            <div className="reports-osFinished-container">
              <div className="status-bar">
                <div className="group-filters">
                  <div className="row">
                    <div className="column" id="columnClient">
                      <label htmlFor="startDate">Cliente:</label>

                      <input
                        type="text"
                        autoFocus
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                        }}
                        value={companyName}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="button btnDefault"
                    id="searchClient"
                  >
                    <RiSearchLine size={24} />
                  </button>

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
                </div>

                <div className="group-button">
                  <button type="button" className="button" id="printReport">
                    <RiPrinterLine size={24} />
                  </button>

                  <button type="button" className="button" id="saveReport">
                    <RiFileExcel2Line size={24} />
                  </button>

                  <button
                    type="button"
                    className="button btnOther"
                    id="generateReport"
                  >
                    <RiFileSearchLine size={24} />
                    Gerar
                  </button>
                </div>
              </div>

              <div className="reports-osFinished-table">
                <table className="table-header">
                  <thead>
                    <tr id="table-header">
                      <th></th>
                      <th>CÓDIGO</th>
                      <th>CLIENTE</th>
                      <th>SOLICITADO</th>
                      <th>FINALIZADO</th>
                      <th>ORIGEM</th>
                      <th>DESTINO</th>
                      <th>VALOR</th>
                    </tr>
                  </thead>
                </table>

                <div className="div-responsive-table">
                  <table className="table-content">
                    <tbody>
                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 17,00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>2</td>
                        <td>HONDA ENJIS</td>
                        <td>27/08/2020 15:30</td>
                        <td>27/08/2020 16:00</td>
                        <td>SÃO CRISTOVÃO </td>
                        <td>CENTRO</td>
                        <td>R$ 18,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <table className="table-footer">
                  <tfoot>
                    <tr id="table-footer">
                      <th>TOTAL</th>
                      <th>150</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>R$ 1500,00</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
