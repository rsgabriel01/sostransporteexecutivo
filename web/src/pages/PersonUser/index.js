import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import {
  RiUserSharedLine,
  RiAddLine,
  RiUserLine,
  RiCheckDoubleLine,
  RiPencilLine,
  RiCloseLine,
  RiCheckLine,
  RiQuestionLine,
  RiLoader4Line,
  RiArrowLeftLine,
  RiCheckboxMultipleLine,
  RiSearchEyeLine,
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

export default function PersonUser(props) {
  // #region Definitions
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [isReadonly, setIsReadonly] = useState(true);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [isCreateUser, setIsCreateUser] = useState(true);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [loadingButton, setLoadingButton] = useState(false);
  const [textButtonSaveUpdate, setTextButtonSaveUpdate] = useState("Salvar");
  const [btnInactive, setBtnInactive] = useState("");

  const [idPeople, setIdPeople] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);

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

  // #region Clear Fields
  function clearFields(withCode) {
    if (withCode) {
      setIdPeople("");
    }

    setUser("");
    setPassword("");
    setCheckedStatus(false);
  }
  // #endregion

  // #region Fill Fields
  function fillFields(response) {
    const { id } = response.person;

    if (response.user != null) {
      const { user, active } = response.user;

      setIsCreateUser(false);

      user ? setUser(user) : setUser("");
      active ? setCheckedStatus(active) : setCheckedStatus(false);
    } else {
      setIsCreateUser(true);
    }

    id ? setIdPeople(id) : setIdPeople("");
  }
  // #endregion

  // #region Load Data Person
  async function loadDataUser(id) {
    try {
      console.log(id);

      clearFields(true);

      const response = await api.get(`/person/${id}`);
      console.log(response.data);

      if (response) {
        if (response.data) {
          fillFields(response.data);
        }
      }

      console.log(response.data.user);
    } catch (error) {
      if (error.response) {
        console.log("if error.response");
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
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}. Error Request.`
        );
        console.log(error.request);
      } else {
        notify(
          "error",
          `Oops, algo deu errado, entre em contato com o suporte de TI. ${error}. Error`
        );
        console.log("Error", error.message);
        console.log("Error", error);
      }
    }
  }

  // #endregion

  function alterPageUpdateForConsultUser() {
    loadDataUser(idPeople);
    setTitleUpdate("");
    setUpdateRegister(false);
    setIsReadonly(true);
  }

  // #region Create Person
  async function createUser() {
    const dataUser = {
      idPeople,
      user,
      password,
      active: checkedStatus,
    };

    setTextButtonSaveUpdate("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataUser);

    try {
      const response = await api.post("/user/create", dataUser);

      if (response) {
        console.log(response.data);
        alterPageUpdateForConsultUser();

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
            case '"password" is not allowed to be empty':
              notify(
                "warning",
                "A senha não pode estar vazia, por favor verifique"
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

  // #region Update Person
  async function updateUser() {
    const dataUser = {
      idPeople,
      user,
      password,
      active: checkedStatus,
    };

    setTextButtonSaveUpdate("Aguarde...");
    setLoadingButton(true);
    setBtnInactive("btnInactive");

    console.log(dataUser);

    try {
      const response = await api.put("/user/update", dataUser);

      if (response) {
        console.log(response.data);
        alterPageUpdateForConsultUser();

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
        console.error(`data erros ${dataError}`);
        console.error(`estaus error ${statusError}`);

        if (statusError === 400 && dataError.message) {
          console.log(`switch ${dataError.message}`);
          switch (dataError.message) {
            // case '"password" length must be at least 8 characters long':
            //   notify("warning", "A senha deve conter no mínimo 8 caracteres.");
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

  // #region Handle Update Register
  function handleUpdateRegisterUser() {
    if (idPeople) {
      isCreateUser ? setTitleUpdate("CRIAR ") : setTitleUpdate("ALTERAR ");
      setUpdateRegister(true);
      setIsReadonly(false);
    } else if (idPeople.length === 0) {
      notify(
        "warning",
        "Para acessar a alteração de dados primeiro informe a pessoa desejada."
      );
    } else {
      notify(
        "warning",
        "Não foi possível acessar a alteração de dados, pois nenhuma pessoa foi encontrada com o código informado."
      );
    }
  }
  // #endregion

  // #region Handle Return Page Person
  function handleReturn() {
    history.push("/people/person");
  }
  // #endregion

  // #region Handle Check Checkbox
  function handleCheckBoxStatus(checkbox) {
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
                      case "alterPageUpdateForConsultUser":
                        alterPageUpdateForConsultUser();
                        break;
                      case "updateUser":
                        updateUser();
                        break;
                      case "createUser":
                        createUser();
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

  // #region Handle Submit Create
  function handleSubmitCreate(e) {
    e.preventDefault();

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR esse cadastro?",
      "createUser"
    );
  }
  // #endregion

  // #region Handle Submit Update
  function handleSubmitUpdate(e) {
    e.preventDefault();

    confirmationAlert(
      "Atenção!",
      "Deseja realmente SALVAR essa alteração?",
      "updateUser"
    );
  }
  // #endregion

  // #region Handle Cancel Update
  async function handleCancelUpdateUser() {
    confirmationAlert(
      "Atenção!",
      "Deseja realmente CANCELAR essa alteração? Os dados não salvos serão perdidos.",
      "alterPageUpdateForConsultUser"
    );
  }
  // #endregion

  // #region useEffect
  useEffect(() => {
    virifyAuthorization();
    loadDataUser(props.match.params.id);
  }, []);
  // #endregion

  return (
    <div className="main-container">
      <LateralMenu />
      <>
        {loading ? (
          <Loading type="bars" color="#0f4c82" />
        ) : (
          <div className="content-container">
            <ToastContainer />

            <Header title="Pessoa Física" icon={<RiUserLine size={40} />} />
            <div className="person-user-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/person">
                    <button type="button" className={`button `}>
                      <RiSearchEyeLine size={24} />
                      Consultar
                    </button>
                  </Link>

                  <Link to={`/people/person/user/${idPeople}`}>
                    <button type="button" className="button tab-active">
                      <RiUserSharedLine size={24} />
                      Usuário
                    </button>
                  </Link>

                  <Link to="/people/person/new">
                    <button type="button" className={`button `} id="add-person">
                      <RiAddLine size={24} />
                      Criar
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form
                  onSubmit={
                    isCreateUser ? handleSubmitCreate : handleSubmitUpdate
                  }
                >
                  <div className="form-title">
                    <RiCheckDoubleLine size={30} />
                    <h1>
                      {titleUpdate}
                      DADOS DE USUÁRIO
                    </h1>
                  </div>

                  <div className="group-form-fills-row">
                    <div
                      className="input-group-person"
                      id="input-group-person-cod"
                    >
                      <h1>
                        <RiUserLine size={30} />
                        Pessoa
                      </h1>

                      <div className="input-label-group-row">
                        <div className="input-label-block-column">
                          <label htmlFor="idPeople">Código:</label>

                          <input
                            id="idPeople"
                            type="text"
                            readOnly
                            required
                            value={idPeople}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="input-group-person">
                      <h1>
                        <RiUserSharedLine size={30} />
                        Usuário
                      </h1>

                      <div className="input-label-group-row">
                        <div className="input-label-group-row">
                          <div className="input-label-block-column">
                            <label htmlFor="user">Nome de usuário:</label>

                            <input
                              id="user"
                              readOnly={isReadonly}
                              type="text"
                              value={user}
                              onChange={(e) => setUser(e.target.value)}
                              required
                            />
                          </div>

                          <div className="input-label-block-column">
                            <label htmlFor="password">Senha:</label>

                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="password"
                              minLength="8"
                              maxLength="16"
                              readOnly={isReadonly}
                              required={isCreateUser}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="input-group-person" id="input-group-person-2">
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
                              handleCheckBoxStatus("cbStatus");
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
                            handleCancelUpdateUser();
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
                            handleReturn();
                          }}
                        >
                          <RiArrowLeftLine size={25} />
                          Voltar
                        </button>
                        <button
                          type="button"
                          className="button btnDefault"
                          onClick={() => {
                            handleUpdateRegisterUser();
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
