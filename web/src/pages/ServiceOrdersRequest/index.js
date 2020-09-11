import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import api from "../../services/api";

import { isAuthenticated, logout } from "../../services/auth";

import {
  RiFileListLine,
  RiUser2Line,
  RiDraftLine,
  RiSearchLine,
  RiMapPinLine,
  RiCheckLine,
  RiCloseLine,
  RiSearchEyeLine,
  RiArrowLeftLine,
} from "react-icons/ri";

import "./styles.css";

export default function ServiceOrdersRequest() {
  //#region Definitions
  let history = useHistory();
  const [loading, setLoading] = useState(true);

  const [idClient, setIdClient] = useState("");
  const [client, setClient] = useState("");
  const [neighborhoodOrigin, setNeighborhoodOrigin] = useState("");
  const [streetOrigin, setStreetOrigin] = useState("");
  const [streetNumberOrigin, setStreetNumberOrigin] = useState("");
  const [complementOrigin, setComplementOrigin] = useState("");
  const [neighborhoodDestiny, setNeighborhoodDestiny] = useState("");
  const [streetDestiny, setStreetDestiny] = useState("");
  const [streetNumberDestiny, setStreetNumberDestiny] = useState("");
  const [complementDestiny, setComplementDestiny] = useState("");

  //#endregion

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
              title={"Ordens de Serviço"}
              icon={<RiFileListLine size={40} />}
            ></Header>
            <div className="os-request-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/serviceorders">
                    <button type="button" className={`button`}>
                      <RiSearchEyeLine size={24} />
                      Consultar
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form onSubmit={handleRequestOs}>
                  <div className="form-title">
                    <RiDraftLine size={30} />
                    <h1>NOVA ORDEM DE SERVIÇO</h1>
                  </div>

                  <div className="input-group-client">
                    <h1>
                      <RiUser2Line size={30} />
                      Cliente
                    </h1>
                    <input
                      type="hidden"
                      value={idClient}
                      onChange={(e) => setIdClient(e.target.value)}
                      id="id_client"
                      required
                    />
                    <div className="input-block">
                      <input
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        id="client"
                        readonly="true"
                        required
                      />
                      <button type="button" className="button btnDefault">
                        <RiSearchLine size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="group-address">
                    <div
                      className="input-group-address"
                      id="input-group-address-origin"
                    >
                      <div className="label-address">
                        {/* <div className="address-title"> */}
                        <h1>
                          <RiMapPinLine size={30} />
                          Origem
                        </h1>
                        {/* </div> */}

                        <div className="checkbox-block">
                          <input type="checkbox" id="cbClientOrigin" />
                          <label htmlFor="cbClientOrigin">Cliente</label>
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="neighborhood">Bairro:</label>

                        <div className="neighborhood-block">
                          <input
                            type="text"
                            value={neighborhoodOrigin}
                            onChange={(e) =>
                              setNeighborhoodOrigin(e.target.value)
                            }
                            readonly="true"
                            required
                          />
                          <button type="button" className="button btnDefault">
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>
                      <div className="street-number-block">
                        <div className="input-block">
                          <label htmlFor="street">Rua:</label>
                          <input
                            type="text"
                            value={streetOrigin}
                            onChange={(e) => setStreetOrigin(e.target.value)}
                            required
                          />
                        </div>

                        <div className="input-block">
                          <label htmlFor="street_number">Número:</label>
                          <input
                            className="input-number"
                            type="number"
                            min="0"
                            value={streetNumberOrigin}
                            onChange={(e) =>
                              setStreetNumberOrigin(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="input-block">
                        <label htmlFor="complement">Complemento:</label>
                        <input
                          type="text"
                          value={complementOrigin}
                          onChange={(e) => setComplementOrigin(e.target.value)}
                        />
                      </div>
                    </div>

                    <div
                      className="input-group-address"
                      id="input-group-address-destiny"
                    >
                      <div className="label-address">
                        <h1>
                          <RiMapPinLine size={30} />
                          Destino
                        </h1>

                        <div className="checkbox-block">
                          <input type="checkbox" id="cbClientDestiny" />
                          <label htmlFor="cbClientDestiny">Cliente</label>
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="neighborhood">Bairro:</label>
                        <div className="neighborhood-block">
                          <input
                            type="text"
                            value={neighborhoodDestiny}
                            onChange={(e) =>
                              setNeighborhoodDestiny(e.target.value)
                            }
                            readonly="true"
                            required
                          />
                          <button type="button" className="button btnDefault">
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>
                      <div className="street-number-block">
                        <div className="input-block">
                          <label htmlFor="street">Rua:</label>
                          <input
                            type="text"
                            value={streetDestiny}
                            onChange={(e) => setStreetDestiny(e.target.value)}
                            required
                          />
                        </div>
                        <div className="input-block">
                          <label htmlFor="street_number">Número:</label>
                          <input
                            type="number"
                            min="0"
                            value={streetNumberDestiny}
                            onChange={(e) =>
                              setStreetNumberDestiny(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="complement">Complemento:</label>
                        <input
                          type="text"
                          value={complementDestiny}
                          onChange={(e) => setComplementDestiny(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="button-group">
                    <button
                      type="button"
                      className="button btnReturn"
                      onClick={() => {
                        history.push("/serviceorders");
                      }}
                    >
                      <RiArrowLeftLine size={25} />
                      Voltar
                    </button>
                    <button type="button" className="button btnCancel">
                      <RiCloseLine size={30} />
                      Cancelar
                    </button>
                    <button type="submit" className="button btnSuccess">
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
