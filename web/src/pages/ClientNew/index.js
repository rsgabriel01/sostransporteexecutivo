/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import {
  RiSearchLine,
  RiCloseLine,
  RiCheckLine,
  RiQuestionLine,
  RiLoader4Line,
  RiCheckboxMultipleLine,
  RiMapPinLine,
  RiAddCircleLine,
  RiArrowLeftLine,
  RiUser2Line,
} from "react-icons/ri";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import notify from "../../helpers/notifys";

import api from "../../services/api";

import { isAuthenticated, logout } from "../../services/auth";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ClientNew() {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [isReadonly, setIsReadonly] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSave, setTextButtonSave] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idNeighborhood, setIdNeighborhood] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [complement, setComplement] = useState("");

  const [checkedStatus, setCheckedStatus] = useState(false);
  // #endregion

  // #region Verify Session
  async function virifyAuthorization() {
    const response = await isAuthenticated();
    if (!response) {
      logout();
      history.push("/");
    } else {
      setLoading(false);
    }
  }
  // #endregion

  // #region useEffect
  useEffect(() => {
    virifyAuthorization();
  }, []);
  // #endregion

  // #region Clear Fields
  function clearFields() {
    setCompanyName("");
    setFantasyName("");
    setCpfCnpj("");
    setPhone("");
    setEmail("");
    setIdNeighborhood("");
    setNeighborhood("");
    setStreet("");
    setStreetNumber("");
    setComplement("");
    setCheckedStatus(false);
  }

  // #endregion

  // #region Handle Check Checkbox
  function handleCheckBox(checkbox) {
    switch (checkbox) {
      case "cbStatus":
        console.log(`Status anterior ${checkedStatus}`);
        setCheckedStatus(!checkedStatus);

        break;
      default:
        break;
    }
  }
  // #endregion

  // #region Update Person
  async function createClient() {
    const dataPerson = {
      companyName,
      fantasyName,
      cpfCnpj,
      phone,
      email,
      idNeighborhood,
      street,
      streetNumber,
      complement,
      active: checkedStatus,
    };

    setTextButtonSave("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataPerson);

    try {
      const response = await api.post("/clients/create", dataPerson);

      if (response) {
        console.log(response.data);

        notify("success", response.data.message);

        setTextButtonSave("Salvar");
        setLoadingButton(false);
        setBtnInactive("");
      }
    } catch (error) {
      setTextButtonSave("Salvar");
      setLoadingButton(false);
      setBtnInactive("");

      if (error.response) {
        const dataError = error.response.data;
        const statusError = error.response.status;
        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          console.log(dataError.message);
          switch (dataError.message) {
            case '"email" must be a valid email':
              notify("warning", "O e-mail informado precisa ser válido.");
              break;
            case '"cpf_cnpj" length must be at least 9 characters long':
              notify(
                "warning",
                "O CPF informado precisa ter no mínimo 9 caracteres"
              );
              break;
            case '"cpf_cnpj" length must be less than or equal to 11 characters long':
              notify(
                "warning",
                "O CPF informado pode ter no máximo 11 caracteres"
              );
              break;

            default:
              notify("warning", dataError.message);
          }
        }

        if (statusError === 401) {
          switch (dataError.message) {
            default:
              notify("warning", dataError.message);
          }
        }
      } else if (error.request) {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log("Error", error.message);
      }
    }
  }
  // #endregion

  function returnPageConsult() {
    history.push("/people/client");
  }

  // #region Alert confirmation
  function confirmationAlert(title, message, functionExecute) {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom-ui">
          <div className="content">
            <div className="header">
              <RiQuestionLine size={70} />
              <h1>{title}</h1>
            </div>

            <p>{message}</p>
          </div>

          <div className="alert-button-group-column">
            <div className="alert-button-group-row">
              <div className="alert-button-block">
                <button onClick={onClose} className="button btnCancel">
                  <RiCloseLine size={25} />
                  Não
                </button>
                <button
                  className="button btnSuccess"
                  onClick={() => {
                    switch (functionExecute) {
                      case "returnPageConsult":
                        returnPageConsult();
                        break;
                      case "clearFields":
                        clearFields();
                        break;

                      case "createClient":
                        createClient();
                        break;
                      default:
                        break;
                    }
                    onClose();
                  }}
                >
                  <RiCheckLine size={25} />
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    });
  }
  // #endregion

  // #region Handle Cancel Create
  async function handleCancel() {
    if (
      companyName !== "" ||
      fantasyName !== "" ||
      cpfCnpj !== "" ||
      phone !== "" ||
      email !== "" ||
      idNeighborhood !== "" ||
      neighborhood !== "" ||
      street !== "" ||
      streetNumber !== "" ||
      complement !== ""
    ) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR esse cadastro? Os dados não salvos serão perdidos.",
        "clearFields"
      );
    }
  }
  // #endregion

  // #region Handle Submit Update
  function handleSubmit(e) {
    e.preventDefault();

    // if (idNeighborhood === "" || neighborhood == "") {
    //   notify(
    //     "warning",
    //     "Os dados do bairro devem estar preenchidos, por favor verifique."
    //   );
    //   return;
    // }

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR esse cadastro?",
      "createClient"
    );
  }
  // #endregion

  // #region Handle Return Page Consult
  async function handleReturn() {
    if (
      companyName !== "" ||
      fantasyName !== "" ||
      cpfCnpj !== "" ||
      phone !== "" ||
      email !== "" ||
      idNeighborhood !== "" ||
      neighborhood !== "" ||
      street !== "" ||
      streetNumber !== "" ||
      complement !== ""
    ) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente VOLTAR para a página de consulta de clientes? Os dados não salvos serão perdidos.",
        "returnPageConsult"
      );
    } else {
      returnPageConsult();
    }
  }
  // #endregion

  return (
    <div className="main-container">
      <LateralMenu />
      <>
        {loading ? (
          <Loading type="bars" color="#0f4c82" />
        ) : (
          <div className="content-container">
            <ToastContainer />

            <Header title="Cliente" icon={<RiUser2Line size={40} />} />
            <div className="client-container">
              <div className="tab-bar">
                <div className="group-tabs" />
              </div>

              <section className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-title">
                    <RiAddCircleLine size={30} />
                    <h1>NOVO CLIENTE</h1>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiUser2Line size={30} />
                      Cliente
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="companyName">Razão Social:</label>

                        <input
                          id="companyName"
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="fantasyName">Nome Fantasia:</label>

                        <input
                          id="fantasyName"
                          type="text"
                          required
                          value={fantasyName}
                          onChange={(e) => setFantasyName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cpf-rg"
                      >
                        <label htmlFor="cpfCnpj">CNPJ:</label>

                        <input
                          id="cpfCnpj"
                          type="text"
                          minLength="14"
                          maxLength="14"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          required
                          value={cpfCnpj}
                          onChange={(e) => setCpfCnpj(e.target.value)}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-phone"
                      >
                        <label htmlFor="phone">Telefone:</label>

                        <input
                          id="phone"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          minLength="10"
                          maxLength="11"
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="email">E-mail:</label>

                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          readOnly={isReadonly}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiMapPinLine size={30} />
                      Endereço
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-neighborhood"
                      >
                        <label htmlFor="neighborhood">Bairro:</label>

                        <div className="input-button-block-row">
                          <input
                            id="neighborhood"
                            type="text"
                            value={neighborhood}
                            required
                            readOnly
                            onChange={(e) => setNeighborhood(e.target.value)}
                            // onBlur={() => {
                            //   // handleSearchPerson(idNeighborhood);
                            // }}
                            // onKeyUp={(e) => {
                            //   if (neighborhood.length === 0) {
                            //     clearFields();
                            //     clearFields();
                            //   }
                            // }}
                          />

                          <button
                            type="button"
                            className="button btnDefault"
                            id="btnNeighborhood"
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-street"
                      >
                        <label htmlFor="street">Rua:</label>

                        <input
                          id="street"
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          required
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-street-number"
                      >
                        <label htmlFor="streetNumber">Número:</label>

                        <input
                          type="number"
                          min="1"
                          required
                          value={streetNumber}
                          onChange={(e) => setStreetNumber(e.target.value)}
                          id="streetNumber"
                          readOnly={isReadonly}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-complement"
                      >
                        <label htmlFor="complement">Complemento:</label>

                        <input
                          type="complement"
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          id="complement"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiCheckboxMultipleLine size={30} />
                      Status
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-group-row">
                        <div className="checkbox-block">
                          <input
                            type="checkbox"
                            id="cbStatus"
                            value="1"
                            checked={checkedStatus}
                            onChange={() => {
                              handleCheckBox("cbStatus");
                            }}
                          />
                          <label htmlFor="cbStatus">Ativo</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button-group-forms">
                    <button
                      type="button"
                      className={`button btnReturn ${btnInactive}`}
                      disabled={loadingButton}
                      onClick={() => {
                        handleReturn();
                      }}
                    >
                      <RiArrowLeftLine size={30} />
                      Voltar
                    </button>
                    <button
                      type="button"
                      className={`button btnCancel ${btnInactive}`}
                      disabled={loadingButton}
                      onClick={() => {
                        handleCancel();
                      }}
                    >
                      <RiCloseLine size={30} />
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className={`button btnSuccess ${btnInactive}`}
                      disabled={loadingButton}
                    >
                      {!loadingButton ? (
                        <RiCheckLine size={25} />
                      ) : (
                        <RiLoader4Line
                          size={25}
                          className="load-spinner-button"
                        />
                      )}
                      {textButtonSave}
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
