import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";

import { isAuthenticated } from "../../services/auth";

import { RiFileListLine, RiPhoneLine, RiFileList2Line } from "react-icons/ri";

import "./styles.css";

export default function ServiceOrders() {
  //#region Definitions
  let history = useHistory();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [AlterTab, setAlterTab] = useState("Solicitar");
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

  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <div className="content-container">
        <Header
          title={"Ordens de Serviço"}
          icon={<RiFileListLine size={40} />}
        ></Header>
        <>
          {loading ? (
            <Loading type="bars" color="#0f4c82" />
          ) : (
            <div className="os-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/serviceorders">
                    <button type="button" className={`button tab-active`}>
                      <RiFileList2Line size={24} />
                      Consultar
                    </button>
                  </Link>

                  <Link to="/serviceorders/request">
                    <button type="button" className={`button`}>
                      <RiPhoneLine size={24} />
                      Solicitar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
