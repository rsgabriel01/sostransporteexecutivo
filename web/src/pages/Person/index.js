import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";
import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import notify from "../../helpers/notifys";
import { ToastContainer } from "react-toastify";

import api from "../../services/api";

import {
  isAuthenticated,
  getToken,
  getIdExecutingPerson,
} from "../../services/auth";

import {
  RiSearchLine,
  RiMapPinLine,
  RiBookLine,
  RiUserSharedLine,
  RiAddLine,
  RiUserLine,
  RiCheckDoubleLine,
  RiPencilLine,
  RiUserStarLine,
  RiCloseLine,
  RiCheckLine,
  RiBrushLine,
} from "react-icons/ri";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

export default function ServiceOrdersRequest() {
  //#region Definitions
  let history = useHistory();
  const [loading, setLoading] = useState(true);

  const [isReadonly, setIsReadonly] = useState(true);

  const [updateRegister, setUpdateRegister] = useState(false);

  const [titleUpdate, setTitleUpdate] = useState("");

  const [personFinded, setPersonFinded] = useState(false);

  const [id_people, setIdPeople] = useState("");
  const [name, setName] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");
  const [rg, setRg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [typePersonAdmin, setTypePersonAdmin] = useState("");
  const [typePersonAttendance, setTypePersonAttendance] = useState("");
  const [typePersonDriver, setTypePersonDriver] = useState("");

  const [checkedTypeAdmin, setCheckedTypeAdmin] = useState(false);
  const [checkedTypeAttendance, setCheckedTypeAttendance] = useState(false);
  const [checkedTypeDriver, setCheckedTypeDriver] = useState(false);

  //#endregion

  //#region useEffect
  useEffect(() => {
    virifyAuthorization();
  }, []);

  //#endregion

  //#region Verify Session
  async function virifyAuthorization() {
    const response = await isAuthenticated();
    if (!response) {
      console.log("response" + response);
      history.push("/");
    } else {
      setLoading(false);
    }
  }

  //#endregion

  //#region Load Data Person

  async function loadDataPerson(id) {
    try {
      clearFields();

      setPersonFinded(false);

      const response = await api.get(`/person/${id}`, {
        headers: {
          token: getToken(),
          id_executingperson: getIdExecutingPerson(),
        },
      });

      if (response) {
        setPersonFinded(true);
        fillFields(response.data);
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setPersonFinded(false);
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

  //#endregion

  //#region Request Service Order
  async function handleRequestOs(e) {
    e.preventDefault();
  }
  //#endregion

  function fillFields(response) {
    const { name, cpf_cnpj, rg, phone, email, active } = response.person;

    const typeIds = response.peopleType.map(function (index) {
      return index.id;
    });

    console.log(typeIds);

    console.log(typeIds.includes("1"));

    name ? setName(name) : setName("");

    cpf_cnpj ? setCpf_cnpj(cpf_cnpj) : setCpf_cnpj("");

    rg ? setRg(rg) : setRg("");

    phone ? setPhone(phone) : setPhone("");

    email ? setEmail(email) : setEmail("");

    typeIds.includes("1")
      ? setCheckedTypeAdmin(true)
      : setCheckedTypeAdmin(false);

    typeIds.includes("2")
      ? setCheckedTypeAttendance("true")
      : setCheckedTypeAttendance(false);

    typeIds.includes("3")
      ? setCheckedTypeDriver(true)
      : setCheckedTypeDriver(false);
  }

  //#region On Check Checkbox
  function handleCheckBox(checkbox) {
    switch (checkbox) {
      case "cbAdmin":
        console.log("type admin anterior " + checkedTypeAdmin);

        checkedTypeAdmin ? setTypePersonAdmin("") : setTypePersonAdmin(1);
        setCheckedTypeAdmin(!checkedTypeAdmin);

        console.log("type admin novo " + checkedTypeAdmin);

        break;
      case "cbAttendance":
        console.log("type attendance anterior " + checkedTypeAttendance);
        checkedTypeAttendance
          ? setTypePersonAttendance("")
          : setTypePersonAttendance(2);
        console.log("type attendance novo " + checkedTypeAttendance);
        break;
      case "cbDriver":
        console.log("type Driver anterior" + checkedTypeDriver);
        checkedTypeDriver ? setTypePersonDriver("") : setTypePersonDriver(3);
        console.log("type Driver novo" + checkedTypeDriver);
        break;

      default:
        break;
    }
  }
  //#endregion

  //#region Search Person
  function handleSearchPerson(idPerson) {
    if (idPerson) {
      loadDataPerson(idPerson);
      setUpdateRegister(false);
      setTitleUpdate("");
    } else {
      clearFields();
    }
  }
  //#endregion

  //#region Clear Fields
  function clearFields(withCode) {
    if (withCode) {
      setIdPeople("");
    }

    setName("");
    setCpf_cnpj("");
    setRg("");
    setPhone("");
    setEmail("");
    setCheckedTypeAdmin(false);
    setCheckedTypeAttendance(false);
    setCheckedTypeDriver(false);
  }
  //#region

  //#region Cancel Update
  function handleCancelUpdate() {
    clearFields(true);
    setTitleUpdate("");
    setUpdateRegister(false);
    setIsReadonly(true);
  }
  //#endregion

  //#region Update Register
  function handleUpdateRegister() {
    setTitleUpdate("ALTERAR ");

    setUpdateRegister(true);
    setIsReadonly(false);
  }
  //#endregion

  return (
    <div className="main-container">
      <LateralMenu></LateralMenu>
      <>
        {loading ? (
          <Loading type="bars" color="#0f4c82" />
        ) : (
          <div className="content-container">
            <ToastContainer />

            <Header
              title={"Pessoa Física"}
              icon={<RiUserLine size={40} />}
            ></Header>
            <div className="person-container">
              <div className="tab-bar">
                <div className="group-tabs">
                  <Link to="/people/person">
                    <button type="button" className={`button tab-active`}>
                      <RiBookLine size={24} />
                      Dados
                    </button>
                  </Link>

                  <Link to={`/people/person/user/${id_people}`}>
                    <button
                      type="button"
                      className={
                        personFinded ? "button" : "button btn-tab-inactive"
                      }
                      disabled={personFinded ? false : true}
                    >
                      <RiUserSharedLine size={24} />
                      Usuário
                    </button>
                  </Link>

                  <Link to="/people/person/new">
                    <button type="button" className={`button `} id="add-person">
                      <RiAddLine size={24} />
                    </button>
                  </Link>
                </div>
              </div>

              <section className="form">
                <form onSubmit={handleRequestOs}>
                  <div className="form-title">
                    <RiCheckDoubleLine size={30} />
                    <h1>{titleUpdate}DADOS CADASTRADOS</h1>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiUserLine size={30} />
                      Pessoa
                    </h1>

                    <div className="input-label-group-row">
                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cod"
                      >
                        <label htmlFor="idPeople">Código:</label>

                        <div className="input-button-block-row">
                          <input
                            id="idPeople"
                            type="number"
                            min="1"
                            required
                            value={id_people}
                            onChange={(e) => setIdPeople(e.target.value)}
                            onBlur={() => {
                              handleSearchPerson(id_people);
                            }}
                            onKeyUp={(e) => {
                              console.log(id_people.length);
                              if (id_people.length === 0) {
                                clearFields();
                                clearFields();
                              }
                            }}
                          />

                          <button type="button" className="button btnDefault">
                            <RiSearchLine size={24} />
                          </button>
                        </div>
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="name">Nome:</label>

                        <input
                          id="name"
                          type="text"
                          readOnly={isReadonly}
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cpf-rg"
                      >
                        <label htmlFor="cpf_cnpj">CPF:</label>

                        <input
                          id="cpf_cnpj"
                          type="text"
                          minLength="8"
                          maxLength="11"
                          title="Esse campo aceita apenas números"
                          pattern="[0-9]+"
                          readOnly={isReadonly}
                          required
                          value={cpf_cnpj}
                          onChange={(e) => setCpf_cnpj(e.target.value)}
                        />
                      </div>

                      <div
                        className="input-label-block-column"
                        id="input-label-block-column-cpf-rg"
                      >
                        <label htmlFor="rg">RG:</label>

                        <input
                          id="rg"
                          type="text"
                          minLength="8"
                          maxLength="12"
                          title="Esse campo aceita apenas números."
                          pattern="[0-9]+"
                          readOnly={isReadonly}
                          required
                          value={rg}
                          onChange={(e) => setRg(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="input-label-group-row">
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
                          required
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="input-label-block-column">
                        <label htmlFor="email">E-mail:</label>

                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="client"
                          readOnly={isReadonly}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group-person">
                    <h1>
                      <RiUserStarLine size={30} />
                      Tipo de pessoa
                    </h1>

                    <div className="input-label-group-row">
                      <div className="input-label-group-row">
                        <div className="checkbox-block">
                          <input
                            type="checkbox"
                            id="cbAdmin"
                            disabled={isReadonly}
                            value="1"
                            checked={checkedTypeAdmin}
                            onClick={() => {
                              handleCheckBox("cbAdmin");
                            }}
                          />
                          <label htmlFor="cbAdmin">Administrador</label>
                        </div>

                        <div className="checkbox-block">
                          <input
                            type="checkbox"
                            id="cbAttendance"
                            disabled={isReadonly}
                            value="2"
                            checked={checkedTypeAttendance}
                            onClick={() => {
                              handleCheckBox("cbAttendance");
                            }}
                          />
                          <label htmlFor="cbAttendance">Atendente</label>
                        </div>

                        <div className="checkbox-block">
                          <input
                            type="checkbox"
                            id="cbDriver"
                            disabled={isReadonly}
                            value="3"
                            checked={checkedTypeDriver}
                            onClick={() => {
                              handleCheckBox("cbDriver");
                            }}
                          />
                          <label htmlFor="cbDriver">Motorista</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button-group">
                    {updateRegister ? (
                      <>
                        <button
                          type="button"
                          className="button btnCancel"
                          onClick={() => {
                            handleCancelUpdate();
                          }}
                        >
                          <RiCloseLine size={30} />
                          Cancelar
                        </button>
                        <button type="submit" className="button btnSuccess">
                          <RiCheckLine size={25} />
                          Salvar
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
