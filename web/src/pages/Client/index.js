import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import api from "../../services/api";

import { isAuthenticated } from "../../services/auth";

import {
  RiUser2Line,
  RiSearchLine,
  RiMapPinLine,
  RiCheckLine,
  RiCloseLine,
  RiUserStarLine,
  RiBookLine,
  RiUserSharedLine,
  RiUserFollowLine,
  RiUserAddLine,
  RiAddLine,
  RiUser3Line,
  RiCheckDoubleLine,
  RiPencilLine,
} from "react-icons/ri";

// import "./styles.css";

export default function Client() {
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
            <Header title={"Cliente"} icon={<RiUser2Line size={40} />}></Header>
            <div className="client-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/client">
                    <button type="button" className={`button tab-active`}>
                      <RiBookLine size={24} />
                      Dados
                    </button>
                  </Link>

                  <Link to="/people/client/new">
                    <button type="button" className={`button `} id="add-client">
                      <RiAddLine size={24} />
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form onSubmit={handleRequestOs}>
                  <div className="form-title">
                    <RiCheckDoubleLine size={30} />
                    <h1>DADOS CADASTRADOS</h1>
                  </div>

                  {/* <div className="input-group-client">
                    <h1>
                      <RiUser2Line size={30} />
                      Cliente
                    </h1>
                    <div className="input-block">
                      <div className="input-block-cod-client">
                        <label htmlFor="idClient">Código:</label>
                        <div className="input-block-client">
                          <input
                            type="text"
                            value={idClient}
                            style={{ width: "100px" }}
                            onChange={(e) => setIdClient(e.target.value)}
                            id="id_client"
                            required
                          />
                          <button type="button" className="button btnDefault">
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div className="input-block-name-company">
                        <label htmlFor="neighborhood">Razão Social:</label>

                        <input
                          type="text"
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          id="client"
                          readonly="true"
                          required
                        />
                      </div>
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
                            type="checkbox"
                            id="cbClientOrigin"
                            disabled="true"
                          />
                          <label htmlFor="cbClientOrigin">Cliente</label>
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="neighborhood">Bairro:</label>

                        <input
                          type="text"
                          value={neighborhoodOrigin}
                          onChange={(e) =>
                            setNeighborhoodOrigin(e.target.value)
                          }
                          readonly="true"
                          required
                        />
                      </div>
                      <div className="street-number-block">
                        <div className="input-block">
                          <label htmlFor="street">Rua:</label>
                          <input
                            type="text"
                            value={streetOrigin}
                            onChange={(e) => setStreetOrigin(e.target.value)}
                            readonly="true"
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
                            readonly="true"
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
                          readonly="true"
                          required
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
                            type="checkbox"
                            id="cbClientDestiny"
                            disabled="true"
                          />
                          <label htmlFor="cbClientDestiny">Cliente</label>
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="neighborhood">Bairro:</label>
                        <input
                          type="text"
                          value={neighborhoodDestiny}
                          onChange={(e) =>
                            setNeighborhoodDestiny(e.target.value)
                          }
                          readonly="true"
                          required
                        />
                      </div>
                      <div className="street-number-block">
                        <div className="input-block">
                          <label htmlFor="street">Rua:</label>
                          <input
                            type="text"
                            value={streetDestiny}
                            onChange={(e) => setStreetDestiny(e.target.value)}
                            readonly="true"
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
                            readonly="true"
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
                          readonly="true"
                          required
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className="button-group">
                    {/* <button
                      type="button"
                      className="button btnCancel btnInactive"
                      disabled="true"
                    >
                      <RiCloseLine size={30} />
                      Cancelar
                    </button> */}
                    <button
                      type="submit"
                      className="button btnDefault btnInactive"
                      disabled="true"
                    >
                      <RiPencilLine size={24} />
                      Alterar
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
