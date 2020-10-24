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
  RiArrowRightUpLine,
  RiRoadMapLine,
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

export default function Client() {
  // #region Definitions
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loadingConsultData, setLoadingConsultData] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);

  const [isReadonly, setIsReadOnly] = useState(true);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [clientFinded, setClientFinded] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");
  const [searchClientInactive, setSearchClientInactive] = useState(false);

  const [idClient, setIdClient] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nameFantasy, setNameFantasy] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [idNeighborhood, setIdNeighborhood] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();
  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();

  const [openModalSearchClient, setOpenModalSearchClient] = useState(false);
  const idClientInputRef = useRef(null);
  const [searchClient, setSearchClient] = useState("");
  const [searchClientList, setSearchClientList] = useState([]);

  const [
    openModalSearchNeighborhood,
    setOpenModalSearchNeighborhood,
  ] = useState(false);
  const [searchNeighborhood, setSearchNeighborhood] = useState("");
  const streetInputRef = useRef(null);
  const [searchNeighborhoodList, setSearchNeighborhoodList] = useState([]);

  // #endregion Definitions

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
    console.log(response);

    if (response.client) {
      const {
        cpf_cnpj,
        company_name,
        name_fantasy,
        phone,
        email,
        active,
      } = response.client;

      cpf_cnpj ? setCpfCnpj(cpf_cnpj) : setCpfCnpj("");

      company_name ? setCompanyName(company_name) : setCompanyName("");

      name_fantasy ? setNameFantasy(name_fantasy) : setNameFantasy("");

      phone ? setPhone(phone) : setPhone("");

      email ? setEmail(email) : setEmail("");

      setCheckedStatus(active);
    }

    if (response.peopleAddress) {
      const {
        id_neighborhood,
        street,
        street_number,
        complement,
      } = response.peopleAddress;

      id_neighborhood
        ? setIdNeighborhood(id_neighborhood)
        : setIdNeighborhood("");

      street ? setStreet(street) : setStreet("");

      street_number ? setStreetNumber(street_number) : setStreetNumber("");

      complement ? setComplement(complement) : setComplement("");

      if (response.peopleAddress.Neighborhood) {
        const neighborhood = response.peopleAddress.Neighborhood.name;

        neighborhood ? setNeighborhood(neighborhood) : setNeighborhood("");
      }
    }
  }
  // #endregion

  // #region Clear Fields
  function clearFields(withCode) {
    if (withCode) {
      setIdClient("");
    }

    setCpfCnpj("");
    setCompanyName("");
    setNameFantasy("");
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

  // #region alter page to consult
  function alterPageUpdateForConsult() {
    setClientFinded(false);
    clearFields(true);
    setTitleUpdate("");
    setUpdateRegister(false);
    setIsReadOnly(true);
    setSearchClientInactive(false);
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

  // #region Load Data Client
  async function loadDataClient(id) {
    try {
      clearFields();

      setLoadingConsultData(true);
      setClientFinded(false);

      const response = await api.get(`/client/${id}`);

      if (response) {
        setLoadingConsultData(false);
        setClientFinded(true);
        fillFields(response.data);
      }

      console.log(response.data);
    } catch (error) {
      setLoadingConsultData(false);
      if (error.response) {
        setClientFinded(false);

        const dataError = error.response.data;
        const statusError = error.response.status;

        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          console.log(dataError.message);
          switch (dataError.message) {
            case '"idClient" must be a number':
              notify("warning", "O código do cliente precisa ser um número.");
              break;
            case '"idClient" must be a positive number':
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
        setClientFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        setClientFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log("Error", error.message);
      }
    }
  }

  // #endregion

  // #region Handle Search Client
  function handleSearchClient(idClient) {
    if (idClient && !updateRegister) {
      loadDataClient(idClient);
      setUpdateRegister(false);
      setTitleUpdate("");
    } else if (!updateRegister) {
      clearFields();
    }
  }
  // #endregion

  // #region Update Client
  async function updateClient() {
    const dataClient = {
      idClient,
      companyName: companyName.toUpperCase(),
      nameFantasy: nameFantasy.toUpperCase(),
      cpfCnpj,
      phone,
      email,
      idNeighborhood,
      street: street.toUpperCase(),
      streetNumber,
      complement: complement.toUpperCase(),
      active: checkedStatus,
    };

    setTextButtonSaveUpdate("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataClient);

    try {
      const response = await api.put("/client/update", dataClient);

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
                      case "updateClient":
                        updateClient();
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
      "updateClient"
    );
  }
  // #endregion

  //#region Verify Field Filled
  const fieldsIsFilled = () => {
    if (
      companyName !== "" ||
      nameFantasy !== "" ||
      cpfCnpj !== "" ||
      phone !== "" ||
      email !== "" ||
      idNeighborhood !== "" ||
      neighborhood !== "" ||
      street !== "" ||
      streetNumber !== "" ||
      complement !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  // #endregion

  // #region Handle Cancel Update
  async function handleCancelUpdate() {
    if (fieldsIsFilled()) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR essa alteração? Os dados não salvos serão perdidos.",
        "alterPageUpdateForConsult"
      );
    }
  }
  // #endregion

  // #region Handle Update Register
  function handleUpdateRegister() {
    if (clientFinded) {
      setTitleUpdate("ALTERAR ");

      setSearchClientInactive(true);
      setUpdateRegister(true);
      setIsReadOnly(false);
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

  // #region Handle Open Modal Search client
  const handleOpenModalSearchClientEdit = () => {
    setLoadingModal(true);
    loadSearchClientList();

    setTitleIconModal(<RiUser2Line size={30} />);
    setTitleModal("PESQUISAR CLIENTE");
    setOpenModalSearchClient(true);
  };

  const handleCloseModalSearchClientEdit = () => {
    setTitleModal("");
    setSearchClient("");
    setOpenModalSearchClient(false);
  };
  // #endregion

  // #region Handle Select Search Client
  function handleSelectClientInSearch(id) {
    clearFields();
    setIdClient(id);
    handleCloseModalSearchClientEdit();
    inputFocusIdClient();
  }

  function inputFocusIdClient() {
    setTimeout(() => {
      idClientInputRef.current.focus();
    }, 1);
  }
  // #endregion

  // #region Load Search Client List
  async function loadSearchClientList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/clients/?nameFantasy=${searchClient.toUpperCase()}`
      );

      if (response) {
        console.log(response.data);

        setSearchClientList(response.data);
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
            case '"nameFantasy" is required':
              notify(
                "error",
                "Oops, algo deu errado, entre em contato com o suporte de TI. Erro: o QUERY PARAM 'nameFantasy' não foi encontrado no endereço da rota."
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

  // #region Handle Open Modal Search Neighborhood
  const handleOpenModalSearchNeighborhoodEdit = () => {
    setLoadingModal(true);
    loadSearchNeighborhoodList();

    setTitleIconModal(<RiRoadMapLine size={30} />);
    setTitleModal("PESQUISAR BAIRRO");
    setOpenModalSearchNeighborhood(true);
  };

  const handleCloseModalSearchNeighborhoodEdit = () => {
    setTitleModal("");
    setSearchNeighborhood("");
    setOpenModalSearchNeighborhood(false);
  };
  // #endregion

  // #region Handle Select Search Neighborhood
  function handleSelectNeighborhoodInSearch(id, neighborhood) {
    setIdNeighborhood(id);
    setNeighborhood(neighborhood);
    handleCloseModalSearchNeighborhoodEdit();
    inputFocusIdNeighborhood();
  }

  function inputFocusIdNeighborhood() {
    setTimeout(() => {
      streetInputRef.current.focus();
    }, 1);
  }
  // #endregion

  // #region Load Search Neighborhood List
  async function loadSearchNeighborhoodList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/neighborhoods/like/?name=${searchNeighborhood.toUpperCase()}`
      );

      if (response) {
        console.log(response.data);

        setSearchNeighborhoodList(response.data);
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
        id="modalSearchClient"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalSearchClient}
        onClose={handleCloseModalSearchClientEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchClient}>
          <div className={ClassesModal.paper}>
            <h1 className="modal-search-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-search-content">
              <div className="modal-search-input-button">
                <div className="input-label-block-colum">
                  <label htmlFor="inputSearchClient">Nome fantasia:</label>
                  <input
                    id="inputSearchClient"
                    type="text"
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                    onKeyUp={loadSearchClientList}
                  ></input>
                </div>

                <button
                  type="button"
                  className="button btnDefault btnSearchModal"
                  onClick={loadSearchClientList}
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
                    <div
                      className="searchListIten"
                      key={client.id}
                      onDoubleClick={() =>
                        handleSelectClientInSearch(client.id)
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {client.id}</strong>
                        <section id="searchClientData">
                          <p id="searchCnpjClient">
                            <strong>CNPJ: </strong>
                            {client.cpf_cnpj}
                          </p>
                          <p id="searchCompanyNameClient">
                            <strong>Razão Social: </strong>
                            {client.company_name}
                          </p>
                          <p id="searchNameFantasyClient">
                            <strong>Nome Fantasia: </strong>
                            {client.name_fantasy}
                          </p>
                        </section>
                      </div>
                      <div className="clientBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() => handleSelectClientInSearch(client.id)}
                        >
                          <RiArrowRightUpLine size={24} />
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
        id="modalSearcNeighborhood"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalSearchNeighborhood}
        onClose={handleCloseModalSearchNeighborhoodEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchNeighborhood}>
          <div className={ClassesModal.paper}>
            <h1 className="modal-search-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-search-content">
              <div className="modal-search-input-button">
                <div className="input-label-block-colum">
                  <label htmlFor="inputSearchNeighborhood">Bairro:</label>
                  <input
                    id="inputSearchNeighborhood"
                    type="text"
                    value={searchNeighborhood}
                    onChange={(e) => setSearchNeighborhood(e.target.value)}
                    onKeyUp={loadSearchNeighborhoodList}
                  ></input>
                </div>

                <button
                  type="button"
                  className="button btnDefault btnSearchModal"
                  onClick={loadSearchNeighborhoodList}
                >
                  <RiSearchLine size={24} />
                  Buscar
                </button>
              </div>

              <div className="modal-search-list">
                {loadingModal ? (
                  <Loading type="bars" color="#0f4c82" />
                ) : (
                  searchNeighborhoodList.map((neighborhood) => (
                    <div
                      className="searchListIten"
                      key={neighborhood.id}
                      onDoubleClick={() =>
                        handleSelectNeighborhoodInSearch(
                          neighborhood.id,
                          neighborhood.name
                        )
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {neighborhood.id}</strong>
                        <section id="searchNeighborhoodData">
                          <p id="searchNeighborhood">
                            <strong>Bairro: </strong>
                            {neighborhood.name}
                          </p>
                        </section>
                      </div>
                      <div className="neighborhoodBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() =>
                            handleSelectNeighborhoodInSearch(
                              neighborhood.id,
                              neighborhood.name
                            )
                          }
                        >
                          <RiArrowRightUpLine size={24} />
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
                      {!loadingConsultData ? (
                        ""
                      ) : (
                        <RiLoader4Line
                          size={30}
                          className="load-spinner-button"
                        />
                      )}
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
                            ref={idClientInputRef}
                            type="number"
                            min="1"
                            readOnly={searchClientInactive}
                            required
                            autoFocus
                            value={idClient}
                            onChange={(e) => {
                              setIdClient(e.target.value);
                              clearFields();
                            }}
                            onBlur={() => {
                              handleSearchClient(idClient);
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
                            disabled={searchClientInactive}
                            className={`button btnDefault ${
                              searchClientInactive ? "btnInactive" : ""
                            }`}
                            onClick={() => {
                              clearFields();
                              handleOpenModalSearchClientEdit();
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
                        <label htmlFor="nameFantasy">Nome Fantasia:</label>

                        <input
                          id="nameFantasy"
                          type="text"
                          readOnly={isReadonly}
                          required
                          value={nameFantasy}
                          onChange={(e) => setNameFantasy(e.target.value)}
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
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setCpfCnpj(e.target.value);
                          }}
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
                          />

                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadonly ? "btnInactive" : ""
                            }`}
                            id="btnNeighborhood"
                            disabled={isReadonly}
                            onClick={() => {
                              handleOpenModalSearchNeighborhoodEdit();
                            }}
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
                          ref={streetInputRef}
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
