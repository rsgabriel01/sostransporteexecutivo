/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
  RiArrowRightUpLine,
} from "react-icons/ri";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import notify from "../../helpers/notifys";
import { onlyNumber } from "../../helpers/onlyNumber";

import api from "../../services/api";

import { isAuthenticated, logout } from "../../services/auth";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import jsonClassesModal from "../../helpers/stylesModal";

export default function DriverNew() {
  // #region Definitions

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSave, setTextButtonSave] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [idPerson, setIdPerson] = useState("");
  const [namePerson, setNamePerson] = useState("");
  const [cnh, setCnh] = useState("");
  const [numPermit, setNumPermit] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();

  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();
  const cnhInputRef = useRef(null);

  const [openModalSearchPerson, setOpenModalSearchPerson] = useState(false);
  const [searchPerson, setSearchPerson] = useState("");
  const [searchPersonList, setSearchPersonList] = useState([]);

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
    setIdPerson("");

    setNamePerson("");
    setCnh("");
    setNumPermit("");
    setBusinessPhone("");
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

  // #region Creare Driver
  async function createDriver() {
    const dataDriver = {
      idPerson,
      cnh,
      numPermit,
      businessPhone,
      active: checkedStatus,
    };

    setTextButtonSave("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataDriver);

    try {
      const response = await api.post("/driver/create", dataDriver);

      if (response) {
        console.log(response.data);

        notify("success", response.data.message);

        clearFields();
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
                      case "createDriver":
                        createDriver();
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

  // #region Handle Submit
  function handleSubmit(e) {
    e.preventDefault();
    if (idPerson === "" || namePerson === "") {
      notify(
        "warning",
        "A pessoa a ser cadastrada como motorista deve ser informada, por favor verifique."
      );
      return;
    }

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR esse cadastro?",
      "createDriver"
    );
  }
  // #endregion

  //#region Verify Field Filled
  const fieldsIsFilled = () => {
    if (
      idPerson !== "" ||
      namePerson !== "" ||
      cnh !== "" ||
      numPermit !== "" ||
      businessPhone !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  // #endregion

  // #region Handle Cancel Create
  async function handleCancel() {
    if (fieldsIsFilled()) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR esse cadastro? Os dados não salvos serão perdidos.",
        "clearFields"
      );
    }
  }
  // #endregion

  // #region Handle Return Page Consult
  function returnPageConsult() {
    history.push("/people/driver");
  }

  function handleReturn() {
    if (fieldsIsFilled()) {
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

  // #region Handle Open Modal Search Person
  const handleOpenModalSearchPerson = () => {
    setLoadingModal(true);
    loadSearchPersonList();

    setTitleIconModal(<RiUserLine size={30} />);
    setTitleModal("PESQUISAR PESSOAS");
    setOpenModalSearchPerson(true);
  };

  const handleCloseModalSearchPersonEdit = () => {
    setTitleModal("");
    setSearchPerson("");
    setOpenModalSearchPerson(false);
  };
  // #endregion

  // #region Handle Select Search Person
  function handleSelectPersonInSearch(id, name) {
    setIdPerson(id);
    setNamePerson(name);
    handleCloseModalSearchPersonEdit();
    inputFocusCnh();
  }

  function inputFocusCnh() {
    setTimeout(() => {
      cnhInputRef.current.focus();
    }, 1);
  }
  // #endregion

  // #region Load Search Modal Person List
  async function loadSearchPersonList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/people/active/nondriver/?name=${searchPerson.toUpperCase()}`
      );

      if (response) {
        console.log(response.data);

        setSearchPersonList(response.data);
        setLoadingModal(false);
      }
    } catch (error) {
      setLoadingModal(false);

      if (error.response) {
        const dataError = error.response.data;
        const statusError = error.response.status;
        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          console.log(dataError.message);
          switch (dataError.message) {
            case '"name" is required':
              notify(
                "error",
                "Oops, algo deu errado, entre em contato com o suporte de TI. Erro: o QUERY PARAM 'name' não foi encontrado no endereço da rota."
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

  return (
    <div className="main-container">
      <Modal
        id="modalSearchPerson"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalSearchPerson}
        onClose={handleCloseModalSearchPersonEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchPerson}>
          <div className={ClassesModal.paper}>
            <h1 className="modal-search-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-search-content">
              <div className="modal-search-input-button">
                <div className="input-label-block-colum">
                  <label htmlFor="inputSearchPerson">Nome:</label>
                  <input
                    id="inputSearchPerson"
                    type="text"
                    value={searchPerson}
                    onChange={(e) => setSearchPerson(e.target.value)}
                    onKeyUp={loadSearchPersonList}
                  ></input>
                </div>

                <button
                  type="button"
                  className="button btnDefault btnSearchModal"
                  onClick={loadSearchPersonList}
                >
                  <RiSearchLine size={24} />
                  Buscar
                </button>
              </div>

              <div className="modal-search-list">
                {loadingModal ? (
                  <Loading type="bars" color="#0f4c82" />
                ) : (
                  searchPersonList.map((person) => (
                    <div
                      className="searchListIten"
                      key={person.id}
                      onDoubleClick={() =>
                        handleSelectPersonInSearch(person.id, person.name)
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {person.id}</strong>
                        <section id="searchPersonDataInDriverUpdate">
                          <p id="searchNamePerson">
                            <strong>Nome: </strong>
                            {person.name}
                          </p>
                          <p id="searchCpfPerson">
                            <strong>CPF: </strong>
                            {person.cpf_cnpj}
                          </p>
                          <p id="searchRgPerson">
                            <strong>RG: </strong>
                            {person.rg}
                          </p>
                        </section>
                      </div>
                      <div className="clientBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() =>
                            handleSelectPersonInSearch(person.id, person.name)
                          }
                        >
                          <RiArrowRightUpLine />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>

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
                <form onSubmit={handleSubmit}>
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
                            autoFocus
                            readOnly
                            required
                            value={idPerson}
                            onChange={(e) => setIdPerson(e.target.value)}
                          />

                          <button
                            type="button"
                            className="button btnDefault"
                            onClick={() => {
                              handleOpenModalSearchPerson();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="namePerson">Nome:</label>

                        <input
                          id="namePerson"
                          type="text"
                          readOnly
                          required
                          value={namePerson}
                          onChange={(e) => setNamePerson(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="input-label-group-row">
                      <div className="input-label-block-column">
                        <label htmlFor="cnh">CNH:</label>

                        <input
                          ref={cnhInputRef}
                          id="cnh"
                          type="text"
                          minLength="10"
                          maxLength="11"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          required
                          value={cnh}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setCnh(e.target.value);
                          }}
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
                          type="text"
                          value={numPermit}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setNumPermit(e.target.value);
                          }}
                          required
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="businessPhone">
                          Telefone Empresarial:
                        </label>

                        <input
                          id="businessPhone"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          minLength="10"
                          maxLength="11"
                          type="text"
                          value={businessPhone}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setBusinessPhone(e.target.value);
                          }}
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
