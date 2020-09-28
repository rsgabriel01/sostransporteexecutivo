/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
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
  RiBook2Line,
  RiPencilLine,
  RiCloseLine,
  RiCheckLine,
  RiBrushLine,
  RiQuestionLine,
  RiLoader4Line,
  RiSearchEyeLine,
  RiUser2Line,
  RiCheckboxMultipleLine,
  RiMapPinLine,
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

export default function Client() {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [isReadonly, setIsReadonly] = useState(false);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [personFinded, setPersonFinded] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");
  const [
    openModalSearchNeighborhood,
    setOpenModalSearchNeighborhood,
  ] = useState(false);

  const [idClient, setIdClient] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [idNeighborhood, setIdNeighborhood] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);

  const [searchClient, setSearchClient] = useState("");
  const [searchNeighborhood, setSearchNeighborhood] = useState("");

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
      width: "80%",
      height: "80%",
    },
  }));

  const handleOpenModalSearchNeighborhood = () => {
    setOpenModalSearchNeighborhood(true);
  };

  const handleClose = () => {
    setOpenModalSearchNeighborhood(false);
  };
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
      setIdClient("");
    }

    setPhone("");
    setEmail("");
    setCheckedStatus(false);
  }

  // #endregion

  // #region alter page to consult
  function alterPageUpdateForConsult() {
    setPersonFinded(false);
    clearFields(true);
    setTitleUpdate("");
    setUpdateRegister(false);
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

      setPersonFinded(false);

      const response = await api.get(`/person/${id}`);

      if (response) {
        setPersonFinded(true);
        // fillFields(response.data);
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
      idClient,
      companyName,
      fantasyName,
      cpfCnpj,
      phone,
      email,
      idNeighborhood,
      street,
      streetNumber,
      complement,
      status: checkedStatus,
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
    } else if (idClient.length === 0) {
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

  // #region Modal Search Bairro

  function SearchNeighborhoodModal({ titleModal }) {
    const classes = useStyles();

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalSearchNeighborhood}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchNeighborhood}>
          <div className={classes.paper}>
            <h1 className="modal-title">{titleModal.toUpperCase()}</h1>
            <div className="modal-input-button">
              <div className="input-label-block-colum">
                <label htmlFor="inputSearchClient">Nome fantasia:</label>

                <input
                  id="inputSearchClient"
                  type="text"
                  value={searchClient}
                  onChange={(e) => setSearchClient(e.target.value)}
                  // onKeyUp={(e) => {
                  //   if (idClient.length === 0) {
                  //     clearFields();
                  //     clearFields();
                  //   }
                  // }}
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
          </div>
        </Fade>
      </Modal>
    );
  }
  // #endregion

  return (
    <div className="main-container">
      <SearchNeighborhoodModal titleModal="Pesquisar clientes" />
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
                <div className="group-tabs">
                  <Link to="/people/person">
                    <button type="button" className="button tab-active">
                      <RiSearchEyeLine size={24} />
                      Consultar
                    </button>
                  </Link>

                  <Link to="/people/client/new">
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
                      DADOS DE CLIENTE
                    </h1>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiUser2Line size={30} />
                      Cliente
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cod"
                      >
                        <label htmlFor="idClient">Código:</label>

                        <div className="input-button-block-row">
                          <input
                            id="idClient"
                            type="number"
                            min="1"
                            required
                            value={idClient}
                            onChange={(e) => setIdClient(e.target.value)}
                            onBlur={() => {
                              handleSearchPerson(idClient);
                            }}
                            onKeyUp={(e) => {
                              if (idClient.length === 0) {
                                clearFields();
                                clearFields();
                              }
                            }}
                          />

                          <button
                            type="button"
                            className="button btnDefault"
                            onClick={handleOpenModalSearchNeighborhood}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="companyName">Razão Social:</label>

                        <input
                          id="companyName"
                          type="text"
                          readOnly={isReadonly}
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
                          readOnly={isReadonly}
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
                          readOnly={isReadonly}
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
                            required
                            value={neighborhood}
                            readOnly
                            onChange={(e) => setNeighborhood(e.target.value)}
                            onBlur={() => {
                              // handleSearchPerson(idNeighborhood);
                            }}
                            onKeyUp={(e) => {
                              if (neighborhood.length === 0) {
                                clearFields();
                                clearFields();
                              }
                            }}
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
                          readOnly={isReadonly}
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
                          readOnly={isReadonly}
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
