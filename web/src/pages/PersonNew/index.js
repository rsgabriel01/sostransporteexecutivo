import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import notify from "../../helpers/notifys";
import { onlyNumber } from "../../helpers/onlyNumber";
import { ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

import api from "../../services/api";

import { isAuthenticated, logout } from "../../services/auth";

import {
  RiUserLine,
  RiUserStarLine,
  RiCloseLine,
  RiCheckLine,
  RiQuestionLine,
  RiLoader4Line,
  RiArrowLeftLine,
  RiAddCircleLine,
} from "react-icons/ri";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function PersonNew() {
  // #region Definitions
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSave, setTextButtonSave] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [name, setName] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [checkedTypeAdmin, setCheckedTypeAdmin] = useState(false);
  const [checkedTypeAttendance, setCheckedTypeAttendance] = useState(false);
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

  // #region Alert confirmation
  function confirmationAlert(title, message, functionExecute) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
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
                        case "cancelCreate":
                          clearFields();
                          break;
                        case "createPerson":
                          createPerson();
                          break;
                        case "returnPageConsult":
                          returnPageConsult();
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
        );
      },
    });
  }
  // #endregion

  // #region Clear Fields
  function clearFields() {
    setName("");
    setCpf_cnpj("");
    setRg("");
    setPhone("");
    setEmail("");
    setCheckedTypeAdmin(false);
    setCheckedTypeAttendance(false);
  }
  // #endregion

  // #region Handle Check Checkbox
  function handleCheckBox(checkbox) {
    switch (checkbox) {
      case "cbAdmin":
        setCheckedTypeAdmin(!checkedTypeAdmin);
        break;

      case "cbAttendance":
        setCheckedTypeAttendance(!checkedTypeAttendance);
        break;

      default:
        break;
    }
  }
  // #endregion

  // #region Handle Submit Update
  function handleSubmit(e) {
    e.preventDefault();

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR esse cadastro?",
      "createPerson"
    );
  }
  // #endregion

  // #region Update Person
  async function createPerson() {
    let dataPerson = {
      name: name.toUpperCase(),
      cpf_cnpj,
      rg,
      phone,
      email,
      typeAdmin: checkedTypeAdmin,
      typeAttendance: checkedTypeAttendance,
    };

    setTextButtonSave("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    // alert(JSON.stringify(dataPerson));

    try {
      const response = await api.post("/person/create", dataPerson);

      if (response) {
        console.log(response.data);
        clearFields();
        const { id } = response.data.createdPersonComplete;

        notify("success", `${response.data.message} Código da pessoa: ${id}`);

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
                "O CPF informado precisa ter no mínimo 9 caracteres."
              );
              break;

            case '"cpf_cnpj" length must be less than or equal to 11 characters long':
              notify(
                "warning",
                "O CPF informado pode ter no máximo 11 caracteres."
              );
              break;

            case '"rg" length must be at least 7 characters long':
              notify(
                "warning",
                "O RG informado precisa ter no mínimo 7 caracteres."
              );
              break;

            case '""rg" length must be less than or equal to 12 characters long"':
              notify(
                "warning",
                "O RG informado pode ter no máximo 12 caracteres."
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

  // #region Handle Cancel Create
  async function handleCancel() {
    if (
      name !== "" ||
      cpf_cnpj !== "" ||
      rg !== "" ||
      phone !== "" ||
      email !== ""
    ) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR esse cadastro? Os dados não salvos serão perdidos.",
        "clearFields"
      );
    }
  }

  // #endregion

  // #region Handle Return Page Consult
  async function handleReturn() {
    if (
      name !== "" ||
      cpf_cnpj !== "" ||
      rg !== "" ||
      phone !== "" ||
      email !== ""
    ) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente VOLTAR para a página de consulta de pessoas? Os dados não salvos serão perdidos.",
        "returnPageConsult"
      );
    } else {
      returnPageConsult();
    }
  }

  function returnPageConsult() {
    history.push("/people/person");
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

            <Header title={"Pessoa Física"} icon={<RiUserLine size={40} />} />

            <div className="person-new-container">
              <div className="tab-bar">
                <div className="group-tabs"></div>
              </div>

              <section className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-title">
                    <RiAddCircleLine size={30} />
                    <h1>NOVA PESSOA FÍSICA</h1>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiUserLine size={30} />
                      Pessoa
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-block-column">
                        <label htmlFor="name">Nome:</label>

                        <input
                          id="name"
                          type="text"
                          required
                          autoFocus
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cpf-rg"
                      >
                        <label htmlFor="cpf_cnpj">CPF:</label>

                        <input
                          id="cpf_cnpj"
                          type="text"
                          minLength="9"
                          maxLength="11"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          required
                          value={cpf_cnpj}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setCpf_cnpj(e.target.value);
                          }}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cpf-rg"
                      >
                        <label htmlFor="rg">RG:</label>

                        <input
                          id="rg"
                          type="text"
                          minLength="8"
                          maxLength="12"
                          title="Esse campo aceita apenas números."
                          pattern="[0-9]+"
                          required
                          value={rg}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setRg(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="input-label-group-row">
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
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setPhone(e.target.value);
                          }}
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiUserStarLine size={30} />
                      Tipo de pessoa
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-group-row">
                        <div className="checkbox-block">
                          <input
                            type="checkbox"
                            id="cbAdmin"
                            onClick={() => {
                              handleCheckBox("cbAdmin");
                            }}
                          />
                          <label htmlFor="cbAdmin">Administrador</label>
                        </div>

                        <div className="checkbox-block">
                          <input
                            type="checkbox"
                            id="cbAttendance"
                            onClick={() => {
                              handleCheckBox("cbAttendance");
                            }}
                          />
                          <label htmlFor="cbAttendance">Atendente</label>
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
