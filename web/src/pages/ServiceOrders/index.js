import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  RiFileListLine,
  RiUser2Line,
  RiSearchLine,
  RiMapPinLine,
  RiCheckLine,
  RiCloseLine,
  RiArrowRightUpLine,
  RiRoadMapLine,
  RiQuestionLine,
  RiLoader4Line,
  RiSearchEyeLine,
  RiAddLine,
  RiBook2Line,
  RiBrushLine,
  RiPencilLine,
  RiFileList3Line,
  RiTaxiLine,
  RiUserLocationLine,
  RiCalendar2Line,
  RiCoinsLine,
  RiGroupLine,
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

export default function ServiceOrdersRequest() {
  //#region Definitions
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [osFinded, setOsFinded] = useState(false);

  const [isReadonly, setIsReadonly] = useState(true);
  const [isReadOnlyClient, setIsReadOnlyClient] = useState(true);
  const [isReadOnlyCbAddress, setIsReadOnlyCbAddress] = useState(true);
  const [isReadOnlyOrigin, setIsReadOnlyOrigin] = useState(true);
  const [isReadOnlyDestiny, setIsReadOnlyDestiny] = useState(true);
  const [isReadOnlyPassengers, setIsReadOnlyPassengers] = useState(true);
  const [
    isReadOnlyObservationService,
    setIsReadOnlyObservationService,
  ] = useState(true);
  const [
    isReadOnlyObservationUpdate,
    setIsReadOnlyObservationUpdate,
  ] = useState(true);
  const [isReadOnlyVehicle, setIsReadOnlyVehicle] = useState(true);
  const [isReadOnlyDriver, setIsReadOnlyDriver] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");
  const [searchOsBtnInactive, setSearchOsBtnInactive] = useState(false);

  const [idServiceOrder, setIdServiceOrder] = useState("");
  const [idSituation, setIdSituation] = useState(2);
  const [situation, setSituation] = useState("");

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

  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [numberPassengers, setNumberPassengers] = useState(1);

  const [observationService, setObservationService] = useState("");
  const [observationUpdate, setObservationUpdate] = useState("");
  const [observationCancellation, setObservationCancellation] = useState("");

  const [idVehicle, setIdVehicle] = useState("");
  const [carPlate, setCarPlate] = useState("");

  const [idDriver, setIdDriver] = useState("");
  const [idPeopleDriver, setIdPeopleDriver] = useState("");
  const [nameDriver, setNameDriver] = useState("");

  const [dateTimeSolicitation, setDateTimeSolicitation] = useState("");
  const [dateTimeAttendance, setDateTimeAttendance] = useState("");
  const [dateTimeCompletion, setDateTimeCompletion] = useState("");

  const [totalValue, setTotalValue] = useState("");
  const [cancellationFee, setCancellationFee] = useState("");

  const idServiceOrderInputRef = useRef(null);
  const nameFantasyClientInputRef = useRef(null);
  const neighborhoodOriginInputRef = useRef(null);
  const neighborhoodDestinyInputRef = useRef(null);
  const streetOriginInputRef = useRef(null);
  const streetDestinyInputRef = useRef(null);
  const idDriverInputRef = useRef(null);
  const nameDriverInputRef = useRef(null);

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

  const [openModalSearchVehicle, setOpenModalSearchVehicle] = useState(false);
  const [searchVehicle, setSearchVehicle] = useState("");
  const [searchVehicleList, setSearchVehicleList] = useState([]);

  const [openModalSearchDriver, setOpenModalSearchDriver] = useState(false);
  const [searchDriver, setSearchDriver] = useState("");
  const [searchDriverList, setSearchDriverList] = useState([]);

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
    const idPeopleDriver = response.driver.idPeopleDriver;
    const name = response.driver.name;

    // id ? setIdVehicle(id) : setIdVehicle("");
    // car_plate ? setCarPlate(car_plate) : setCarPlate("");
    // registration_number
    //   ? setRegistrationNumber(registration_number)
    //   : setRegistrationNumber("");
    // id_model ? setIdVehicleModel(id_model) : setIdVehicleModel("");
    // model ? setVehicleModel(model) : setVehicleModel("");
    // brand ? setVehicleBrand(brand) : setVehicleBrand("");
    // color ? setVehicleColor(color) : setVehicleColor("");
    // idDriver ? setIdDriver(idDriver) : setIdDriver("");
    // idPeopleDriver
    //   ? setIdPeopleDriver(idPeopleDriver)
    //   : setIdPeopleDriver(null);
    // name ? setNameDriver(name) : setNameDriver("");
    // setCheckedStatus(active);
  }
  // #endregion Fill Fields

  // #region alter page to consult
  function alterPageUpdateForConsult() {
    setOsFinded(false);
    clearFields("all");
    setTitleUpdate("");
    setUpdateRegister(false);
    setIsReadonly(true);
    setSearchOsBtnInactive(false);
  }
  // #endregion

  // #region Load Vehicle data
  async function loadDataVehicle(id) {
    try {
      clearFields("allNotIdVehicle");

      setOsFinded(false);
      console.log(id);

      const response = await api.get(`/vehicle/${id}`);

      if (response) {
        setOsFinded(true);
        fillFields(response.data);
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setOsFinded(false);

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
      } else if (error.request) {
        setOsFinded(false);
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
        console.log(error.request);
      } else {
        setOsFinded(false);
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
  function handleSearchOs(idVehicle) {
    if (idVehicle && !updateRegister) {
      loadDataVehicle(idVehicle);
      setUpdateRegister(false);
      setTitleUpdate("");
    }
  }
  // #endregion

  // #region Handle Alter to Update Register
  function handleUpdateRegister() {
    if (osFinded) {
      if (
        idSituation === 98 ||
        idSituation === "98" ||
        idSituation === 99 ||
        idSituation === "99"
      ) {
        notify(
          "warning",
          "Não foi possível acessar a alteração de dados, pois essa ordem de serviço encontra-se cancelada."
        );
      } else if (idSituation === 1 || idSituation === "1") {
        setTitleUpdate("ALTERAR ");

        setSearchOsBtnInactive(true);
        setUpdateRegister(true);
        setIsReadonly(false);

        setIsReadOnlyClient(false);
        setIsReadOnlyCbAddress(false);

        if (rbCheckedAddressOrigin) {
          setIsReadOnlyOrigin(true);
          setIsReadOnlyDestiny(false);
        }

        if (rbCheckedAddressDestiny) {
          setIsReadOnlyOrigin(false);
          setIsReadOnlyDestiny(true);
        }

        setIsReadOnlyPassengers(false);

        setIsReadOnlyObservationService(false);
        setIsReadOnlyObservationUpdate(false);
      } else if (idSituation === 2 || idSituation === "2") {
        setTitleUpdate("ALTERAR ");

        setSearchOsBtnInactive(true);
        setUpdateRegister(true);
        setIsReadonly(false);

        setIsReadOnlyClient(false);
        setIsReadOnlyCbAddress(false);

        if (rbCheckedAddressOrigin) {
          setIsReadOnlyOrigin(true);
          setIsReadOnlyDestiny(false);
        }

        if (rbCheckedAddressDestiny) {
          setIsReadOnlyOrigin(false);
          setIsReadOnlyDestiny(true);
        }

        setIsReadOnlyPassengers(false);

        setIsReadOnlyObservationService(false);
        setIsReadOnlyObservationUpdate(false);

        setIsReadOnlyVehicle(false);
        setIsReadOnlyDriver(false);
      } else if (idSituation === 3 || idSituation === "3") {
        setTitleUpdate("ALTERAR ");

        setSearchOsBtnInactive(true);
        setUpdateRegister(true);
        setIsReadonly(false);

        setIsReadOnlyCbAddress(false);

        if (rbCheckedAddressOrigin) {
          setIsReadOnlyOrigin(true);
          setIsReadOnlyDestiny(false);
        }

        if (rbCheckedAddressDestiny) {
          setIsReadOnlyOrigin(false);
          setIsReadOnlyDestiny(true);
        }
      } else if (
        idSituation === 7 ||
        idSituation === "7" ||
        idSituation === 8 ||
        idSituation === "8"
      ) {
        setTitleUpdate("ALTERAR ");

        setSearchOsBtnInactive(true);
        setUpdateRegister(true);
        setIsReadonly(false);

        setIsReadOnlyClient(false);
        setIsReadOnlyCbAddress(false);

        if (rbCheckedAddressOrigin) {
          setIsReadOnlyOrigin(true);
          setIsReadOnlyDestiny(false);
        }

        if (rbCheckedAddressDestiny) {
          setIsReadOnlyOrigin(false);
          setIsReadOnlyDestiny(true);
        }

        setIsReadOnlyPassengers(false);

        setIsReadOnlyObservationUpdate(false);

        setIsReadOnlyVehicle(false);
        setIsReadOnlyDriver(false);
      } else {
        notify(
          "warning",
          `Não foi possível acessar a alteração de dados, pois essa ordem de serviço encontra-se na situação: ${situation}.`
        );
      }
    } else if (idServiceOrder.length === 0) {
      notify(
        "warning",
        "Para acessar a alteração de dados primeiro selecione a ordem de serviço desejada."
      );
    } else {
      notify(
        "warning",
        "Não foi possível acessar a alteração de dados, pois nenhuma ordem de serviço foi encontrado."
      );
    }
  }
  // #endregion

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

    setTextButtonSaveUpdate("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataOs);

    try {
      const response = await api.post("/serviceOrders", dataOs);

      if (response) {
        console.log(response.data);

        notify("success", response.data.message);

        setTextButtonSaveUpdate("Salvar");
        setLoadingButton(false);
        setBtnInactive("");
        clearFields("all");
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
                      case "alterPageUpdateForConsult":
                        alterPageUpdateForConsult();
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
      complementDestiny !== "" ||
      observationService !== ""
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
  function handleCancelUpdate() {
    confirmationAlert(
      "Atenção!",
      "Deseja realmente CANCELAR essa alteração? Os dados não salvos serão perdidos.",
      "alterPageUpdateForConsult"
    );
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
        setIdServiceOrder("");

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

        setObservationService("");

        setIsReadOnlyOrigin(true);
        setIsReadOnlyDestiny(true);
        setRbCheckedAddressOrigin(true);
        setRbCheckedAddressDestiny(false);
        break;

      case "allWithoutIdServiceOrder":
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

        setObservationService("");

        setIsReadOnlyOrigin(true);
        setIsReadOnlyDestiny(true);
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

  // #region Handle Open Modal Search Vehicle
  function handleOpenModalSearchVehicles() {
    setLoadingModal(true);
    loadSearchVehicleList();

    setTitleIconModal(<RiTaxiLine size={30} />);
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
  function handleSelectVehicleInSearch(idVehicle, carPlateVehicle) {
    clearFields("allNotIdVehicle");
    setIdVehicle(idVehicle);
    setCarPlate(carPlateVehicle);
    handleCloseModalSearchVehicles();
    inputFocus("idDriver");
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
  function handleSelectDriverInSearch(idDriver, idPeopleDriver, nameDriver) {
    clearFields();
    setIdDriver(idDriver);
    setIdPeopleDriver(idPeopleDriver);
    setNameDriver(nameDriver);
    handleCloseModalSearchDriverEdit();
    inputFocus("nameDriver");
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
                        handleSelectVehicleInSearch(
                          vehicle.id,
                          vehicle.car_plate
                        )
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
                            handleSelectVehicleInSearch(
                              vehicle.id,
                              vehicle.car_plate
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
                        handleSelectDriverInSearch(
                          driver.id,
                          driver.id_people,
                          driver.People.name
                        )
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

      <LateralMenu></LateralMenu>

      <>
        {loading ? (
          <Loading type="bars" color="#0f4c82" />
        ) : (
          <div className="content-container">
            <ToastContainer />

            <Header
              title={"Ordens de Serviço"}
              icon={<RiFileListLine size={40} />}
            ></Header>
            <div className="os-consult-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/serviceorders">
                    <button type="button" className={`button tab-active`}>
                      <RiSearchEyeLine size={24} />
                      Consultar
                    </button>
                  </Link>

                  <Link to="/serviceorders/request">
                    <button type="button" className={`button add`}>
                      <RiAddLine size={24} />
                      Criar
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-title">
                    <RiBook2Line size={30} />
                    <h1>
                      {titleUpdate}
                      DADOS DA ORDEM DE SERVIÇO
                    </h1>
                  </div>

                  <div className="input-group-os">
                    <h1>
                      <RiFileListLine size={30} />
                      Ordem de Serviço
                    </h1>

                    <div
                      className="input-label-group-row"
                      id="input-label-block-column-cod-os"
                    >
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cod"
                      >
                        <label htmlFor="idServiceOrder">Código:</label>

                        <div className="input-button-block-row">
                          <input
                            ref={idServiceOrderInputRef}
                            id="idServiceOrder"
                            type="number"
                            min="1"
                            required
                            readOnly={searchOsBtnInactive}
                            value={idServiceOrder}
                            onChange={(e) => setIdServiceOrder(e.target.value)}
                            onBlur={() => {
                              handleSearchOs(idServiceOrder);
                            }}
                            onKeyUp={(e) => {
                              if (idServiceOrder.length === 0) {
                                clearFields("allWithoutIdServiceOrder");
                                clearFields("allWithoutIdServiceOrder");
                              }
                            }}
                          />

                          <button
                            type="button"
                            disabled={searchOsBtnInactive}
                            title="Pesquisar ordens de serviço."
                            className={`button btnDefault ${
                              searchOsBtnInactive ? "btnInactive" : ""
                            }`}
                            onClick={() => {
                              clearFields("allNotIdVehicle");
                              // handleOpenModalSearchVehicles();
                            }}
                          >
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="input-label-block-column"
                        id="inputSituation"
                      >
                        <label htmlFor="situation">Situação:</label>

                        <input
                          id="situation"
                          type="text"
                          readOnly
                          required
                          value={situation}
                          onChange={(e) => {
                            setSituation(e.target.value);
                          }}
                        />
                      </div>
                    </div>
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
                        readOnly
                        required
                      />
                      <button
                        type="button"
                        disabled={isReadOnlyClient}
                        title="Pesquisar ordens de serviço."
                        className={`button btnDefault ${
                          isReadOnlyClient ? "btnInactive" : ""
                        }`}
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

                        <div
                          className={`checkbox-block ${
                            isReadOnlyCbAddress ? "inactive" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="rbAddressClient"
                            id="rbAddressClientOrigin"
                            className={`${
                              isReadOnlyCbAddress ? "inactive" : ""
                            }`}
                            disabled={isReadOnlyCbAddress}
                            checked={rbCheckedAddressOrigin}
                            onChange={() => {
                              handleAddressCheckClient("origin");
                            }}
                          />
                          <label
                            htmlFor="rbAddressClientOrigin"
                            className={`${
                              isReadOnlyCbAddress ? "inactive" : ""
                            }`}
                          >
                            Cliente
                          </label>
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
                            readOnly
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
                            autoComplete="cc-csc"
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

                        <div
                          className={`checkbox-block ${
                            isReadOnlyCbAddress ? "inactive" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="rbAddressClient"
                            id="rbAddressClientDestiny"
                            className={`${
                              isReadOnlyCbAddress ? "inactive" : ""
                            }`}
                            disabled={isReadOnlyCbAddress}
                            checked={rbCheckedAddressDestiny}
                            onChange={() => {
                              handleAddressCheckClient("destiny");
                            }}
                          />
                          <label
                            htmlFor="rbAddressClientDestiny"
                            className={`${
                              isReadOnlyCbAddress ? "inactive" : ""
                            }`}
                          >
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
                            readOnly
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
                            autoComplete="cc-csc"
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

                  <div className="input-group-os">
                    <h1>
                      <RiGroupLine size={30} />
                      Passageiros
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-block-column">
                        <label htmlFor="passengerName">
                          Nome para contato:
                        </label>

                        <input
                          id="passengerName"
                          type="text"
                          value={passengerName}
                          autoComplete="cc-csc"
                          onChange={(e) => {
                            setPassengerName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="passengerPhone">
                          Telefone para contato:
                        </label>

                        <input
                          id="passengerPhone"
                          type="text"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          minLength="10"
                          maxLength="11"
                          value={passengerPhone}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              if (!onlyNumber(e.target.value)) {
                                return;
                              }
                            }
                            setPassengerPhone(e.target.value);
                          }}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="numberPassengers">
                          Número de passageiros:
                        </label>

                        <input
                          id="numberPassengers"
                          type="number"
                          min="1"
                          max="6"
                          autoComplete="cc-csc"
                          value={numberPassengers}
                          onChange={(e) => {
                            setNumberPassengers(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-os">
                    <h1>
                      <RiFileList3Line size={30} />
                      Observações
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-block-column">
                        <label htmlFor="observationService">Solicitação:</label>

                        <textarea
                          id="observationService"
                          value={observationService}
                          readOnly={isReadOnlyObservationService}
                          maxLength="254"
                          onChange={(e) =>
                            setObservationService(e.target.value)
                          }
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="observationUpdate">Alteração:</label>

                        <textarea
                          id="observationUpdate"
                          value={observationUpdate}
                          placeholder="Por que foi necessário a alteração?"
                          readOnly={isReadOnlyObservationUpdate}
                          onChange={(e) => setObservationUpdate(e.target.value)}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="observationCancellation">
                          Cancelamento:
                        </label>

                        <textarea
                          id="observationCancellation"
                          value={observationCancellation}
                          readOnly
                          onChange={(e) =>
                            setObservationCancellation(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-os" id="groupVehicleDriver">
                    <div className="row">
                      <div className="column">
                        <h1>
                          <RiTaxiLine size={30} />
                          Veículo
                        </h1>

                        <div className="row">
                          <div className="column" id="columnIdVehicle">
                            <label htmlFor="idVehicle">Código:</label>

                            <input
                              id="idVehicle"
                              type="text"
                              readOnly
                              value={idVehicle}
                              onChange={(e) => {
                                setIdVehicle(e.target.value);
                              }}
                            />
                          </div>

                          <div className="column">
                            <label htmlFor="carPlate">Placa:</label>

                            <div className="row">
                              <input
                                id="carPlate"
                                type="text"
                                minLength="7"
                                maxLength="7"
                                readOnly
                                value={carPlate}
                                onChange={(e) => {
                                  setCarPlate(e.target.value);
                                }}
                              />

                              <button
                                type="button"
                                className={`button btnDefault ${
                                  isReadOnlyVehicle ? "btnInactive" : ""
                                }`}
                                disabled={isReadOnlyVehicle}
                                onClick={() => {
                                  handleOpenModalSearchVehicles();
                                }}
                              >
                                <RiSearchLine size={24} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="column">
                        <h1>
                          <RiUserLocationLine size={30} />
                          Motorista
                        </h1>

                        <div className="row">
                          <div className="column" id="columnIdDriver">
                            <label htmlFor="idDriver">Código:</label>

                            <input
                              ref={idDriverInputRef}
                              id="idDriver"
                              type="text"
                              readOnly
                              value={idDriver}
                              onChange={(e) => {
                                setIdDriver(e.target.value);
                              }}
                            />
                          </div>

                          <div className="column">
                            <label htmlFor="nameDriver">Nome:</label>
                            <div className="row">
                              <input
                                ref={nameDriverInputRef}
                                id="nameDriver"
                                type="text"
                                readOnly
                                value={nameDriver}
                                onChange={(e) => {
                                  setNameDriver(e.target.value);
                                }}
                              />

                              <button
                                type="button"
                                className={`button btnDefault ${
                                  isReadOnlyDriver ? "btnInactive" : ""
                                }`}
                                disabled={isReadOnlyDriver}
                                onClick={() => {
                                  handleOpenModalSearchDriver();
                                }}
                              >
                                <RiSearchLine size={24} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="input-group-os">
                    <h1>
                      <RiCalendar2Line size={30} />
                      Data/Hora
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-block-column">
                        <label htmlFor="dateTimeSolicitation">
                          Solicitação:
                        </label>

                        <input
                          id="dateTimeSolicitation"
                          type="text"
                          placeholder="00/00/00 00:00:00"
                          readOnly
                          value={dateTimeSolicitation}
                          onChange={(e) => {
                            setDateTimeSolicitation(e.target.value);
                          }}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="dateTimeAttendance">Atendimento:</label>

                        <input
                          id="dateTimeAttendance"
                          type="text"
                          placeholder="00/00/00 00:00:00"
                          readOnly
                          value={dateTimeAttendance}
                          onChange={(e) => {
                            setDateTimeAttendance(e.target.value);
                          }}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="dateTimeFinished">Finalização:</label>

                        <input
                          id="dateTimeFinished"
                          type="text"
                          placeholder="00/00/00 00:00:00"
                          readOnly
                          value={dateTimeCompletion}
                          onChange={(e) => {
                            setDateTimeCompletion(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-os">
                    <h1>
                      <RiCoinsLine size={30} />
                      Valores
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-block-column">
                        <label htmlFor="totalValue">Total:</label>

                        <input
                          id="totalValue"
                          type="text"
                          placeholder="R$ 0,00"
                          readOnly
                          value={totalValue}
                          onChange={(e) => {
                            setTotalValue(e.target.value);
                          }}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="cancellationFee">
                          Taxa de cancelamento:
                        </label>

                        <input
                          id="cancellationFee"
                          type="text"
                          placeholder="R$ 0,00"
                          readOnly
                          value={cancellationFee}
                          onChange={(e) => {
                            setCancellationFee(e.target.value);
                          }}
                        />
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
                            clearFields("all");
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
