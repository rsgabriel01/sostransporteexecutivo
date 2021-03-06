import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import {
  RiFileCopy2Line,
  RiArrowRightLine,
  RiTaxiWifiLine,
  RiCheckLine,
  RiFileList2Line,
  RiFilterLine,
  RiCloseLine,
  RiQuestionLine,
  RiCloseCircleLine,
  RiLoader4Line,
  RiArrowLeftLine,
  RiRefreshLine,
  RiFilterOffLine,
} from "react-icons/ri";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import notify from "../../helpers/notifys";
import api from "../../services/api";
import { isAuthenticated, logout } from "../../services/auth";

import {
  getDateForDatePickerWithClassDate,
  getDateForDatePickerWithDateString,
  getDateOfDatePickerValue,
} from "../../helpers/dates";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import jsonClassesModal from "../../helpers/stylesModal";

export default function MainMet() {
  let history = useHistory();

  const date = new Date();

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [loadingOsList, setLoadingOsList] = useState(false);
  const [filtered, setFiltered] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [startDate, setStartDate] = useState(
    getDateForDatePickerWithClassDate(date)
  );
  const [endDate, setEndDate] = useState(
    getDateForDatePickerWithClassDate(date)
  );

  const [idServiceOrder, setIdServiceOrder] = useState("");
  const [nameFantasyClient, setNameFantasyClient] = useState("");
  const [idSituationServiceOrder, setIdSituationServiceOrder] = useState("");
  const [situation, setSituation] = useState("");
  const [dateTimeSolicitation, setDateTimeSolicitation] = useState("");
  const [originServiceOrder, setOriginServiceOrder] = useState("");
  const [destinyServiceOrder, setDestinyServiceOrder] = useState("");
  const [observationCancellation, setObservationCancellation] = useState("");

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const [osList, setOsList] = useState([]);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();
  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();

  const [openModalCancelOs, setOpenModalCancelOs] = useState(false);
  const [searchClient, setSearchClient] = useState("");
  const [searchClientList, setSearchClientList] = useState([]);

  //#region Use Effect
  useEffect(() => {
    virifyAuthorization();

    loadOsListAll();

    // const timer = () => {
    //   if (!filtered) {
    //     loadOsListAll();
    //     console.log("chamou load all");
    //   } else {
    //     loadOsListFiltered();
    //     console.log("chamou load filtrado");
    //   }

    //   setTimeout(() => {
    //     timer();
    //   }, 60000);
    // };

    // timer();

    // return () => clearTimeout(timer);
  }, []);
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
                      case "cancelOs":
                        cancelOs();
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

  // #region Focus Fields
  function inputFocus(input) {
    switch (input) {
      case "startDate":
        setTimeout(() => {
          startDateInputRef.current.focus();
        }, 1);
        break;
      case "endDate":
        setTimeout(() => {
          endDateInputRef.current.focus();
        }, 1);
        break;

      default:
        break;
    }
  }
  //#endregion Focus Fields

  // #region Clear Filter
  function clearFilter() {
    loadOsListAll();
    setFiltered(false);
  }
  // #endregion Clear Filter

  // #region Handle Filter List
  function handleFilterList() {
    if (startDate === "" || endDate === "") {
      notify(
        "warning",
        "Para filtrar a lista de ordens de serviço atendidas os dados do periodo devem estar preenchidos, por favor verifique."
      );

      inputFocus("startDate");
      return;
    }

    if (startDate > endDate) {
      notify(
        "warning",
        "Para filtrar a lista de ordens de serviço atendidas a data final do periodo não pode ser menor que a data inicial, por favor verifique."
      );

      inputFocus("startDate");
      return;
    }

    loadOsListFiltered();
  }
  // #endregion Handle Filter List

  // #region  Load OS List All
  async function loadOsListAll() {
    setLoadingOsList(true);
    const situationsString = "2";

    try {
      const response = await api.get(
        `/serviceOrders/index/?situations=${situationsString}`
      );

      if (response) {
        console.log(response.data);
        setOsList(response.data);
        setLoadingOsList(false);
      }
    } catch (error) {
      setLoadingOsList(false);

      if (error.response) {
        const dataError = error.response.data;
        const statusError = error.response.status;
        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          switch (dataError.message) {
            // case '"nameFantasyClient" is required':
            //   notify(
            //     "error",
            //     "Oops, algo deu errado, entre em contato com o suporte de TI. Erro: o QUERY PARAM 'nameFantasyClient' não foi encontrado no endereço da rota."
            //   );
            //   break;

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
      } else {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
      }
    }
  }
  // #endregion Load OS List All

  //#region  Load OS List Of Filter
  async function loadOsListFiltered() {
    setLoadingOsList(true);
    const situationsString = "2";

    try {
      const response = await api.get(
        `/serviceOrders/index/period/solicitation/?situations=${situationsString}&startDate=${startDate}&endDate=${endDate}`
      );

      if (response) {
        console.log(response.data);
        setFiltered(true);
        setOsList(response.data);
        setLoadingOsList(false);
      }
    } catch (error) {
      setLoadingOsList(false);

      if (error.response) {
        const dataError = error.response.data;
        const statusError = error.response.status;
        console.error(dataError);
        console.error(statusError);

        if (statusError === 400 && dataError.message) {
          switch (dataError.message) {
            // case '"nameFantasyClient" is required':
            //   notify(
            //     "error",
            //     "Oops, algo deu errado, entre em contato com o suporte de TI. Erro: o QUERY PARAM 'nameFantasyClient' não foi encontrado no endereço da rota."
            //   );
            //   break;

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
      } else {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
      }
    }
  }
  //#endregion  Load OS List Of Filter

  // #region Cancel OS
  async function cancelOs() {
    setTextButtonSaveUpdate("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    try {
      console.log(observationCancellation);

      const cancelData = {
        observationCancellation,
      };

      console.log(cancelData);

      const response = await api.put(
        `/serviceOrder/cancellation/noFee/${idServiceOrder}`,
        cancelData
      );

      if (response) {
        console.log(response.data);

        notify("success", response.data.message);

        setTextButtonSaveUpdate("Salvar");
        setLoadingButton(false);
        setBtnInactive("");
        handleCloseModalCancelOs();
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
            case '"observationUpdate" is required':
              notify(
                "warning",
                "É obrigatorio informar a observação da alteração, por favor verifique."
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

        if (statusError === 404) {
          notify(
            "error",
            "Ooops, a rota dessa requisição não foi encontrada, por favor entre em contato com setor de TI."
          );
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
  // #endregion Cancel OS

  // #region Handle Submit Cancel Os
  function handleSubmitCancelOs(e) {
    e.preventDefault();

    console.log(idServiceOrder);
    console.log(idSituationServiceOrder);

    if (idServiceOrder === "" || idSituationServiceOrder === "") {
      notify(
        "warning",
        "Os dados de ordem de serviço devem estar preenchidos, por favor verifique."
      );
      return;
    }

    if (idSituationServiceOrder === 4 || idSituationServiceOrder === "4") {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR essa ordem de serviço? Na situação que ela está será cobrado uma taxa de cancelamento.",
        "cancelOs"
      );
    } else if (
      idSituationServiceOrder !== 1 ||
      idSituationServiceOrder !== "1" ||
      idSituationServiceOrder !== 2 ||
      idSituationServiceOrder !== "2" ||
      idSituationServiceOrder !== 3 ||
      idSituationServiceOrder !== "3"
    ) {
      confirmationAlert(
        "Atenção!",
        "Deseja realmente CANCELAR essa ordem de serviço?",
        "cancelOs"
      );
    }
  }
  // #endregion Handle Submit Cancel Os

  // #region Handle Open Modal Search client
  const handleOpenModalCancelOs = (idServiceOrder, idSituationServiceOrder) => {
    if (idSituationServiceOrder < 1 && idSituationServiceOrder > 4) {
      notify(
        "warning",
        "Essa ordem de serviço não está em uma situação apta a cancelamento."
      );
      return;
    }

    setLoadingModal(true);
    loadCancelOsData(idServiceOrder);

    setTitleIconModal(<RiCloseCircleLine size={30} />);
    setTitleModal("CANCELAR ORDEM DE SERVIÇO");
    setOpenModalCancelOs(true);
  };

  const handleCloseModalCancelOs = () => {
    setTitleModal("");
    setSearchClient("");
    clearFieldsCancelOs();
    setOpenModalCancelOs(false);
    if (filtered) {
      loadOsListFiltered();
    } else {
      loadOsListAll();
    }
  };
  // #endregion

  //#region Fill Fields Cancel OS
  function fillFieldsCancelOs(response) {
    if (response) {
      const idServiceOrder = response.id;
      idServiceOrder
        ? setIdServiceOrder(idServiceOrder)
        : setIdServiceOrder("");

      const idSituationServiceOrder = response.id_status;
      idSituationServiceOrder
        ? setIdSituationServiceOrder(idSituationServiceOrder)
        : setIdSituationServiceOrder("");

      const dateTimeSolicitation = response.date_time_solicitation;
      dateTimeSolicitation
        ? setDateTimeSolicitation(
            `${getDateOfDatePickerValue(
              dateTimeSolicitation.substring(0, 10)
            )} ${dateTimeSolicitation.substring(10)}`
          )
        : setDateTimeSolicitation("");

      if (response.Neighborhood_origin) {
        const clientOrigin = response.client_origin;
        clientOrigin
          ? setOriginServiceOrder("CLIENTE")
          : setOriginServiceOrder(response.Neighborhood_origin.name);
      }

      if (response.Neighborhood_destiny) {
        const clientOrigin = response.client_destiny;
        clientOrigin
          ? setDestinyServiceOrder("CLIENTE")
          : setDestinyServiceOrder(response.Neighborhood_destiny.name);
      }
    }

    if (response.Client) {
      const nameFantasyClient = response.Client.name_fantasy;
      nameFantasyClient
        ? setNameFantasyClient(nameFantasyClient)
        : setNameFantasyClient("");
    }

    if (response.Status) {
      const situation = response.Status.description;
      situation ? setSituation(situation) : setSituation("");
    }
  }
  //#endregion Fill Fields Cancel OS

  //#region Clear Fields Cancel OS
  function clearFieldsCancelOs() {
    setIdServiceOrder("");
    setSituation("");
    setDateTimeSolicitation("");
    setOriginServiceOrder("");
    setDestinyServiceOrder("");
    setObservationCancellation("");
  }
  //#endregion Clear Fields Cancel OS

  // #region Load Cancel OS Data
  async function loadCancelOsData(idServiceOrder) {
    try {
      clearFieldsCancelOs();

      setLoadingModal(true);

      const response = await api.get(`/serviceOrder/${idServiceOrder}`);

      if (response) {
        console.log(response.data);

        setLoadingModal(false);
        fillFieldsCancelOs(response.data);
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

  //#region Handle Set Start Date
  function testObjectConsult() {
    const data = {
      startDate: getDateOfDatePickerValue(startDate),
      endDate: getDateOfDatePickerValue(endDate),
    };

    return data;
  }
  //#endregion

  return (
    <div className="main-container">
      <Modal
        id="modalSearchClient"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ClassesModal.modal}
        open={openModalCancelOs}
        onClose={handleCloseModalCancelOs}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalCancelOs}>
          <div className={ClassesModal.paper}>
            <h1 className="modal-title">
              {titleIconModal} {titleModal}{" "}
              {!loadingModal ? (
                ""
              ) : (
                <RiLoader4Line size={30} className="load-spinner-button" />
              )}
            </h1>
            <div className="modal-content">
              <section className="form">
                <form onSubmit={handleSubmitCancelOs}>
                  <div className="input-group">
                    <div className="row">
                      <div className="column" id="columnIdServiceOrder">
                        <label htmlFor="idServiceOrder">Código:</label>

                        <input
                          id="idServiceOrder"
                          type="number"
                          min="1"
                          required
                          readOnly
                          value={idServiceOrder}
                          required
                        />
                      </div>

                      <div className="column">
                        <label htmlFor="situation">Situação:</label>

                        <input
                          id="situation"
                          type="text"
                          readOnly
                          value={situation}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="row">
                      <div className="column">
                        <label htmlFor="nameFantasyClient">Cliente:</label>

                        <input
                          id="nameFantasyClient"
                          type="text"
                          readOnly
                          value={nameFantasyClient}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="row">
                      <div className="column">
                        <label htmlFor="dateTimeSolicitation">
                          Data/Hora solicitação:
                        </label>

                        <input
                          id="dateTimeSolicitation"
                          type="text"
                          readOnly
                          value={dateTimeSolicitation}
                          required
                        />
                      </div>

                      <div className="column">
                        <label htmlFor="origin">Origem:</label>

                        <input
                          id="origin"
                          type="text"
                          readOnly
                          value={originServiceOrder}
                        />
                      </div>

                      <div className="column">
                        <label htmlFor="destiny">Destino:</label>

                        <input
                          id="destiny"
                          type="text"
                          readOnly
                          value={destinyServiceOrder}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="row">
                      <div className="column">
                        <label htmlFor="observationCancellation">Motivo:</label>

                        <textarea
                          id="observationCancellation"
                          placeholder="Qual o motivo do cancelamento dessa ordem de serviço?"
                          value={observationCancellation}
                          onChange={(e) => {
                            setObservationCancellation(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="button-group">
                    <button
                      type="button"
                      className={`button btnReturn ${btnInactive}`}
                      disabled={loadingButton}
                      onClick={() => {
                        handleCloseModalCancelOs();
                      }}
                    >
                      <RiArrowLeftLine size={30} />
                      Voltar
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
                  </div>
                </form>
              </section>
            </div>
          </div>
        </Fade>
      </Modal>

      <LateralMenu></LateralMenu>
      <div className="content-container">
        <ToastContainer />

        <Header
          title={"Solicitações"}
          icon={<RiFileList2Line size={40} />}
        ></Header>
        <>
          {loading ? (
            <Loading type="bars" color="#0f4c82" />
          ) : (
            <div className="solicitations-met-container">
              <div className="status-bar">
                <div className="group-tabs">
                  <Link to="/main">
                    <button type="button" className={`button `}>
                      <RiFileCopy2Line size={24} />
                      Aguardando
                    </button>
                  </Link>
                  <Link to="/main/met">
                    <button type="button" className={`button tab-active`}>
                      <RiArrowRightLine size={24} />
                      Atendidas
                    </button>
                  </Link>
                  <Link to="/main/executing">
                    <button type="button" className={`button `}>
                      <RiTaxiWifiLine size={22} />
                      Execução
                    </button>
                  </Link>
                  <Link to="/main/finished">
                    <button type="button" className={`button `}>
                      <RiCheckLine size={24} />
                      Finalizadas
                    </button>
                  </Link>
                </div>

                <div className="group-dates">
                  <div className="row">
                    <div className="column">
                      <label htmlFor="startDate">Inicio:</label>
                      <input
                        ref={startDateInputRef}
                        type="date"
                        id="startDate"
                        readOnly={filtered}
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="column">
                      <label htmlFor="endDate">Fim:</label>
                      <input
                        ref={endDateInputRef}
                        type="date"
                        id="endDate"
                        readOnly={filtered}
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {!filtered ? (
                    <>
                      <button
                        type="button"
                        className="button btnOther"
                        id="filterDate"
                        title="Filtrar"
                        onClick={() => {
                          handleFilterList();
                        }}
                      >
                        <RiFilterLine size={24} />
                      </button>

                      <button
                        type="button"
                        className="button btnSuccess"
                        id="filterDate"
                        title="Atualizar listagem sem filtro"
                        onClick={() => {
                          loadOsListAll();
                        }}
                      >
                        <RiRefreshLine size={24} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="button btnOther"
                        id="filterDate"
                        title="Limpar filtro"
                        onClick={() => {
                          clearFilter();
                        }}
                      >
                        <RiFilterOffLine size={24} />
                      </button>

                      <button
                        type="button"
                        className="button btnSuccess"
                        id="filterDate"
                        title="Atualizar listagem filtrada"
                        onClick={() => {
                          loadOsListFiltered();
                        }}
                      >
                        <RiRefreshLine size={24} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="solicitation-met-table">
                <table className="table-header">
                  <thead>
                    <tr id="table-header">
                      <th>CÓDIGO</th>
                      <th>CLIENTE</th>
                      <th>ATENDIDO</th>
                      <th>MOTORISTA</th>
                      <th>ORIGEM</th>
                      <th>DESTINO</th>
                      <th>OBSERVAÇÃO</th>
                      <th>AÇÕES</th>
                    </tr>
                  </thead>
                </table>

                <div className="div-responsive-table">
                  {loadingOsList ? (
                    <Loading type="bars" color="#0f4c82" />
                  ) : (
                    <table className="table-content">
                      <tbody>
                        {osList.map((os) => (
                          <tr key={os.id}>
                            <td>{os.id ? os.id : ""}</td>
                            <td>
                              {os.Client.name_fantasy
                                ? os.Client.name_fantasy
                                : ""}
                            </td>
                            <td>{`${
                              os.date_time_attendance
                                ? getDateOfDatePickerValue(
                                    os.date_time_attendance.substring(0, 10)
                                  )
                                : "00/00/00"
                            } ${
                              os.date_time_attendance
                                ? os.date_time_attendance.substring(10)
                                : "00:00:00"
                            }`}</td>
                            <td>{os.Driver ? os.Driver.name : ""}</td>
                            <td>
                              {os.client_origin
                                ? "CLIENTE"
                                : os.Neighborhood_origin.name
                                ? os.Neighborhood_origin.name
                                : ""}
                            </td>
                            <td>
                              {os.client_destiny
                                ? "CLIENTE"
                                : os.Neighborhood_destiny.name
                                ? os.Neighborhood_destiny.name
                                : ""}
                            </td>
                            <td>
                              {os.observation_service
                                ? os.observation_service
                                : ""}
                            </td>
                            <td>
                              <div className="answer">
                                <button
                                  type="button"
                                  title={
                                    os.id_status > 0 && os.id_status <= 3
                                      ? "Cancelar ordem de serviço"
                                      : os.id_status == 4
                                      ? "Cancelar ordem de serviço (gera taxa de cancelamento)"
                                      : os.id_status > 4
                                      ? "Não é possivel cancelar essa ordem de serviço"
                                      : ""
                                  }
                                  className={`button btnCancel ${
                                    os.id_status > 4 || os.id_status < 1
                                      ? "btnInactive"
                                      : ""
                                  }`}
                                  disabled={
                                    os.id_status > 4 || os.id_status < 1
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    handleOpenModalCancelOs(
                                      os.id,
                                      os.id_status
                                    );
                                  }}
                                >
                                  <RiCloseLine size={24} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
