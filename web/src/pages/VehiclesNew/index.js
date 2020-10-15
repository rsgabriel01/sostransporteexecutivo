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
  RiTaxiLine,
  RiUserLocationLine,
  RiCarLine,
  RiArrowLeftLine,
  RiAddCircleLine,
  RiCarWashingLine,
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

export default function VehiclesNew() {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSave, setTextButtonSave] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");
  const [loadingModal, setLoadingModal] = useState(true);

  const [carPlate, setCarPlate] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [idVehicleModel, setIdVehicleModel] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [idDriver, setIdDriver] = useState("");
  const [idPeopleDriver, setIdPeopleDriver] = useState(null);
  const [nameDriver, setNameDriver] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);

  const carPlateInputRef = useRef(null);
  const vehicleModelInputRef = useRef(null);
  const idDriverInputRef = useRef(null);
  const nameDriverInputRef = useRef(null);
  const vehicleColorInputRef = useRef(null);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();

  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();

  const [
    openModalSearchVehicleModel,
    setOpenModalSearchVehicleModel,
  ] = useState(false);
  const [searchVehicleModel, setSearchVehicleModel] = useState("");
  const [searchVehicleModelList, setSearchVehicleModelList] = useState([]);

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

  // #region Clear Fields
  function clearFields(inputs) {
    switch (inputs) {
      case "all":
        setCarPlate("");
        setRegistrationNumber("");
        setIdVehicleModel("");
        setVehicleModel("");
        setVehicleBrand("");
        setVehicleColor("");
        setIdDriver("");
        setIdPeopleDriver(null);
        setNameDriver("");
        setCheckedStatus(false);
        break;

      case "driver":
        setIdDriver("");
        setIdPeopleDriver(null);
        setNameDriver("");
        break;

      case "vehicleModel":
        setIdVehicleModel("");
        setVehicleModel("");
        setVehicleBrand("");
        break;
      default:
        break;
    }
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

  // #region Create Vehicle
  async function createVehicle() {
    const dataVehicle = {
      carPlate: carPlate.toUpperCase(),
      registrationNumber,
      idVehicleModel,
      vehicleColor: vehicleColor.toUpperCase(),
      idDriver:
        !idPeopleDriver || idPeopleDriver !== "" ? null : idPeopleDriver,
      active: checkedStatus,
    };

    setTextButtonSave("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataVehicle);

    try {
      const response = await api.post("/vehicle/create", dataVehicle);

      if (response) {
        console.log(response.data);

        notify(
          "success",
          `${response.data.message} Código do veículo: ${response.data.createdVehicle.id}`
        );

        clearFields("all");
        inputFocus("carPlate");
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
                      case "createVehicle":
                        createVehicle();
                        break;
                      case "returnPageConsult":
                        returnPageConsult();
                        break;
                      case "clearFieldsAll":
                        clearFields("all");
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

    if (idVehicleModel === "" || vehicleModel === "" || vehicleBrand === "") {
      notify(
        "warning",
        "Os dados do modelo do veículo devem ser informados, por favor verifique."
      );

      inputFocus("idVehicleModel");
      return;
    }

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR esse cadastro?",
      "createVehicle"
    );
  }
  // #endregion

  //#region Verify Field Filled
  const fieldsIsFilled = () => {
    if (
      carPlate !== "" ||
      registrationNumber !== "" ||
      idVehicleModel !== "" ||
      vehicleModel !== "" ||
      vehicleBrand !== "" ||
      vehicleColor !== "" ||
      idDriver !== "" ||
      // idPeopleDriver !== "" ||
      idPeopleDriver !== null ||
      nameDriver !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  // #endregion

  // #region Handle Cancel Create
  function returnPageConsult() {
    history.push("/vehicles");
  }

  async function handleCancel() {
    if (fieldsIsFilled()) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR esse cadastro? Os dados não salvos serão perdidos.",
        "clearFieldsAll"
      );

      inputFocus("carPlate");
    }
  }
  // #endregion

  // #region Handle Return Page Consult
  function handleReturn() {
    if (fieldsIsFilled()) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente VOLTAR para a página de consulta de veículos? Os dados não salvos serão perdidos.",
        "returnPageConsult"
      );
    } else {
      returnPageConsult();
    }
  }
  // #endregion

  // #region Focus Fields
  function inputFocus(input) {
    switch (input) {
      case "carPlate":
        setTimeout(() => {
          carPlateInputRef.current.focus();
        }, 1);
        break;

      case "idVehicleModel":
        setTimeout(() => {
          vehicleModelInputRef.current.focus();
        }, 1);
        break;

      case "idDriver":
        setTimeout(() => {
          idDriverInputRef.current.focus();
        }, 1);
        break;

      case "nameDriver":
        setTimeout(() => {
          nameDriverInputRef.current.focus();
        }, 1);
        break;

      case "vehicleColor":
        setTimeout(() => {
          vehicleColorInputRef.current.focus();
        }, 1);
        break;

      default:
        break;
    }
  }

  //#endregion Focus Fields

  // #region Handle Open Modal Search Vehicle Model
  const handleOpenModalSearchVehicleModel = () => {
    setLoadingModal(true);
    loadSearchVehicleModelList();

    setTitleIconModal(<RiCarWashingLine size={30} />);
    setTitleModal("PESQUISAR MODELO DE VEÍCULO");
    setOpenModalSearchVehicleModel(true);
  };

  const handleCloseModalSearchVehicleModel = () => {
    setTitleModal("");
    setSearchVehicleModel("");
    setOpenModalSearchVehicleModel(false);
  };
  // #endregion

  // #region Handle Select Search Vehicle Model
  function handleSelectModelInSearch(id, model, brand) {
    setIdVehicleModel(id);
    setVehicleModel(model);
    setVehicleBrand(brand);
    handleCloseModalSearchVehicleModel();
    inputFocus("vehicleColor");
  }

  // #endregion

  // #region Load Search Modal Vehicle Model List
  async function loadSearchVehicleModelList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/vehicleModels/?vehicleModel=${searchVehicleModel.toUpperCase()}`
      );

      if (response) {
        console.log(response.data);

        setSearchVehicleModelList(response.data);
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
            case '"vehicleModel" is required':
              notify(
                "error",
                "Oops, algo deu errado, entre em contato com o suporte de TI. Erro: o QUERY PARAM 'vehicleModel' não foi encontrado no endereço da rota."
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

  // #region Handle Open Modal Search Driver Active
  const handleOpenModalSearchDriver = () => {
    setLoadingModal(true);
    loadSearchDriverList();

    setTitleIconModal(<RiUserLocationLine size={30} />);
    setTitleModal("PESQUISAR MOTORISTAS");
    setOpenModalSearchDriver(true);
  };

  const handleCloseModalSearchDriver = () => {
    setTitleModal("");
    setSearchDriver("");
    setOpenModalSearchDriver(false);
  };
  // #endregion

  // #region Handle Select Search Driver Active
  function handleSelectDriverInSearch(idDriver, idPeopleDriver, nameDriver) {
    setIdDriver(idDriver);
    setIdPeopleDriver(idPeopleDriver);
    setNameDriver(nameDriver);
    handleCloseModalSearchDriver();
  }
  // #endregion

  // #region Load Search Modal Driver Active List
  async function loadSearchDriverList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/drivers/active/vehicle/no/?name=${searchDriver.toUpperCase()}`
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

  return (
    <div className="main-container">
      <Modal
        id="modalSearchVehicleModel"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalSearchVehicleModel}
        onClose={handleCloseModalSearchVehicleModel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchVehicleModel}>
          <div className={ClassesModal.paper}>
            <h1 className="modal-search-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-search-content">
              <div className="modal-search-input-button">
                <div className="input-label-block-colum">
                  <label htmlFor="inputSearchVehicleModel">Modelo:</label>
                  <input
                    id="inputSearchVehicleModel"
                    type="text"
                    value={searchVehicleModel}
                    onChange={(e) => setSearchVehicleModel(e.target.value)}
                    onKeyUp={loadSearchVehicleModelList}
                  ></input>
                </div>

                <button
                  type="button"
                  className="button btnDefault btnSearchModal"
                  onClick={loadSearchVehicleModelList}
                >
                  <RiSearchLine size={24} />
                  Buscar
                </button>
              </div>

              <div className="modal-search-list">
                {loadingModal ? (
                  <Loading type="bars" vehicleColor="#0f4c82" />
                ) : (
                  searchVehicleModelList.map((vehicleModel) => (
                    <div
                      className="searchListIten"
                      key={vehicleModel.id}
                      onDoubleClick={() =>
                        handleSelectModelInSearch(
                          vehicleModel.id,
                          vehicleModel.description,
                          vehicleModel.ModelBrand.description
                        )
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {vehicleModel.id}</strong>
                        <section id="searchVehicleModelDataInVehicleUpdate">
                          <p id="searchDescriptionModel">
                            Modelo: {vehicleModel.description}
                          </p>
                          <p id="searcDescriptionModelBrand">
                            Marca: {vehicleModel.ModelBrand.description}
                          </p>
                        </section>
                      </div>
                      <div className="vehicleModelBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() =>
                            handleSelectModelInSearch(
                              vehicleModel.id,
                              vehicleModel.description,
                              vehicleModel.ModelBrand.description
                            )
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

      <Modal
        id="modalSearchDriver"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalSearchDriver}
        onClose={handleCloseModalSearchDriver}
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
                  <Loading type="bars" vehicleColor="#0f4c82" />
                ) : (
                  searchDriverList.map((driver) => (
                    <div
                      className="searchListIten"
                      key={driver.id}
                      onDoubleClick={() =>
                        handleSelectDriverInSearch(
                          driver.id,
                          driver.id_people,
                          driver.People.name
                        )
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {driver.id}</strong>
                        <section id="searchDriverDataInVehicleUpdate">
                          <p id="searchVehicleDriverName">
                            Nome: {driver.People.name}
                          </p>
                          <p id="searchVehicleDriveCpf">
                            CPF: {driver.People.cpf_cnpj}
                          </p>
                        </section>
                      </div>
                      <div className="DriverBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() =>
                            handleSelectDriverInSearch(
                              driver.id,
                              driver.id_people,
                              driver.People.name
                            )
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

            <Header title="Veículos" icon={<RiTaxiLine size={40} />} />
            <div className="vehicles-new-container">
              <div className="tab-bar">
                <div className="group-tabs"></div>
              </div>

              <section className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-title">
                    <RiAddCircleLine size={30} />
                    <h1>NOVO VEÍCULO</h1>
                  </div>

                  <div className="input-group-vehicles-new">
                    <h1>
                      <RiCarLine size={30} />
                      Veículo
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="carPlate">Placa:</label>

                        <input
                          ref={carPlateInputRef}
                          id="carPlate"
                          type="text"
                          minLength="7"
                          maxLength="7"
                          required
                          value={carPlate}
                          onChange={(e) => {
                            setCarPlate(e.target.value);
                          }}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="registrationNumber">
                          Número de registro:
                        </label>

                        <input
                          id="registrationNumber"
                          type="text"
                          minLength="11"
                          maxLength="11"
                          required
                          value={registrationNumber}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setRegistrationNumber(e.target.value);
                          }}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="vehicleModel">Modelo:</label>

                        <div className="input-button-block-row">
                          <input
                            ref={vehicleModelInputRef}
                            id="vehicleModel"
                            type="text"
                            readOnly
                            required
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                          />

                          <button
                            type="button"
                            className="button btnDefault"
                            onClick={() => {
                              clearFields("vehicleModel");
                              handleOpenModalSearchVehicleModel();
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
                        <label htmlFor="vehicleBrand">Marca:</label>

                        <input
                          id="vehicleBrand"
                          type="text"
                          readOnly
                          required
                          value={vehicleBrand}
                          onChange={(e) => setVehicleBrand(e.target.value)}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="vehicleColor">Cor:</label>

                        <input
                          ref={vehicleColorInputRef}
                          id="vehicleColor"
                          type="text"
                          required
                          value={vehicleColor}
                          onChange={(e) => setVehicleColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-vehicles-new">
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
                            type="text"
                            required
                            value={idDriver}
                            readOnly
                            onChange={(e) => setIdDriver(e.target.value)}
                          />

                          <button
                            type="button"
                            className="button btnDefault"
                            id="btnIdDriver"
                            onClick={() => {
                              clearFields("driver");
                              handleOpenModalSearchDriver();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="nameDriver">Nome:</label>

                        <input
                          ref={nameDriverInputRef}
                          id="nameDriver"
                          readOnly
                          type="text"
                          value={nameDriver}
                          onChange={(e) => setNameDriver(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-vehicles-new">
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
