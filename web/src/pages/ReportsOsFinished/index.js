import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  RiFileTextLine,
  RiSearchLine,
  RiFileSearchLine,
  RiPrinterLine,
  RiFileExcel2Line,
  RiUser2Line,
  RiArrowRightUpLine,
  RiBrushLine,
  RiQuestionLine,
  RiCloseLine,
  RiCheckLine,
  RiMailLine,
} from "react-icons/ri";

import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import notify from "../../helpers/notifys";
import api from "../../services/api";
import { isAuthenticated, logout } from "../../services/auth";

import {
  getDateForDatePickerWithClassDate,
  getDateOfDatePickerValue,
} from "../../helpers/dates";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import jsonClassesModal from "../../helpers/stylesModal";

export default function Main() {
  let history = useHistory();

  const date = new Date();

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(false);

  const [idClient, setIdClient] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [startDate, setStartDate] = useState(
    getDateForDatePickerWithClassDate(date)
  );
  const [endDate, setEndDate] = useState(
    getDateForDatePickerWithClassDate(date)
  );
  const [totalCountOs, setTotalCountOs] = useState("0");
  const [totalValue, setTotalValue] = useState("00");

  const fantasyNameInputRef = useRef(null);
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const [reportOsList, setReportOsList] = useState([]);

  const useStyles = makeStyles((theme) => jsonClassesModal(theme));
  const ClassesModal = useStyles();
  const [titleModal, setTitleModal] = useState("");
  const [titleIconModal, setTitleIconModal] = useState();

  const [openModalSearchClient, setOpenModalSearchClient] = useState(false);
  const [searchClient, setSearchClient] = useState("");
  const [searchClientList, setSearchClientList] = useState([]);

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
  //#endregion

  // #region Use Effect
  useEffect(() => {
    virifyAuthorization();
  }, []);
  //#endregion

  // #region Clear Fields
  function clearFields() {
    setIdClient("");
    setFantasyName("");
    // setStartDate(getDateForDatePickerWithClassDate(date));
    // setEndDate(getDateForDatePickerWithClassDate(date));
    setTotalCountOs("0");
    setTotalValue("00");
  }

  // #endregion

  // #region Focus Fields
  function inputFocus(input) {
    switch (input) {
      case "fantasyName":
        setTimeout(() => {
          fantasyNameInputRef.current.focus();
        }, 1);
        break;
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
                      case "clearReport":
                        clearReport();
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

  // #region  Load OS List of Report
  async function loadReportOsList() {
    setLoadingReport(true);

    try {
      const response = await api.get(
        `/reports/serviceOrders/completed/?idClient=${idClient}&startDate=${startDate}&endDate=${endDate}`
      );

      if (response) {
        console.log(response.data.serviceOrders);
        console.log(response.data.monthlyData.totalValue);
        console.log(response.data.monthlyData.totalAmount);

        setGeneratedReport(true);
        setReportOsList(response.data.serviceOrders);
        setTotalValue(response.data.monthlyData.totalValue);
        setTotalCountOs(response.data.monthlyData.totalAmount);
        setLoadingReport(false);
      }
    } catch (error) {
      setLoadingReport(false);

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
  // #endregion Load OS List of Report

  // #region Handle Generate Report
  function handleGenerateReport() {
    if (idClient === "" || fantasyName === "") {
      notify(
        "warning",
        "Para gerar o relatorio os dados do cliente devem estar preenchidos, por favor verifique."
      );

      inputFocus("fantasyName");
      return;
    }

    if (startDate === "" || endDate === "") {
      notify(
        "warning",
        "Para gerar o relatorio os dados do periodo devem estar preenchidos, por favor verifique."
      );

      inputFocus("startDate");
      return;
    }

    if (startDate > endDate) {
      notify(
        "warning",
        "Para gerar o relatorio a data final do periodo não pode ser menor que a data inicial, por favor verifique."
      );

      inputFocus("startDate");
      return;
    }
    loadReportOsList();
  }
  // #endregion Handle Generate Report

  // #region Clear Report
  function clearReport() {
    setReportOsList([]);
    clearFields();
    setGeneratedReport(false);
  }
  // #endregion Clear Report

  // #region Handle Clear Report
  function handleClearReport() {
    confirmationAlert(
      "Atenção!",
      "Deseja realmente LIMPAR os dados do relatório desse cliente?",
      "clearReport"
    );
  }
  // #endregion Handle Clear Report

  // #region Handle Open Modal Search client
  const handleOpenModalSearchClient = () => {
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
  function handleSelectClientInSearch(id, nameFantasy) {
    setIdClient(id);
    setFantasyName(nameFantasy);
    handleCloseModalSearchClientEdit();
    inputFocus("startDate");
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
      } else {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}`
        );
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
            <h1 className="modal-title">
              {titleIconModal} {titleModal}
            </h1>
            <div className="modal-content">
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
                          client.name_fantasy
                        )
                      }
                    >
                      <div className="searchItenData">
                        <strong>Código: {client.id}</strong>
                        <section id="searchClientData">
                          <p id="searchCnpjClient">
                            <strong>CNPJ: </strong>
                            {client.cpf_cnpj}
                          </p>
                          <p id="searchFantasyNameClient">
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
                          onClick={() =>
                            handleSelectClientInSearch(
                              client.id,
                              client.name_fantasy
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
      <div className="content-container">
        <ToastContainer />

        <Header
          title={"Relatório de ordens de serviço finalizadas"}
          icon={<RiFileTextLine size={40} />}
        />
        <>
          {loading ? (
            <Loading type="bars" color="#0f4c82" />
          ) : (
            <div className="reports-osFinished-container">
              <div className="status-bar">
                <div className="group-filters">
                  <div className="row">
                    <div className="column" id="columnClient">
                      <label htmlFor="startDate">Cliente:</label>

                      <input
                        ref={fantasyNameInputRef}
                        type="text"
                        autoFocus
                        value={fantasyName}
                        onChange={(e) => {
                          setFantasyName(e.target.value);
                        }}
                        readOnly
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="button btnDefault"
                    id="searchClient"
                    onClick={() => {
                      handleOpenModalSearchClient();
                    }}
                  >
                    <RiSearchLine size={24} />
                  </button>

                  <div className="row">
                    <div className="column">
                      <label htmlFor="startDate">Inicio:</label>
                      <input
                        ref={startDateInputRef}
                        type="date"
                        id="startDate"
                        disabled={generatedReport}
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
                        disabled={generatedReport}
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="group-button">
                  {generatedReport ? (
                    <>
                      <button
                        type="button"
                        id="printReport"
                        className={`button ${
                          !generatedReport ? "inactive" : ""
                        }`}
                        disabled={!generatedReport}
                        onClick={() => alert("teste print")}
                      >
                        <RiPrinterLine size={24} />
                      </button>

                      <button
                        type="button"
                        id="mailReport"
                        className={`button ${
                          !generatedReport ? "inactive" : ""
                        }`}
                        disabled={!generatedReport}
                        onClick={() => alert("teste mail")}
                      >
                        <RiMailLine size={24} />
                      </button>

                      <button
                        type="button"
                        id="saveReport"
                        className={`button ${
                          !generatedReport ? "inactive" : ""
                        }`}
                        disabled={!generatedReport}
                        onClick={() => alert("teste excel")}
                      >
                        <RiFileExcel2Line size={24} />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  <>
                    {!generatedReport ? (
                      <button
                        type="button"
                        className="button btnOther"
                        id="generateReport"
                        onClick={() => {
                          handleGenerateReport();
                        }}
                      >
                        <RiFileSearchLine size={24} />
                        Gerar
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button btnOther"
                        id="generateReport"
                        onClick={() => {
                          handleClearReport();
                        }}
                      >
                        <RiBrushLine size={24} />
                        Limpar
                      </button>
                    )}
                  </>
                </div>
              </div>

              <div className="reports-osFinished-table">
                <table className="table-header">
                  <thead>
                    <tr id="table-header">
                      <th></th>
                      <th>CÓDIGO</th>
                      <th>CLIENTE</th>
                      <th>SOLICITADO</th>
                      <th>FINALIZADO</th>
                      <th>ORIGEM</th>
                      <th>DESTINO</th>
                      <th>VALOR</th>
                    </tr>
                  </thead>
                </table>

                <div className="div-responsive-table">
                  {loadingReport ? (
                    <Loading type="bars" color="#0f4c82" />
                  ) : (
                    <table className="table-content">
                      <tbody>
                        {reportOsList.map((os) => (
                          <tr key={os.id}>
                            <td></td>

                            <td>{os.id}</td>

                            <td>{os.Client.name_fantasy}</td>

                            <td>{`${getDateOfDatePickerValue(
                              os.date_time_solicitation.substring(0, 10)
                            )} ${os.date_time_solicitation.substring(10)}`}</td>

                            <td>{`${getDateOfDatePickerValue(
                              os.date_time_completion.substring(0, 10)
                            )} ${os.date_time_completion.substring(10)}`}</td>

                            <td>
                              {os.client_origin
                                ? "CLIENTE"
                                : os.Neighborhood_origin.name}
                            </td>

                            <td>
                              {os.client_destiny
                                ? "CLIENTE"
                                : os.Neighborhood_destiny.name}
                            </td>

                            <td>
                              R${" "}
                              {os.id_status == 98
                                ? os.cancellation_fee
                                : os.travel_value}
                              ,00
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <table className="table-footer">
                  <tfoot>
                    <tr id="table-footer">
                      <th>TOTAL</th>
                      <th>{totalCountOs}</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>R$ {totalValue},00</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
