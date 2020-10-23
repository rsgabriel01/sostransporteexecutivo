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
  RiMapPinLine,
  RiAddCircleLine,
  RiArrowLeftLine,
  RiUser2Line,
  RiRoadMapLine,
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

export default function ClientNew() {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSave, setTextButtonSave] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [nameFantasy, setNameFantasy] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idNeighborhood, setIdNeighborhood] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(true);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();
  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();

  const [
    openModalSearchNeighborhood,
    setOpenModalSearchNeighborhood,
  ] = useState(false);
  const streetInputRef = useRef(null);
  const [searchNeighborhood, setSearchNeighborhood] = useState("");
  const [searchNeighborhoodList, setSearchNeighborhoodList] = useState([]);

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
    setNameFantasy("");
    setCpfCnpj("");
    setPhone("");
    setEmail("");
    setIdNeighborhood("");
    setNeighborhood("");
    setStreet("");
    setStreetNumber("");
    setComplement("");
    setCheckedStatus(true);
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

  // #region Create Client
  async function createClient() {
    const dataPerson = {
      company_name: companyName.toUpperCase(),
      name_fantasy: nameFantasy.toUpperCase(),
      cpf_cnpj: cpfCnpj,
      phone,
      email,
      id_neighborhood: idNeighborhood,
      street: street.toUpperCase(),
      street_number: streetNumber,
      complement: complement.toUpperCase(),
      active: checkedStatus,
    };

    setTextButtonSave("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataPerson);

    try {
      const response = await api.post("/client/create", dataPerson);

      if (response) {
        console.log(response.data);

        notify(
          "success",
          `${response.data.message} Codigo do cliente: ${response.data.createdClientComplete.id}`
        );

        setTextButtonSave("Salvar");
        setLoadingButton(false);
        setBtnInactive("");
        clearFields();
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

  // #region Return Page Consult
  function returnPageConsult() {
    history.push("/people/client");
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

  // #region Handle Submit
  function handleSubmit(e) {
    e.preventDefault();

    if (idNeighborhood === "" || neighborhood == "") {
      notify(
        "warning",
        "Os dados do bairro devem estar preenchidos, por favor verifique."
      );
      return;
    }

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR esse cadastro?",
      "createClient"
    );
  }
  // #endregion

  // #region Handle Cancel Create
  function handleCancel() {
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
  function handleReturn() {
    if (fieldsIsFilled()) {
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

  // #region Handle Open Modal Search Neighborhood
  const handleOpenModalSearchNeighborhood = () => {
    loadSearchNeighborhoodList();

    setTitleIconModal(<RiRoadMapLine size={30} />);
    setTitleModal("PESQUISAR BAIRRO");
    setOpenModalSearchNeighborhood(true);
  };

  const handleCloseModalSearchNeighborhood = () => {
    setTitleModal("");
    setSearchNeighborhood("");
    setOpenModalSearchNeighborhood(false);
  };
  // #endregion

  // #region Handle Select Search Neighborhood
  function handleSelectNeighborhoodInSearch(id, neighborhood) {
    setIdNeighborhood(id);
    setNeighborhood(neighborhood);
    handleCloseModalSearchNeighborhood();
    inputFocusStreet();
  }

  function inputFocusStreet() {
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
            case '"nameFantasy" is required':
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
        open={openModalSearchNeighborhood}
        onClose={handleCloseModalSearchNeighborhood}
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
                  <label htmlFor="inputSearchClient">Bairro:</label>
                  <input
                    id="inputSearchClient"
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
                  searchNeighborhoodList.map((client) => (
                    <div
                      className="searchListIten"
                      key={client.id}
                      onDoubleClick={() =>
                        handleSelectNeighborhoodInSearch(client.id, client.name)
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {client.id}</strong>
                        <section id="searchClientData">
                          <p id="searchCompanyNameClient">
                            <strong>Bairro: </strong>
                            {client.name}
                          </p>
                        </section>
                      </div>
                      <div className="clientBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() =>
                            handleSelectNeighborhoodInSearch(
                              client.id,
                              client.name
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
            <div className="client-container-new">
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
                          autoFocus
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
                          />

                          <button
                            type="button"
                            className="button btnDefault"
                            id="btnNeighborhood"
                            onClick={handleOpenModalSearchNeighborhood}
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
