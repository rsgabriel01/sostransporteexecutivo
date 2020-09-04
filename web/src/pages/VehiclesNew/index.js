import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import api from "../../services/api";

import { isAuthenticated } from "../../services/auth";

import {
  RiCheckLine,
  RiCloseLine,
  RiBookLine,
  RiTaxiLine,
} from "react-icons/ri";

// import "./styles.css";

export default function VehiclesNew() {
  //#region Definitions
  let history = useHistory();
  const [loading, setLoading] = useState(true);

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
            <Header title={"Veículos"} icon={<RiTaxiLine size={40} />}></Header>
            <div className="vehicles-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/vehicles/new">
                    <button type="button" className={`button tab-active`}>
                      <RiBookLine size={24} />
                      Dados
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form onSubmit={handleRequestOs}>
                  <div className="form-title">
                    <RiTaxiLine size={30} />
                    <h1>NOVO VEÍCULO</h1>
                  </div>

                  <div className="button-group">
                    <button
                      type="button"
                      className="button btnCancel"
                      disabled="true"
                    >
                      <RiCloseLine size={30} />
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="button btnSuccess"
                      disabled="true"
                    >
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
