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
  RiArrowLeftLine,
} from "react-icons/ri";

import "./styles.css";

export default function ServiceOrdersRequest() {
  //#region Definitions
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [isReadOnlyOrigin, setIsReadOnlyOrigin] = useState(true);
  const [isReadOnlyDestiny, setIsReadOnlyDestiny] = useState(true);
  const [isDisabledRbAddressClient, setIsDisabledRbAddressClient] = useState(
    true
  );

  const [idClient, setIdClient] = useState("");
  const [client, setClient] = useState("");

  const [rbCheckedAddressOrigin, setRbCheckedAddressOrigin] = useState(false);
  const [idNeighborhoodOrigin, setIdNeighborhoodOrigin] = useState("");
  const [neighborhoodOrigin, setNeighborhoodOrigin] = useState("");
  const [streetOrigin, setStreetOrigin] = useState("");
  const [streetNumberOrigin, setStreetNumberOrigin] = useState("");
  const [complementOrigin, setComplementOrigin] = useState("");

  const [rbCheckedAddressDestiny, setRbCheckedAddressDestiny] = useState(false);
  const [idNeighborhoodDestiny, setIdNeighborhoodDestiny] = useState("");
  const [neighborhoodDestiny, setNeighborhoodDestiny] = useState("");
  const [streetDestiny, setStreetDestiny] = useState("");
  const [streetNumberDestiny, setStreetNumberDestiny] = useState("");
  const [complementDestiny, setComplementDestiny] = useState("");

  const dataClient = {
    fantasy_name: "HONDA ENJIN",
    id_neighborhood: 1,
    neighborhood: "SÃO CRISTOVÃO",
    street: "AV BRASIL",
    street_number: "1050",
    complement: "NENHUM",
  };

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

  // #region Handle Address Check Client
  function handleAddressCheckClient(address) {
    if (address === "origin") {
      console.log("origin");
      if (rbCheckedAddressOrigin === false) {
        let idNeighborhoodOriginOld = idNeighborhoodOrigin;
        let neighborhoodOriginOld = neighborhoodOrigin;
        let streetOriginOld = streetOrigin;
        let streetNumberOriginOld = streetNumberOrigin;
        let complementOriginOld = complementOrigin;

        setIdNeighborhoodOrigin(dataClient.id_neighborhood);
        setIdNeighborhoodDestiny(idNeighborhoodOriginOld);

        setNeighborhoodOrigin(dataClient.neighborhood);
        setNeighborhoodDestiny(neighborhoodOriginOld);

        setStreetOrigin(dataClient.street);
        setStreetDestiny(streetOriginOld);

        setStreetNumberOrigin(dataClient.street_number);
        setStreetNumberDestiny(streetNumberOriginOld);

        setComplementOrigin(dataClient.complement);
        setComplementDestiny(complementOriginOld);

        setRbCheckedAddressOrigin(true);
        setRbCheckedAddressDestiny(false);

        setIsReadOnlyOrigin(true);
        setIsReadOnlyDestiny(false);
      }
    } else if (address === "destiny") {
      console.log("destiny");
      if (rbCheckedAddressDestiny === false) {
        let idNeighborhoodDestinyOld = idNeighborhoodDestiny;
        let neighborhoodDestinyOld = neighborhoodDestiny;
        let streetDestinyOld = streetDestiny;
        let streetNumberDestinyOld = streetNumberDestiny;
        let complementDestinyOld = complementDestiny;

        setIdNeighborhoodDestiny(dataClient.id_neighborhood);
        setIdNeighborhoodOrigin(idNeighborhoodDestinyOld);

        setNeighborhoodDestiny(dataClient.neighborhood);
        setNeighborhoodOrigin(neighborhoodDestinyOld);

        setStreetDestiny(dataClient.street);
        setStreetOrigin(streetDestinyOld);

        setStreetNumberDestiny(dataClient.street_number);
        setStreetNumberOrigin(streetNumberDestinyOld);

        setComplementDestiny(dataClient.complement);
        setComplementOrigin(complementDestinyOld);

        setRbCheckedAddressOrigin(false);
        setRbCheckedAddressDestiny(true);

        setIsReadOnlyOrigin(false);
        setIsReadOnlyDestiny(true);
      }
    }
  }
  // #endregion

  // #region object Client test

  function preencheStatesTest() {
    setIsDisabledRbAddressClient(false);
  }
  // #endregion

  // #region request OS
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
                <div className="group-tabs"></div>
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
                    <div className="input-block">
                      <input
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        id="client"
                        readOnly={true}
                        required
                      />
                      <button
                        type="button"
                        className="button btnDefault"
                        onClick={() => {
                          preencheStatesTest();
                        }}
                      >
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
                        <h1>
                          <RiMapPinLine size={30} />
                          Origem
                        </h1>

                        <div className="checkbox-block">
                          <input
                            type="radio"
                            name="rbAddressClient"
                            id="rbAddressClientOrigin"
                            disabled={isDisabledRbAddressClient}
                            onClick={() => {
                              handleAddressCheckClient("origin");
                            }}
                          />
                          <label htmlFor="rbAddressClientOrigin">Cliente</label>
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
                            readOnly={true}
                            required
                          />
                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadOnlyOrigin ? "btnInactive" : ""
                            }`}
                            disabled={isReadOnlyOrigin}
                          >
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
                            readOnly={isReadOnlyOrigin}
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
                            readOnly={isReadOnlyOrigin}
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
                          readOnly={isReadOnlyOrigin}
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
                          <input
                            type="radio"
                            name="rbAddressClient"
                            id="rbAddressClientDestiny"
                            disabled={isDisabledRbAddressClient}
                            onClick={() => {
                              handleAddressCheckClient("destiny");
                            }}
                          />
                          <label htmlFor="rbAddressClientDestiny">
                            Cliente
                          </label>
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
                            readOnly={true}
                            required
                          />
                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadOnlyDestiny ? "btnInactive" : ""
                            }`}
                            disabled={isReadOnlyDestiny}
                          >
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
                            readOnly={isReadOnlyDestiny}
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
                            readOnly={isReadOnlyDestiny}
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
                          readOnly={isReadOnlyDestiny}
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
