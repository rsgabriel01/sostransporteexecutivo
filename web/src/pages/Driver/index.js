import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import api from "../../services/api";

import { isAuthenticated } from "../../services/auth";

import {
  RiBookLine,
  RiAddLine,
  RiCheckDoubleLine,
  RiUserLocationLine,
  RiPencilLine,
} from "react-icons/ri";

// import "./styles.css";

export default function Driver() {
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
              title={"Motorista"}
              icon={<RiUserLocationLine size={40} />}
            ></Header>
            <div className="driver-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/driver">
                    <button type="button" className={`button tab-active`}>
                      <RiBookLine size={24} />
                      Dados
                    </button>
                  </Link>

                  <Link to="/people/driver/new">
                    <button type="button" className={`button `} id="add-driver">
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
                      <RiPencilLine size={25} />
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
