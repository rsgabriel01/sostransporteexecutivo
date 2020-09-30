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
  RiUserSharedLine,
  RiAddLine,
  RiUserLine,
  RiBook2Line,
  RiPencilLine,
  RiUserStarLine,
  RiCloseLine,
  RiCheckLine,
  RiBrushLine,
  RiQuestionLine,
  RiLoader4Line,
  RiSearchEyeLine,
  RiCheckboxMultipleLine,
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

export default function Person() {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  const [isReadonly, setIsReadonly] = useState(true);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [personFinded, setPersonFinded] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [idPeople, setIdPeople] = useState("");
  const [name, setName] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);
  const [checkedTypeAdmin, setCheckedTypeAdmin] = useState(false);
  const [checkedTypeAttendance, setCheckedTypeAttendance] = useState(false);

  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();
  const [openModalSearchPerson, setOpenModalSearchPerson] = useState(false);
  const idPersonInputRef = useRef(null);
  const [searchClient, setSearchClient] = useState("");
  const [searchClientList, setSearchClientList] = useState([]);
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "70%",
      height: "80%",
    },
  }));
  const classes = useStyles();

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
    const { name, cpf_cnpj, rg, phone, email, active } = response.person;
    console.log(response.peopleType);
    const typeIds = response.peopleType.map((index) => {
      if (index.Type_people.active) {
        return index.id;
      }
    });

    console.log(typeIds);

    console.log(typeIds.includes("1"));

    name ? setName(name) : setName("");

    cpf_cnpj ? setCpf_cnpj(cpf_cnpj) : setCpf_cnpj("");

    rg ? setRg(rg) : setRg("");

    phone ? setPhone(phone) : setPhone("");

    email ? setEmail(email) : setEmail("");

    active ? setActive(active) : setActive(false);

    typeIds.includes(1) || typeIds.includes("1")
      ? setCheckedTypeAdmin(true)
      : setCheckedTypeAdmin(false);

    typeIds.includes(2) || typeIds.includes("2")
      ? setCheckedTypeAttendance(true)
      : setCheckedTypeAttendance(false);
  }
  // #endregion

  // #region Clear Fields
  function clearFields(withCode) {
    if (withCode) {
      setIdPeople("");
      setPersonFinded(false);
    }

    setName("");
    setCpf_cnpj("");
    setRg("");
    setPhone("");
    setEmail("");
    setActive(false);
    setCheckedTypeAdmin(false);
    setCheckedTypeAttendance(false);
  }

  // #endregion

  // #region Alter Page Update To Consult
  function alterPageUpdateForConsult() {
    clearFields(true);
    setTitleUpdate("");
    setUpdateRegister(false);
    setIsReadonly(true);
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

      case "cbStatus":
        setActive(!active);
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

      setPersonFinded(false);

      const response = await api.get(`/person/${id}`);

      if (response) {
        setPersonFinded(true);
        fillFields(response.data);
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setPersonFinded(false);

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

        if (statusError === 401) {
          switch (dataError.message) {
            default:
              notify("warning", dataError.message);
          }
        }
      } else if (error.request) {
        setPersonFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        setPersonFinded(false);
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
      setUpdateRegister(false);
      setTitleUpdate("");
    } else {
      clearFields();
    }
  }
  // #endregion

  // #region Update Person
  async function updatePerson() {
    const dataPerson = {
      idPeople,
      name,
      cpf_cnpj,
      rg,
      phone,
      email,
      typeAdmin: checkedTypeAdmin,
      typeAttendance: checkedTypeAttendance,
      active: active,
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
    if (personFinded) {
      setTitleUpdate("ALTERAR ");

      setUpdateRegister(true);
      setIsReadonly(false);
    } else if (idPeople.length === 0) {
      notify(
        "warning",
        "Para acessar a alteração de dados primeiro selecione a pessoa desejada."
      );
    } else {
      notify(
        "warning",
        "Não foi possível acessar a alteração de dados, pois nenhuma pessoa foi encontrada."
      );
    }
  }
  // #endregion

  // #region Handle Open Modal Search Person
  const handleOpenModalSearchPersonEdit = () => {
    setLoadingModal(true);
    setTimeout(() => {
      loadSearchPersonList(true);
      setLoadingModal(false);
    }, 2000);
    setTitleIconModal(<RiUserLine size={30} />);
    setTitleModal("PESQUISAR PESSOA");
    setOpenModalSearchPerson(true);
  };

  const handleCloseModalSearchPersonEdit = () => {
    setTitleModal("");
    setOpenModalSearchPerson(false);
  };
  // #endregion

  // #region Handle Search Client
  function handleSelectClientInSearch(id) {
    setIdPeople(id);
    handleCloseModalSearchPersonEdit();
    inputFocusIdPerson();
  }

  function inputFocusIdPerson() {
    setTimeout(() => {
      idPersonInputRef.current.focus();
    }, 1);
  }
  // #endregion

  // #region Load Search Person List

  async function loadSearchPersonList(active) {
    setSearchClientList([
      {
        id: "1",
        cnpj: "123456787",
        companyName: "Gabriel Rodrigues Sozuza",
        fanstasyName: "Gabriel",
      },
    ]);
  }

  //#endregion
  return (
    <div className="main-container">
      <Modal
        id="modalSearchClient"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalSearchPerson}
        onClose={handleCloseModalSearchPersonEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchPerson}>
          <div className={classes.paper}>
            <h1 className="modal-search-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-search-content">
              <div className="modal-search-input-button">
                <div className="input-label-block-colum">
                  <label htmlFor="inputSearchClient">Nome:</label>
                  <input
                    id="inputSearchClient"
                    type="text"
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                  ></input>
                </div>

                <button
                  type="button"
                  className="button btnDefault btnSearchModal"
                >
                  <RiSearchLine size={24} />
                  Buscar
                </button>
              </div>

              <div className="modal-search-list">
                {loadingModal ? (
                  <Loading type="bars" color="#0f4c82" />
                ) : (
                  searchClientList.map((client) => (
                    <div className="searchListIten" key={client.id}>
                      <div className="searchItenData">
                        <strong>Código: {client.id}</strong>
                        <section id="searchClientData">
                          <p id="searchCnpjClient">CNPJ: {client.cnpj}</p>
                          <p id="searchCompanyNameClient">
                            Razão Social: {client.companyName}
                          </p>
                          <p id="searchNameFantasyClient">
                            Nome Fantasia: {client.fanstasyName}
                          </p>
                        </section>
                      </div>
                      <div className="clientBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() => handleSelectClientInSearch(client.id)}
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

            <Header title="Pessoa Física" icon={<RiUserLine size={40} />} />
            <div className="person-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/person">
                    <button type="button" className="button tab-active">
                      <RiSearchEyeLine size={24} />
                      Consultar
                    </button>
                  </Link>

                  <Link to={`/people/person/user/${idPeople}`}>
                    <button
                      type="button"
                      className={
                        personFinded ? "button" : "button btn-tab-inactive"
                      }
                      disabled={!personFinded}
                    >
                      <RiUserSharedLine size={24} />
                      Usuário
                    </button>
                  </Link>

                  <Link to="/people/person/new">
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
                      DADOS DE PESSOA
                    </h1>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiUserLine size={30} />
                      Pessoa
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cod"
                      >
                        <label htmlFor="idPeople">Código:</label>

                        <div className="input-button-block-row">
                          <input
                            ref={idPersonInputRef}
                            id="idPeople"
                            type="number"
                            min="1"
                            required
                            value={idPeople}
                            onChange={(e) => setIdPeople(e.target.value)}
                            onBlur={() => {
                              handleSearchPerson(idPeople);
                            }}
                            onKeyUp={(e) => {
                              console.log(idPeople.length);
                              if (idPeople.length === 0) {
                                clearFields(true);
                                clearFields(true);
                              }
                            }}
                          />

                          <button
                            type="button"
                            className="button btnDefault"
                            onClick={handleOpenModalSearchPersonEdit}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-name"
                      >
                        <label htmlFor="name">Nome:</label>

                        <input
                          id="name"
                          type="text"
                          readOnly={isReadonly}
                          required
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
                          readOnly={isReadonly}
                          required
                          value={cpf_cnpj}
                          onChange={(e) => setCpf_cnpj(e.target.value)}
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
                          readOnly={isReadonly}
                          required
                          value={rg}
                          onChange={(e) => setRg(e.target.value)}
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
                          readOnly={isReadonly}
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
                      <RiUserStarLine size={30} />
                      Tipo de pessoa
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-group-row">
                        <div className="checkbox-block">
                          <input
                            type="checkbox"
                            id="cbAdmin"
                            disabled={isReadonly}
                            value="1"
                            checked={checkedTypeAdmin}
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
                            disabled={isReadonly}
                            value="2"
                            checked={checkedTypeAttendance}
                            onClick={() => {
                              handleCheckBox("cbAttendance");
                            }}
                          />
                          <label htmlFor="cbAttendance">Atendente</label>
                        </div>
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
                            disabled={isReadonly}
                            checked={active}
                            onClick={() => {
                              handleCheckBox("cbStatus");
                            }}
                          />
                          <label htmlFor="cbStatus">Ativo</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button-group">
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
                      <>
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
                      </>
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
