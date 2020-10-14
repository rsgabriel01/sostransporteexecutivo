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
  RiTaxiLine,
  RiUserLocationLine,
  RiCarLine,
  RiBook2Line,
  RiUserLine,
  RiArrowRightUpLine,
  RiCarWashingLine,
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

export default function Vehicles(props) {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  const [isReadonly, setIsReadonly] = useState(true);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [vehicleFinded, setVehicleFinded] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");
  const [searchVehicleBtnInactive, setSearchVehicleBtnInactive] = useState(
    false
  );

  const [idVehicle, setIdVehicle] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [idVehicleModel, setIdVehicleModel] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [idDriver, setIdDriver] = useState("");
  const [nameDriver, setNameDriver] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();

  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();
  const idVehicleInputRef = useRef(null);
  const vehicleColorInputRef = useRef(null);

  const [openModalSearchVehicle, setOpenModalSearchVehicle] = useState(false);
  const [searchVehicle, setSearchVehicle] = useState("");
  const [searchVehicleList, setSearchVehicleList] = useState([]);

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
  }, [props]);
  // #endregion

  // #region Fill Fields
  function fillFields(response) {
    const {
      id,
      car_plate,
      registration_number,
      id_model,
      model,
      brand,
      color,
      active,
    } = response.vehicle;

    const idDriver = response.driver.id;
    const name = response.driver.name;

    id ? setIdVehicle(id) : setIdVehicle("");
    car_plate ? setCarPlate(car_plate) : setCarPlate("");
    registration_number
      ? setRegistrationNumber(registration_number)
      : setRegistrationNumber("");
    id_model ? setIdVehicleModel(id_model) : setIdVehicleModel("");
    model ? setVehicleModel(model) : setVehicleModel("");
    brand ? setVehicleBrand(brand) : setVehicleBrand("");
    color ? setVehicleColor(color) : setVehicleColor("");
    idDriver ? setIdDriver(idDriver) : setIdDriver("");
    name ? setNameDriver(name) : setNameDriver("");
    setCheckedStatus(active);
  }
  // #endregion Fill Fields

  // #region Clear Fields
  function clearFields(withCode) {
    if (withCode) {
      setIdVehicle("");
    }
    setCarPlate("");
    setRegistrationNumber("");
    setIdVehicleModel("");
    setVehicleModel("");
    setVehicleBrand("");
    setVehicleColor("");
    setIdDriver("");
    setNameDriver("");
    setCheckedStatus(false);
  }

  // #endregion

  // #region alter page to consult
  function alterPageUpdateForConsult() {
    setVehicleFinded(false);
    clearFields(true);
    setTitleUpdate("");
    setUpdateRegister(false);
    setIsReadonly(true);
    setSearchVehicleBtnInactive(false);
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

  // #region Load Vehicle data
  async function loadDataVehicle(id) {
    try {
      clearFields();

      setVehicleFinded(false);

      const response = await api.get(`/vehicle/${id}`);

      if (response) {
        setVehicleFinded(true);
        fillFields(response.data);
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setVehicleFinded(false);

        const dataError = error.response.data;
        const statusError = error.response.status;

        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          console.log(dataError.message);
          switch (dataError.message) {
            case '"idVehicle" must be a number':
              notify("warning", "O código do veículo precisa ser um número.");
              break;
            case '"idVehicle" must be a positive number':
              notify(
                "warning",
                "O código de veículo deve ser maior ou igual a 1."
              );
              break;

            default:
              notify("warning", dataError.message);
          }
        }
      } else if (error.request) {
        setVehicleFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        setVehicleFinded(false);
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
  function handleSearchVehicle(idVehicle) {
    if (idVehicle && !updateRegister) {
      loadDataVehicle(idVehicle);
      setUpdateRegister(false);
      setTitleUpdate("");
    }
  }
  // #endregion

  // #region Update Person
  async function updatePerson() {
    const dataPerson = {
      idVehicle,
      registrationNumber,
      idVehicleModel,
      vehicleColor,
      nameDriver,
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
    if (vehicleFinded) {
      setTitleUpdate("ALTERAR ");

      setSearchVehicleBtnInactive(true);
      setUpdateRegister(true);
      setIsReadonly(false);
    } else if (idVehicle.length === 0) {
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

  // #region Handle Open Modal Search Vehicle
  function handleOpenModalSearchVehicles() {
    setLoadingModal(true);
    loadSearchVehicleList();

    setTitleIconModal(<RiCarLine size={30} />);
    setTitleModal("PESQUISAR VEÍCULOS");
    setOpenModalSearchVehicle(true);
  }

  function handleCloseModalSearchVehicles() {
    setTitleModal("");
    setSearchVehicle("");
    setOpenModalSearchVehicle(false);
  }
  // #endregion

  // #region Handle Select Search Vehicle
  function handleSelectVehicleInSearch(id) {
    clearFields();
    setIdVehicle(id);
    handleCloseModalSearchVehicles();
    inputFocusIdVehicles();
  }

  function inputFocusIdVehicles() {
    setTimeout(() => {
      idVehicleInputRef.current.focus();
    }, 1);
  }
  // #endregion

  // #region Load Search Modal Vehicle List
  async function loadSearchVehicleList() {
    setLoadingModal(true);

    try {
      const response = await api.get(
        `/vehicles/?vehicleModel=${searchVehicle.toUpperCase()}`
      );

      if (response) {
        console.log(response.data);

        setSearchVehicleList(response.data);
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
    inputFocusvehicleColor();
  }

  function inputFocusvehicleColor() {
    setTimeout(() => {
      vehicleColorInputRef.current.focus();
    }, 1);
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
  function handleSelectDriverInSearch(id, name) {
    setIdDriver(id);
    setNameDriver(name);
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
        id="modalSearchVehicle"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalSearchVehicle}
        onClose={handleCloseModalSearchVehicles}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalSearchVehicle}>
          <div className={ClassesModal.paper}>
            <h1 className="modal-search-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-search-content">
              <div className="modal-search-input-button">
                <div className="input-label-block-colum">
                  <label htmlFor="inputSearchVehicle">Modelo:</label>
                  <input
                    id="inputSearchVehicle"
                    type="text"
                    value={searchVehicle}
                    onChange={(e) => setSearchVehicle(e.target.value)}
                    onKeyUp={loadSearchVehicleList}
                  ></input>
                </div>

                <button
                  type="button"
                  className="button btnDefault btnSearchModal"
                  onClick={loadSearchVehicleList}
                >
                  <RiSearchLine size={24} />
                  Buscar
                </button>
              </div>

              <div className="modal-search-list">
                {loadingModal ? (
                  <Loading type="bars" vehicleColor="#0f4c82" />
                ) : (
                  searchVehicleList.map((vehicle) => (
                    <div
                      className="searchListIten"
                      key={vehicle.id}
                      onDoubleClick={() =>
                        handleSelectVehicleInSearch(vehicle.id)
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {vehicle.id}</strong>
                        <section id="searchVehicleData">
                          <p id="searchVehicleModel">
                            Modelo: {vehicle.VehicleModel.description}
                          </p>
                          <p id="searchVehicleCarPlate">
                            Placa: {vehicle.car_plate}
                          </p>
                        </section>
                      </div>
                      <div className="vehicleBtnSelect">
                        <button
                          type="button"
                          className="button btnSuccess"
                          onClick={() =>
                            handleSelectVehicleInSearch(vehicle.id)
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
          <Loading type="bars" vehicleColor="#0f4c82" />
        ) : (
          <div className="content-container">
            <ToastContainer />

            <Header title="Veículos" icon={<RiTaxiLine size={40} />} />
            <div className="vehicles-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/person">
                    <button type="button" className="button tab-active">
                      <RiSearchEyeLine size={24} />
                      Consultar
                    </button>
                  </Link>

                  <Link to="/vehicles/new">
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
                      DADOS DE VEÍCULO
                    </h1>
                  </div>

                  <div className="input-group-vehicles">
                    <h1>
                      <RiCarLine size={30} />
                      Veículo
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cod"
                      >
                        <label htmlFor="idVehicle">Código:</label>

                        <div className="input-button-block-row">
                          <input
                            ref={idVehicleInputRef}
                            id="idVehicle"
                            type="number"
                            min="1"
                            required
                            readOnly={searchVehicleBtnInactive}
                            value={idVehicle}
                            onChange={(e) => setIdVehicle(e.target.value)}
                            onBlur={() => {
                              handleSearchVehicle(idVehicle);
                            }}
                            onKeyUp={(e) => {
                              if (idVehicle.length === 0) {
                                clearFields();
                                clearFields();
                              }
                            }}
                          />

                          <button
                            type="button"
                            disabled={searchVehicleBtnInactive}
                            className={`button btnDefault ${
                              searchVehicleBtnInactive ? "btnInactive" : ""
                            }`}
                            onClick={() => {
                              clearFields();
                              handleOpenModalSearchVehicles();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column"
                      >
                        <label htmlFor="carPlate">Placa:</label>

                        <input
                          id="carPlate"
                          type="text"
                          minLength="7"
                          maxLength="7"
                          readOnly={isReadonly}
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
                          minLength="9"
                          maxLength="11"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          readOnly={isReadonly}
                          required
                          autoComplete="cc-csc"
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
                        <label htmlFor="model">Modelo:</label>

                        <div className="input-button-block-row">
                          <input
                            id="model"
                            type="text"
                            required
                            readOnly
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                          />

                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadonly ? "btnInactive" : ""
                            }`}
                            disabled={isReadonly}
                            onClick={() => {
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
                        <label htmlFor="brand">Marca:</label>

                        <input
                          id="brand"
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
                          readOnly={isReadonly}
                          required
                          value={vehicleColor}
                          onChange={(e) => setVehicleColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-vehicles">
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
                            id="idDriver"
                            type="text"
                            required
                            value={idDriver}
                            readOnly
                            onChange={(e) => setIdDriver(e.target.value)}
                          />

                          <button
                            type="button"
                            className={`button btnDefault ${
                              isReadonly ? "btnInactive" : ""
                            }`}
                            disabled={isReadonly}
                            id="btnidDriver"
                            onClick={() => {
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

                  <div className="input-group-vehicles">
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
