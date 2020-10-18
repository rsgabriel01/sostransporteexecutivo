import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  RiFileListLine,
  RiUser2Line,
  RiDraftLine,
  RiSearchLine,
  RiMapPinLine,
  RiCheckLine,
  RiCloseLine,
  RiArrowLeftLine,
  RiArrowRightUpLine,
  RiRoadMapLine,
  RiQuestionLine,
  RiLoader4Line,
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

export default function ServiceOrdersRequest() {
  //#region Definitions
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  const [isReadOnlyOrigin, setIsReadOnlyOrigin] = useState(true);
  const [isReadOnlyDestiny, setIsReadOnlyDestiny] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSave, setTextButtonSave] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [idClient, setIdClient] = useState("");
  const [nameFantasyClient, setNameFantasyClient] = useState("");

  const [rbCheckedAddressOrigin, setRbCheckedAddressOrigin] = useState(true);
  const [idNeighborhoodOrigin, setIdNeighborhoodOrigin] = useState("");
  const [neighborhoodOrigin, setNeighborhoodOrigin] = useState("");
  const [streetOrigin, setStreetOrigin] = useState("");
  const [streetNumberOrigin, setStreetNumberOrigin] = useState("");
  const [complementOrigin, setComplementOrigin] = useState("");

  const [rbCheckedAddressDestiny, setRbCheckedAddressDestiny] = useState(false);
  const [idNeighborhoodDestiny, setIdNeighborhoodDestiny] = useState("");
  const [neighborhoodDestiny, setNeighborhoodDestiny] = useState("");
  const [streetDestiny, setStreetDestiny] = useState("");
  const [streetNumberDestiny, setStreetNumberDestiny] = useState("");
  const [complementDestiny, setComplementDestiny] = useState("");

  const [observationService, setObservationService] = useState("");

  const nameFantasyClientInputRef = useRef(null);
  const neighborhoodOriginInputRef = useRef(null);
  const neighborhoodDestinyInputRef = useRef(null);
  const streetOriginInputRef = useRef(null);
  const streetDestinyInputRef = useRef(null);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();
  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();

  const [openModalSearchClient, setOpenModalSearchClient] = useState(false);
  const [searchClient, setSearchClient] = useState("");
  const [searchClientList, setSearchClientList] = useState([]);

  const [
    openModalSearchNeighborhood,
    setOpenModalSearchNeighborhood,
  ] = useState(false);
  const [searchNeighborhood, setSearchNeighborhood] = useState("");
  const [searchNeighborhoodList, setSearchNeighborhoodList] = useState([]);

  //#endregion

  //#region Verify Session
  async function virifyAuthorization() {
    const response = await isAuthenticated();
    if (!response) {
      logout();
      history.push("/");
    } else {
      setLoading(false);
    }
  }
  //#endregion

  //#region Use Effect
  useEffect(() => {
    virifyAuthorization();
  }, []);
  //#endregion

  // #region Handle Address Check Client
  function handleAddressCheckClient(address) {
    if (idClient !== "") {
      if (address === "origin") {
        console.log("origin");
        if (rbCheckedAddressOrigin === false) {
          let idNeighborhoodOriginOld = idNeighborhoodOrigin;
          let neighborhoodOriginOld = neighborhoodOrigin;
          let streetOriginOld = streetOrigin;
          let streetNumberOriginOld = streetNumberOrigin;
          let complementOriginOld = complementOrigin;

          let idNeighborhoodDestinyOld = idNeighborhoodDestiny;
          let neighborhoodDestinyOld = neighborhoodDestiny;
          let streetDestinyOld = streetDestiny;
          let streetNumberDestinyOld = streetNumberDestiny;
          let complementDestinyOld = complementDestiny;

          setIdNeighborhoodOrigin(idNeighborhoodDestinyOld);
          setIdNeighborhoodDestiny(idNeighborhoodOriginOld);

          setNeighborhoodOrigin(neighborhoodDestinyOld);
          setNeighborhoodDestiny(neighborhoodOriginOld);

          setStreetOrigin(streetDestinyOld);
          setStreetDestiny(streetOriginOld);

          setStreetNumberOrigin(streetNumberDestinyOld);
          setStreetNumberDestiny(streetNumberOriginOld);

          setComplementOrigin(complementDestinyOld);
          setComplementDestiny(complementOriginOld);

          setRbCheckedAddressOrigin(true);
          setRbCheckedAddressDestiny(false);

          setIsReadOnlyOrigin(true);
          setIsReadOnlyDestiny(false);
        }
      } else if (address === "destiny") {
        console.log("destiny");
        if (rbCheckedAddressDestiny === false) {
          let idNeighborhoodDestinyOld = idNeighborhoodDestiny;
          let neighborhoodDestinyOld = neighborhoodDestiny;
          let streetDestinyOld = streetDestiny;
          let streetNumberDestinyOld = streetNumberDestiny;
          let complementDestinyOld = complementDestiny;

          let idNeighborhoodOriginOld = idNeighborhoodOrigin;
          let neighborhoodOriginOld = neighborhoodOrigin;
          let streetOriginOld = streetOrigin;
          let streetNumberOriginOld = streetNumberOrigin;
          let complementOriginOld = complementOrigin;

          setIdNeighborhoodDestiny(idNeighborhoodOriginOld);
          setIdNeighborhoodOrigin(idNeighborhoodDestinyOld);

          setNeighborhoodDestiny(neighborhoodOriginOld);
          setNeighborhoodOrigin(neighborhoodDestinyOld);

          setStreetDestiny(streetOriginOld);
          setStreetOrigin(streetDestinyOld);

          setStreetNumberDestiny(streetNumberOriginOld);
          setStreetNumberOrigin(streetNumberDestinyOld);

          setComplementDestiny(complementOriginOld);
          setComplementOrigin(complementDestinyOld);

          setRbCheckedAddressOrigin(false);
          setRbCheckedAddressDestiny(true);

          setIsReadOnlyOrigin(false);
          setIsReadOnlyDestiny(true);
        }
      }
    } else {
      if (address === "origin") {
        if (rbCheckedAddressOrigin === false) {
          setRbCheckedAddressOrigin(true);
          setRbCheckedAddressDestiny(false);

          setIsReadOnlyOrigin(true);
          setIsReadOnlyDestiny(false);
        }
      } else if (address === "destiny") {
        if (rbCheckedAddressDestiny === false) {
          setRbCheckedAddressOrigin(false);
          setRbCheckedAddressDestiny(true);

          setIsReadOnlyOrigin(false);
          setIsReadOnlyDestiny(true);
        }
      }
    }
  }
  // #endregion

  // #region create OS
  async function createOs() {
    const dataOs = {
      idClient,
      clientOrigin: rbCheckedAddressOrigin,
      idNeighborhoodOrigin,
      streetOrigin: streetOrigin.toUpperCase(),
      streetNumberOrigin,
      complementOrigin: complementOrigin.toUpperCase(),
      clientDestiny: rbCheckedAddressDestiny,
      idNeighborhoodDestiny,
      streetDestiny: streetDestiny.toUpperCase(),
      streetNumberDestiny,
      complementDestiny: complementDestiny.toUpperCase(),
      observationService: observationService.toUpperCase(),
    };

    setTextButtonSave("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataOs);

    try {
      const response = await api.post("/serviceOrders", dataOs);

      if (response) {
        console.log(response.data);

        notify("success", response.data.message);

        setTextButtonSave("Salvar");
        setLoadingButton(false);
        setBtnInactive("");
        clearFields("all");
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

        if (statusError === 500) {
          notify(
            "error",
            "Ooops, erro interno do servidor, por favor entre em contato com setor de TI."
          );
        }
      } else if (error.request) {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log("Error 1", error.request);
      } else {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log("Error 2", error.message);
      }
    }
  }
  //#endregion

  // #region Return Page Consult
  function returnPageConsult() {
    history.push("/serviceorders");
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

                      case "clearFieldsAll":
                        clearFields("all");
                        break;

                      case "createOs":
                        createOs();
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

  //#region Verify Field Filled
  const fieldsIsFilled = () => {
    if (
      idClient !== "" ||
      nameFantasyClient !== "" ||
      idNeighborhoodOrigin !== "" ||
      neighborhoodOrigin !== "" ||
      streetOrigin !== "" ||
      streetNumberOrigin !== "" ||
      complementOrigin !== "" ||
      idNeighborhoodDestiny !== "" ||
      neighborhoodDestiny !== "" ||
      streetDestiny !== "" ||
      streetNumberDestiny !== "" ||
      complementDestiny !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  // #endregion

  // #region Handle Submit
  function handleSubmit(e) {
    e.preventDefault();

    if (idClient === "" || nameFantasyClient == "") {
      notify(
        "warning",
        "Os dados do cliente devem estar preenchidos, por favor verifique."
      );

      inputFocus("nameFantasyClient");
      return;
    }

    if (
      idNeighborhoodOrigin === "" ||
      neighborhoodOrigin === "" ||
      streetOrigin === "" ||
      streetNumberOrigin === ""
    ) {
      if (rbCheckedAddressOrigin) {
        notify(
          "warning",
          "Os dados de endereço cliente devem estar preenchidos, por favor verifique."
        );
        inputFocus("nameFantasyClient");
      } else {
        notify(
          "warning",
          "Os dados de endereço de origem devem estar preenchidos, por favor verifique."
        );
        inputFocus("neighborhoodOrigin");
      }

      return;
    }

    if (
      idNeighborhoodDestiny === "" ||
      neighborhoodDestiny === "" ||
      streetDestiny === "" ||
      streetNumberDestiny === ""
    ) {
      if (rbCheckedAddressDestiny) {
        notify(
          "warning",
          "Os dados de endereço cliente devem estar preenchidos, por favor verifique."
        );
        inputFocus("nameFantasyClient");
      } else {
        notify(
          "warning",
          "Os dados de endereço de destino devem estar preenchidos, por favor verifique."
        );
        inputFocus("neighborhoodDestiny");
      }
      return;
    }

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR esse cadastro?",
      "createOs"
    );
  }
  // #endregion

  // #region Handle Cancel Create
  function handleCancel() {
    if (fieldsIsFilled()) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR esse cadastro? Os dados não salvos serão perdidos.",
        "clearFieldsAll"
      );
    }
  }
  // #endregion

  // #region Handle Return Page Consult
  function handleReturn() {
    if (fieldsIsFilled()) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente VOLTAR para a página de consulta de Ordens de Serviço? Os dados não salvos serão perdidos.",
        "returnPageConsult"
      );
    } else {
      returnPageConsult();
    }
  }
  // #endregion

  // #region Clear Fields
  function clearFields(inputs) {
    switch (inputs) {
      case "all":
        setIdClient("");
        setNameFantasyClient("");

        setIdNeighborhoodOrigin("");
        setNeighborhoodOrigin("");
        setStreetOrigin("");
        setStreetNumberOrigin("");
        setComplementOrigin("");

        setIdNeighborhoodDestiny("");
        setNeighborhoodDestiny("");
        setStreetDestiny("");
        setStreetNumberDestiny("");
        setComplementDestiny("");

        setIsReadOnlyOrigin(true);
        setIsReadOnlyDestiny(false);
        setRbCheckedAddressOrigin(true);
        setRbCheckedAddressDestiny(false);
        break;

      default:
        break;
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
  function handleSelectClientInSearch(
    idClient,
    nameFantasy,
    idNeighborhood,
    neighborhood,
    street,
    number,
    complement
  ) {
    setIdClient(idClient);
    setNameFantasyClient(nameFantasy);

    if (rbCheckedAddressOrigin) {
      setIdNeighborhoodOrigin(idNeighborhood);
      setNeighborhoodOrigin(neighborhood);
      setStreetOrigin(street);
      setStreetNumberOrigin(number);
      setComplementOrigin(complement);

      inputFocus("neighborhoodDestiny");
    } else if (rbCheckedAddressDestiny) {
      setIdNeighborhoodDestiny(idNeighborhood);
      setNeighborhoodDestiny(neighborhood);
      setStreetDestiny(street);
      setStreetNumberDestiny(number);
      setComplementDestiny(complement);

      inputFocus("neighborhoodOrigin");
    }

    handleCloseModalSearchClientEdit();
  }
  // #endregion

  //#region Input Focus
  function inputFocus(input) {
    switch (input) {
      case "nameFantasyClient":
        setTimeout(() => {
          nameFantasyClientInputRef.current.focus();
        }, 1);
        break;
      case "neighborhoodOrigin":
        setTimeout(() => {
          neighborhoodOriginInputRef.current.focus();
        }, 1);
        break;
      case "neighborhoodDestiny":
        setTimeout(() => {
          neighborhoodDestinyInputRef.current.focus();
        }, 1);
        break;
      case "streetOrigin":
        setTimeout(() => {
          streetOriginInputRef.current.focus();
        }, 1);
        break;
      case "streetDestiny":
        setTimeout(() => {
          streetDestinyInputRef.current.focus();
        }, 1);
        break;

      default:
        break;
    }
  }
  //#endregion Input Focus

  // #region Load Search Client List
  async function loadSearchClientList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/clients/active/?nameFantasy=${searchClient.toUpperCase()}`
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
  const handleOpenModalSearchNeighborhood = () => {
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
    if (rbCheckedAddressOrigin) {
      setIdNeighborhoodDestiny(id);
      setNeighborhoodDestiny(neighborhood);

      inputFocus("streetDestiny");
    } else if (rbCheckedAddressDestiny) {
      setIdNeighborhoodOrigin(id);
      setNeighborhoodOrigin(neighborhood);

      inputFocus("streetOrigin");
    }

    handleCloseModalSearchNeighborhoodEdit();
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
                        handleSelectClientInSearch(
                          client.id,
                          client.name_fantasy,
                          client.People_address.id_neighborhood,
                          client.People_address.Neighborhood.name,
                          client.People_address.street,
                          client.People_address.street_number,
                          client.People_address.complement
                        )
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {client.id}</strong>
                        <section id="searchClientData">
                          <p id="searchCnpjClient">CNPJ: {client.cpf_cnpj}</p>
                          <p id="searchCompanyNameClient">
                            Razão Social: {client.company_name}
                          </p>
                          <p id="searchNameFantasyClient">
                            Nome Fantasia: {client.name_fantasy}
                          </p>
                        </section>
                      </div>
                      <div className="clientBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() =>
                            handleSelectClientInSearch(
                              client.id,
                              client.name_fantasy,
                              client.People_address.id_neighborhood,
                              client.People_address.Neighborhood.name,
                              client.People_address.street,
                              client.People_address.street_number,
                              client.People_address.complement
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
                            Bairro: {neighborhood.name}
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

            <Header
              title={"Ordens de Serviço"}
              icon={<RiFileListLine size={40} />}
            />
            <div className="os-request-container">
              <div className="tab-bar">
                <div className="group-tabs"></div>
              </div>

              <section className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-title">
                    <RiDraftLine size={30} />
                    <h1>NOVA ORDEM DE SERVIÇO</h1>
                  </div>

                  <div className="input-group-client">
                    <h1>
                      <RiUser2Line size={30} />
                      Cliente
                    </h1>
                    <div className="input-block">
                      <input
                        ref={nameFantasyClientInputRef}
                        type="text"
                        value={nameFantasyClient}
                        onChange={(e) => setNameFantasyClient(e.target.value)}
                        id="client"
                        readOnly={true}
                        required
                      />
                      <button
                        type="button"
                        className="button btnDefault"
                        onClick={() => {
                          handleOpenModalSearchClientEdit();
                        }}
                      >
                        <RiSearchLine size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="group-address">
                    <div
                      className="input-group-address"
                      id="input-group-address-origin"
                    >
                      <div className="label-address">
                        <h1>
                          <RiMapPinLine size={30} />
                          Origem
                        </h1>

                        <div className="checkbox-block">
                          <input
                            type="radio"
                            name="rbAddressClient"
                            id="rbAddressClientOrigin"
                            checked={rbCheckedAddressOrigin}
                            onChange={() => {
                              handleAddressCheckClient("origin");
                            }}
                          />
                          <label htmlFor="rbAddressClientOrigin">Cliente</label>
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="neighborhood">Bairro:</label>

                        <div className="neighborhood-block">
                          <input
                            ref={neighborhoodOriginInputRef}
                            type="text"
                            value={neighborhoodOrigin}
                            onChange={(e) =>
                              setNeighborhoodOrigin(e.target.value)
                            }
                            readOnly={true}
                            required
                          />
                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadOnlyOrigin ? "btnInactive" : ""
                            }`}
                            disabled={isReadOnlyOrigin}
                            onClick={() => {
                              handleOpenModalSearchNeighborhood();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>
                      <div className="street-number-block">
                        <div className="input-block">
                          <label htmlFor="street">Rua:</label>
                          <input
                            ref={streetOriginInputRef}
                            type="text"
                            value={streetOrigin}
                            readOnly={isReadOnlyOrigin}
                            onChange={(e) => setStreetOrigin(e.target.value)}
                            required
                          />
                        </div>

                        <div className="input-block">
                          <label htmlFor="street_number">Número:</label>
                          <input
                            className="input-number"
                            type="number"
                            min="0"
                            value={streetNumberOrigin}
                            readOnly={isReadOnlyOrigin}
                            onChange={(e) =>
                              setStreetNumberOrigin(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="input-block">
                        <label htmlFor="complement">Complemento:</label>
                        <input
                          type="text"
                          value={complementOrigin}
                          readOnly={isReadOnlyOrigin}
                          onChange={(e) => setComplementOrigin(e.target.value)}
                        />
                      </div>
                    </div>

                    <div
                      className="input-group-address"
                      id="input-group-address-destiny"
                    >
                      <div className="label-address">
                        <h1>
                          <RiMapPinLine size={30} />
                          Destino
                        </h1>

                        <div className="checkbox-block">
                          <input
                            type="radio"
                            name="rbAddressClient"
                            id="rbAddressClientDestiny"
                            checked={rbCheckedAddressDestiny}
                            onChange={() => {
                              handleAddressCheckClient("destiny");
                            }}
                          />
                          <label htmlFor="rbAddressClientDestiny">
                            Cliente
                          </label>
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="neighborhood">Bairro:</label>
                        <div className="neighborhood-block">
                          <input
                            ref={neighborhoodDestinyInputRef}
                            type="text"
                            value={neighborhoodDestiny}
                            onChange={(e) =>
                              setNeighborhoodDestiny(e.target.value)
                            }
                            readOnly={true}
                            required
                          />
                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadOnlyDestiny ? "btnInactive" : ""
                            }`}
                            disabled={isReadOnlyDestiny}
                            onClick={() => {
                              handleOpenModalSearchNeighborhood();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>
                      <div className="street-number-block">
                        <div className="input-block">
                          <label htmlFor="street">Rua:</label>
                          <input
                            ref={streetDestinyInputRef}
                            type="text"
                            value={streetDestiny}
                            readOnly={isReadOnlyDestiny}
                            onChange={(e) => setStreetDestiny(e.target.value)}
                            required
                          />
                        </div>
                        <div className="input-block">
                          <label htmlFor="street_number">Número:</label>
                          <input
                            type="number"
                            min="0"
                            value={streetNumberDestiny}
                            readOnly={isReadOnlyDestiny}
                            onChange={(e) =>
                              setStreetNumberDestiny(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="input-block">
                        <label htmlFor="complement">Complemento:</label>
                        <input
                          type="text"
                          value={complementDestiny}
                          readOnly={isReadOnlyDestiny}
                          onChange={(e) => setComplementDestiny(e.target.value)}
                        />
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
