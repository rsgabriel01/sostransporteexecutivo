/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  RiSearchLine,
  RiAddLine,
  RiPencilLine,
  RiCloseLine,
  RiCheckLine,
  RiBrushLine,
  RiQuestionLine,
  RiLoader4Line,
  RiSearchEyeLine,
  RiCheckboxMultipleLine,
  RiUserLocationLine,
  RiUserLine,
  RiBook2Line,
  RiArrowRightUpLine,
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
import jsonClassesModal from "../../helpers/stylesModal";

export default function Driver() {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  const [isReadonly, setIsReadonly] = useState(true);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [driverFinded, setDriverFinded] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");
  const [searchDriverInactive, setSearchDriverInactive] = useState(false);

  const [idDriver, setIdDriver] = useState("");
  const [idPerson, setIdPerson] = useState("");
  const [name, setName] = useState("");
  const [cnh, setCnh] = useState("");
  const [numPermit, setNumPermit] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();

  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();
  const idDriverInputRef = useRef(null);
  const cnhInputRef = useRef(null);

  const [openModalSearchPerson, setOpenModalSearchPerson] = useState(false);
  const [searchPerson, setSearchPerson] = useState("");
  const [searchPersonList, setSearchPersonList] = useState([]);

  const [openModalSearchDriver, setOpenModalSearchDriver] = useState(false);
  const [searchDriver, setSearchDriver] = useState("");
  const [searchDriverList, setSearchDriverList] = useState([]);

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
  function fillFields(response) {
    const { id_people, active } = response;
    const { name, cnh, numPermit, businessPhone } = response.People;

    id_people ? setIdPerson(id_people) : setIdPerson("");

    name ? setName(name) : setName("");

    cnh ? setCnh(cnh) : setCnh("");

    numPermit ? setNumPermit(numPermit) : setNumPermit("");

    businessPhone ? setBusinessPhone(businessPhone) : setBusinessPhone("");

    active ? setCheckedStatus(true) : setCheckedStatus(false);
  }
  // #endregion

  // #region Clear Fields
  function clearFields(withCode) {
    if (withCode) {
      setIdDriver("");
    }

    setIdPerson("");
    setName("");
    setCnh("");
    setNumPermit("");
    setBusinessPhone("");
    setCheckedStatus(false);
  }

  // #endregion

  // #region alter page to consult
  function alterPageUpdateForConsult() {
    setDriverFinded(false);
    clearFields(true);
    setTitleUpdate("");
    setUpdateRegister(false);
    setIsReadonly(true);
    setSearchDriverInactive(false);
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

  // #region Load Data Driver
  async function loadDataDriver(id) {
    try {
      clearFields();

      setDriverFinded(false);

      const response = await api.get(`/driver/${id}`);

      if (response) {
        setDriverFinded(true);
        fillFields(response.data);
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setDriverFinded(false);

        const dataError = error.response.data;
        const statusError = error.response.status;

        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          console.log(dataError.message);
          switch (dataError.message) {
            case '"idDriver" must be a number':
              notify("warning", "O código da pessoa precisa ser um número.");
              break;
            case '"idDriver" must be a positive number':
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
        setDriverFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        setDriverFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log("Error", error.message);
      }
    }
  }

  // #endregion

  // #region Handle Search Driver
  function handleSearchDriver(idDriver) {
    if (idDriver && !updateRegister) {
      loadDataDriver(idDriver);
      setUpdateRegister(false);
      setTitleUpdate("");
    }
  }
  // #endregion

  // #region Update Driver
  async function updatePerson() {
    const dataPerson = {
      idPerson,
      cnh,
      numPermit,
      businessPhone,
      active: checkedStatus,
    };

    setTextButtonSaveUpdate("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataPerson);

    try {
      const response = await api.put("/person/update", dataPerson);

      if (response) {
        console.log(response.data);
        alterPageUpdateForConsult();

        notify("success", response.data.message);

        setTextButtonSaveUpdate("Salvar");
        setLoadingButton(false);
        setBtnInactive("");
      }
    } catch (error) {
      setTextButtonSaveUpdate("Salvar");
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
                      case "alterPageUpdateForConsult":
                        alterPageUpdateForConsult();
                        break;
                      case "updatePerson":
                        updatePerson();
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
  async function handleCancelUpdate() {
    confirmationAlert(
      "Atenção!",
      "Deseja realmente CANCELAR essa alteração? Os dados não salvos serão perdidos.",
      "alterPageUpdateForConsult"
    );
  }
  // #endregion

  // #region Handle Update Register
  function handleUpdateRegister() {
    if (driverFinded) {
      setTitleUpdate("ALTERAR ");
      setUpdateRegister(true);
      setIsReadonly(false);
      setSearchDriverInactive(true);
    } else if (idDriver.length === 0) {
      notify(
        "warning",
        "Para acessar a alteração de dados primeiro selecione o motorista desejado."
      );
    } else {
      notify(
        "warning",
        "Não foi possível acessar a alteração de dados, pois nenhum motorista foi encontrado."
      );
    }
  }
  // #endregion

  // #region Handle Open Modal Search Driver
  const handleOpenModalSearchDriver = () => {
    setLoadingModal(true);
    loadSearchDriverList();

    setTitleIconModal(<RiUserLocationLine size={30} />);
    setTitleModal("PESQUISAR MOTORISTA");
    setOpenModalSearchDriver(true);
  };

  const handleCloseModalSearchDriverEdit = () => {
    setTitleModal("");
    setSearchDriver("");
    setOpenModalSearchDriver(false);
  };
  // #endregion

  // #region Handle Select Search Driver
  function handleSelectDriverInSearch(id) {
    clearFields();
    setIdDriver(id);
    handleCloseModalSearchDriverEdit();
    inputFocusIdDriver();
  }

  function inputFocusIdDriver() {
    setTimeout(() => {
      idDriverInputRef.current.focus();
    }, 1);
  }
  // #endregion

  // #region Load Search Modal Driver List
  async function loadSearchDriverList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/drivers/?name=${searchDriver.toUpperCase()}`
      );

      if (response) {
        console.log(response.data);

        setSearchDriverList(response.data);
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

  // #region Handle Open Modal Search Person
  const handleOpenModalSearchPersonEdit = () => {
    setLoadingModal(true);
    loadSearchPersonList();

    setTitleIconModal(<RiUserLine size={30} />);
    setTitleModal("PESQUISAR PESSOA");
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
    setName(name);
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
        `/people/active/?name=${searchPerson.toUpperCase()}`
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
        id="modalSearchDriver"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalSearchDriver}
        onClose={handleCloseModalSearchDriverEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchDriver}>
          <div className={ClassesModal.paper}>
            <h1 className="modal-search-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-search-content">
              <div className="modal-search-input-button">
                <div className="input-label-block-colum">
                  <label htmlFor="inputSearchDriver">Nome:</label>
                  <input
                    id="inputSearchDriver"
                    type="text"
                    value={searchDriver}
                    onChange={(e) => setSearchDriver(e.target.value)}
                    onKeyUp={loadSearchDriverList}
                  ></input>
                </div>

                <button
                  type="button"
                  className="button btnDefault btnSearchModal"
                  onClick={loadSearchDriverList}
                >
                  <RiSearchLine size={24} />
                  Buscar
                </button>
              </div>

              <div className="modal-search-list">
                {loadingModal ? (
                  <Loading type="bars" color="#0f4c82" />
                ) : (
                  searchDriverList.map((driver) => (
                    <div
                      className="searchListIten"
                      key={driver.id}
                      onDoubleClick={() =>
                        handleSelectDriverInSearch(driver.id)
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {driver.id}</strong>
                        <section id="searchDriverData">
                          <p id="searchNameDriver">
                            Nome: {driver.People.name}
                          </p>
                        </section>
                      </div>
                      <div className="clientBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() => handleSelectDriverInSearch(driver.id)}
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
                          <p id="searchNamePerson">Nome: {person.name}</p>
                          <p id="searchCpfPerson">CPF: {person.cpf_cnpj}</p>
                          <p id="searchRgPerson">RG: {person.rg}</p>
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
            <div className="driver-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/driver">
                    <button type="button" className="button tab-active">
                      <RiSearchEyeLine size={24} />
                      Consultar
                    </button>
                  </Link>

                  <Link to="/people/driver/new">
                    <button
                      type="button"
                      className="button add"
                      title="Cadastro de nova pessoa física."
                    >
                      <RiAddLine size={24} />
                      Criar
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form onSubmit={handleSubmitUpdate}>
                  <div className="form-title">
                    <RiBook2Line size={30} />
                    <h1>
                      {titleUpdate}
                      DADOS DE MOTORISTA
                    </h1>
                  </div>

                  <div className="input-group-driver">
                    <h1>
                      <RiUserLocationLine size={30} />
                      Motorista
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cod-driver"
                      >
                        <label htmlFor="idDriver">Código:</label>

                        <div className="input-button-block-row">
                          <input
                            ref={idDriverInputRef}
                            id="idDriver"
                            type="number"
                            min="1"
                            readOnly={searchDriverInactive}
                            required
                            value={idDriver}
                            onChange={(e) => setIdDriver(e.target.value)}
                            onBlur={() => {
                              handleSearchDriver(idDriver);
                            }}
                            onKeyUp={(e) => {
                              if (idDriver.length === 0) {
                                clearFields();
                                clearFields();
                              }
                            }}
                          />

                          <button
                            type="button"
                            disabled={searchDriverInactive}
                            className={`button btnDefault ${
                              searchDriverInactive ? "btnInactive" : ""
                            }`}
                            onClick={() => {
                              clearFields();
                              handleOpenModalSearchDriver();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="input-group-driver">
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
                            readOnly
                            onChange={(e) => setIdPerson(e.target.value)}
                          />

                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadonly ? "btnInactive" : ""
                            }`}
                            id="btnPerson"
                            disabled={isReadonly}
                            onClick={() => {
                              handleOpenModalSearchPersonEdit();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="name">Nome:</label>

                        <input
                          id="name"
                          type="text"
                          readOnly
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          value={numPermit}
                          onChange={(e) => setNumPermit(e.target.value)}
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
                          readOnly={isReadonly}
                          type="text"
                          value={businessPhone}
                          onChange={(e) => setBusinessPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-driver">
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
                    {updateRegister ? (
                      <>
                        <button
                          type="button"
                          className={`button btnCancel ${btnInactive}`}
                          disabled={loadingButton}
                          onClick={() => {
                            handleCancelUpdate();
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
                          {textButtonSaveUpdate}
                        </button>
                      </>
                    ) : (
                      <div>
                        <button
                          type="button"
                          className="button btnReturn"
                          onClick={() => {
                            clearFields(true);
                          }}
                        >
                          <RiBrushLine size={25} />
                          Limpar
                        </button>
                        <button
                          type="button"
                          className="button btnDefault"
                          onClick={() => {
                            handleUpdateRegister();
                          }}
                        >
                          <RiPencilLine size={25} />
                          Alterar
                        </button>
                      </div>
                    )}
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
