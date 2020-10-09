/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import {
  RiSearchLine,
  RiCloseLine,
  RiCheckLine,
  RiQuestionLine,
  RiLoader4Line,
  RiCheckboxMultipleLine,
  RiUserLocationLine,
  RiUserLine,
  RiAddCircleLine,
  RiArrowLeftLine,
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

export default function DriverNew() {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [isReadonly, setIsReadonly] = useState(false);

  // const [personFinded, setPersonFinded] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSave, setTextButtonSave] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [idPerson, setIdPerson] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [cnh, setCnh] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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

  // #region Fill Fields
  // function fillFields(response) {
  //   const { name, cpf_cnpj, rg, phone, email, active } = response.person;

  //   const typeIds = response.peopleType.map((index) => index.id);

  //   console.log(typeIds);

  //   console.log(typeIds.includes("1"));

  //   name ? setName(name) : setName("");

  //   cpf_cnpj ? setCpf_cnpj(cpf_cnpj) : setCpf_cnpj("");

  //   rg ? setRg(rg) : setRg("");

  //   phone ? setPhone(phone) : setPhone("");

  //   email ? setEmail(email) : setEmail("");

  //   typeIds.includes("1") ? setCheckedStatus(true) : setCheckedStatus(false);

  //   typeIds.includes("2")
  //     ? setCheckedTypeAttendance("true")
  //     : setCheckedTypeAttendance(false);
  // }
  // #endregion

  // #region Clear Fields
  function clearFields(withCode) {
    if (withCode) {
      setIdPerson("");
    }

    setPhone("");
    setEmail("");
    setCheckedStatus(false);
  }

  // #endregion

  // #region alter page to consult
  function alterPageUpdateForConsult() {
    // setPersonFinded(false);
    clearFields(true);
    setIsReadonly(true);
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

  // #region Load Data Person
  async function loadDataPerson(id) {
    try {
      clearFields();

      // setPersonFinded(false);

      const response = await api.get(`/person/${id}`);

      if (response) {
        // setPersonFinded(true);
        // fillFields(response.data);
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // setPersonFinded(false);

        const dataError = error.response.data;
        const statusError = error.response.status;

        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          console.log(dataError.message);
          switch (dataError.message) {
            case '"idPerson" must be a number':
              notify("warning", "O código da pessoa precisa ser um número.");
              break;
            case '"idPerson" must be a positive number':
              notify(
                "warning",
                "O código de pessoa deve ser maior ou igual a 1."
              );
              break;

            default:
              notify("warning", dataError.message);
          }
        }
      } else if (error.request) {
        // setPersonFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        // setPersonFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log("Error", error.message);
      }
    }
  }

  // #endregion

  // #region Handle Search Person
  function handleSearchPerson(idPerson) {
    if (idPerson) {
      loadDataPerson(idPerson);
    } else {
      clearFields();
    }
  }
  // #endregion

  // #region Update Person
  // async function updatePerson() {
  //   const dataPerson = {
  //     idPerson,
  //     companyName,
  //     // fantasyName,
  //     cnh,
  //     phone,
  //     email,
  //     // idNeighborhood,
  //     // street,
  //     // streetNumber,
  //     // complement,
  //     status: checkedStatus,
  //   };

  //   setTextButtonSave("Aguarde...");
  //   setLoadingButton(true);
  //   setBtnInactive("btnInactive");

  //   console.log(dataPerson);

  //   try {
  //     const response = await api.put("/person/update", dataPerson);

  //     if (response) {
  //       console.log(response.data);
  //       alterPageUpdateForConsult();

  //       notify("success", response.data.message);

  //       setTextButtonSave("Salvar");
  //       setLoadingButton(false);
  //       setBtnInactive("");
  //     }
  //   } catch (error) {
  //     setTextButtonSave("Salvar");
  //     setLoadingButton(false);
  //     setBtnInactive("");

  //     if (error.response) {
  //       const dataError = error.response.data;
  //       const statusError = error.response.status;
  //       console.error(dataError);
  //       console.error(statusError);

  //       if (statusError === 400 && dataError.message) {
  //         console.log(dataError.message);
  //         switch (dataError.message) {
  //           case '"email" must be a valid email':
  //             notify("warning", "O e-mail informado precisa ser válido.");
  //             break;
  //           case '"cpf_cnpj" length must be at least 9 characters long':
  //             notify(
  //               "warning",
  //               "O CPF informado precisa ter no mínimo 9 caracteres"
  //             );
  //             break;
  //           case '"cpf_cnpj" length must be less than or equal to 11 characters long':
  //             notify(
  //               "warning",
  //               "O CPF informado pode ter no máximo 11 caracteres"
  //             );
  //             break;

  //           default:
  //             notify("warning", dataError.message);
  //         }
  //       }

  //       if (statusError === 401) {
  //         switch (dataError.message) {
  //           default:
  //             notify("warning", dataError.message);
  //         }
  //       }
  //     } else if (error.request) {
  //       notify(
  //         "error",
  //         `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
  //       );
  //       console.log(error.request);
  //     } else {
  //       notify(
  //         "error",
  //         `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
  //       );
  //       console.log("Error", error.message);
  //     }
  //   }
  // }
  // #endregion

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

  // #region Handle Submit Update
  function handleSubmitUpdate(e) {
    e.preventDefault();

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR essa alteração?",
      "updatePerson"
    );
  }
  // #endregion

  // #region Handle Cancel Update
  // async function handleCancelUpdate() {
  //   confirmationAlert(
  //     "Atenção!",
  //     "Deseja realmente CANCELAR essa alteração? Os dados não salvos serão perdidos.",
  //     "alterPageUpdateForConsult"
  //   );
  // }
  // #endregion

  // #region Handle Update Register
  // function handleUpdateRegister() {
  //   if (personFinded) {
  //     setIsReadonly(false);
  //   } else if (idPerson.length === 0) {
  //     notify(
  //       "warning",
  //       "Para acessar a alteração de dados primeiro selecione a pessoa desejada."
  //     );
  //   } else {
  //     notify(
  //       "warning",
  //       "Não foi possível acessar a alteração de dados, pois nenhuma pessoa foi encontrada."
  //     );
  //   }
  // }
  // #endregion

  // #region Handle Cancel Create
  async function handleCancel() {
    if (
      companyName !== "" ||
      // fantasyName !== "" ||
      // idNeighborhood !== "" ||
      // neighborhood !== "" ||
      // street !== "" ||
      // streetNumber !== "" ||
      // complement !== "" ||
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

  function returnPageConsult() {
    history.push("/people/driver");
  }

  // #region Handle Return Page Consult
  async function handleReturn() {
    if (
      companyName !== "" ||
      // fantasyName !== "" ||
      // idNeighborhood !== "" ||
      // neighborhood !== "" ||
      // street !== "" ||
      // streetNumber !== "" ||
      // complement !== "" ||
      phone !== "" ||
      email !== ""
    ) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente VOLTAR para a página de consulta de motoristas? Os dados não salvos serão perdidos.",
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

            <Header title="Motorista" icon={<RiUserLocationLine size={40} />} />
            <div className="driver-new-container">
              <div className="tab-bar">
                <div className="group-tabs"></div>
              </div>

              <section className="form">
                <form onSubmit={handleSubmitUpdate}>
                  <div className="form-title">
                    <RiAddCircleLine size={30} />
                    <h1>NOVO MOTORISTA</h1>
                  </div>

                  <div className="input-group-driver-new">
                    <h1>
                      <RiUserLine size={30} />
                      Pessoa
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cod"
                      >
                        <label htmlFor="idPerson">Código:</label>

                        <div className="input-button-block-row">
                          <input
                            id="idPerson"
                            type="number"
                            min="1"
                            required
                            value={idPerson}
                            onChange={(e) => setIdPerson(e.target.value)}
                            onBlur={() => {
                              handleSearchPerson(idPerson);
                            }}
                            onKeyUp={(e) => {
                              if (idPerson.length === 0) {
                                clearFields();
                                clearFields();
                              }
                            }}
                          />

                          <button type="button" className="button btnDefault">
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="companyName">Nome:</label>

                        <input
                          id="companyName"
                          type="text"
                          readOnly={isReadonly}
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="input-label-group-row">
                      <div className="input-label-block-column">
                        <label htmlFor="cnh">CNH:</label>

                        <input
                          id="cnh"
                          type="text"
                          minLength="10"
                          maxLength="11"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          readOnly={isReadonly}
                          required
                          value={cnh}
                          onChange={(e) => setCnh(e.target.value)}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="numPermit">Número do Alvará:</label>

                        <input
                          id="numPermit"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          minLength="10"
                          maxLength="11"
                          readOnly={isReadonly}
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="phone">Telefone Empresarial:</label>

                        <input
                          id="phone"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          minLength="10"
                          maxLength="11"
                          readOnly={isReadonly}
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-driver-new">
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
                            disabled={isReadonly}
                            value="1"
                            checked={checkedStatus}
                            onClick={() => {
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
