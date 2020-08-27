import React from "react";

import LateralMenu from "../components/LateralMenu/LateralMenu";

import { RiArrowRightLine } from "react-icons/ri";

import "./styles.css";

export default function User() {
  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <div
          className="solicitation-table"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* <div id="table-header" style={{ height: "30px" }}>
            <table>
              <tr id="table-header">
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
            </table>
          </div> */}
          <div
            id="teste"
            style={{
              border: "1px solid red",
              width: "100%",
              height: "90%",
              overflow: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                // height: "100%",
                textAlign: "left",
                borderCollapse: "collapse",
                wordWrap: "break-word",
                tableLayout: "fixed",
              }}
            >
              {/* <tr id="table-header">
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
              </tr> */}
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
                    >
                      <RiArrowRightLine size={24} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td>123456789</td>
                <td>honda Henjis</td>
                <td>27/08/2020 15:30</td>
                <td>SÃO CRISTOVÃO </td>
                <td>CENTRO</td>
                <td>CLIENTE COM</td>
                <td>
                  <div
                    style={{
                      // border: "1px solid red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {}}
                      style={{ height: "30px", width: "30px" }}
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
  );
}
