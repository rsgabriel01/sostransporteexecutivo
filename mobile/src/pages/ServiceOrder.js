import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { NavigationActions } from "react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { createIconSet } from "react-native-vector-icons";
import Toast from "react-native-toast-message";

const glyphMap = require("../assets/customIcons/remixicon.glyphmap.json");
const assetId = require("../assets/customIcons/remixicon.ttf");
const CustomIcon = createIconSet(glyphMap, "remixicon", assetId);
import { MaterialCommunityIcons } from "@expo/vector-icons";

import api from "../services/api";
import {
  isAuthenticated,
  logout,
  getToken,
  getNameExecutingPerson,
} from "../services/auth";
import {
  getDateForDatePickerWithClassDate,
  getDateForDatePickerWithDateString,
  getDateOfDatePickerValue,
} from "../helpers/dates";
import logo from "../assets/logo/SOSTE.png";
import { toastfySuccess, toastfyInfo, toastfyError } from "../helpers/toastify";

export default function ServiceOrder() {
  // #region Definitions
  const navigation = useNavigation();
  const route = useRoute();

  const { idServiceOrder } = route.params;
  const [nameDriver, setNameDriver] = useState("");

  const [loading, setLoading] = useState(false);

  const [idSituation, setIdSituation] = useState("");
  const [situation, setSituation] = useState("");

  const [idClient, setIdClient] = useState("");
  const [nameFantasyClient, setNameFantasyClient] = useState("");

  const [clientAddressOrigin, setClientAddressOrigin] = useState(true);
  const [neighborhoodOrigin, setNeighborhoodOrigin] = useState("");
  const [streetOrigin, setStreetOrigin] = useState("");
  const [streetNumberOrigin, setStreetNumberOrigin] = useState("");
  const [complementOrigin, setComplementOrigin] = useState("");

  const [clientAddressDestiny, setClientAddressDestiny] = useState(false);
  const [neighborhoodDestiny, setNeighborhoodDestiny] = useState("");
  const [streetDestiny, setStreetDestiny] = useState("");
  const [streetNumberDestiny, setStreetNumberDestiny] = useState("");
  const [complementDestiny, setComplementDestiny] = useState("");

  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [numberPassengers, setNumberPassengers] = useState("");

  const [observationService, setObservationService] = useState("");

  const [dateTimeSolicitation, setDateTimeSolicitation] = useState("");

  //#endregion Definitions

  // #region Verify Session
  useEffect(() => {
    async function virifyAuthorization() {
      const response = await isAuthenticated();
      if (!response) {
        navigation.navigate("Login");
      }
    }

    async function getNameDriver() {
      const driver = await getNameExecutingPerson();

      setNameDriver(driver);
    }

    virifyAuthorization();

    getNameDriver();

    loadServiceOrder();
  }, []);
  // #endregion

  // #region Load Service Orders
  async function loadServiceOrder() {
    setLoading(true);

    try {
      const response = await api.get(`/serviceOrder/${idServiceOrder}`);

      if (response) {
        setLoading(false);

        console.log(response.data);
        fillFields(response.data);
      }
    } catch (error) {
      setLoading(false);

      if (error.response) {
        const statusError = error.response.status;
        const dataError = error.response.data;
        const errorMessage = error.response.data.message;
        console.error(error, dataError);
        if (statusError == 400) {
          toastfyError("Atenção", errorMessage);
        } else if (statusError == 401) {
          toastfyError("Atenção", errorMessage);
        } else {
          toastfyError("Erro", "Oops, algo deu errado. " + dataError);
        }
      } else if (error.request) {
        console.log(error.request);
        toastfyError("Erro", error.request);
      } else {
        console.log("Error", error.message);
        toastfyError("Erro", error.message);
      }
    }
  }
  // #endregion Load Service Orders

  // #region Fill Fields
  function fillFields(response) {
    if (response) {
      const idSituation = response.id_status;
      idSituation ? setIdSituation(idSituation) : setIdSituation("");

      setClientAddressOrigin(response.client_origin);

      const streetOrigin = response.street_origin;
      streetOrigin ? setStreetOrigin(streetOrigin) : setStreetOrigin("");

      const streetNumberOrigin = response.street_number_origin;
      streetNumberOrigin
        ? setStreetNumberOrigin(streetNumberOrigin)
        : setStreetNumberOrigin("");

      const complementOrigin = response.complement_origin;
      console.log("origin: " + complementOrigin);
      complementOrigin
        ? setComplementOrigin(complementOrigin)
        : setComplementOrigin("");

      setClientAddressDestiny(response.client_destiny);

      const streetDestiny = response.street_destiny;
      streetDestiny ? setStreetDestiny(streetDestiny) : setStreetDestiny("");

      const streetNumberDestiny = response.street_number_destiny;
      streetNumberDestiny
        ? setStreetNumberDestiny(streetNumberDestiny)
        : setStreetNumberDestiny("");

      const complementDestiny = response.complement_destiny;
      console.log("destiny: " + complementDestiny);

      complementDestiny
        ? setComplementDestiny(complementDestiny)
        : setComplementDestiny("");

      const passengerName = response.passenger_name;
      passengerName ? setPassengerName(passengerName) : setPassengerName("");

      const passengerPhone = response.passenger_phone;
      passengerPhone
        ? setPassengerPhone(passengerPhone)
        : setPassengerPhone("");

      const numberPassengers = response.number_passengers;
      numberPassengers
        ? setNumberPassengers(numberPassengers)
        : setNumberPassengers("");

      const observationService = response.observation_service;
      observationService
        ? setObservationService(observationService)
        : setObservationService("");

      const dateTimeSolicitation = response.date_time_solicitation;
      dateTimeSolicitation
        ? setDateTimeSolicitation(
            `${getDateOfDatePickerValue(
              dateTimeSolicitation.substring(0, 10)
            )} ${dateTimeSolicitation.substring(10)}`
          )
        : setDateTimeSolicitation("");
    }

    if (response.Status) {
      const situation = response.Status.description;
      situation ? setSituation(situation) : setSituation("");
    }

    if (response.Client) {
      const nameFantasyClient = response.Client.name_fantasy;
      nameFantasyClient
        ? setNameFantasyClient(nameFantasyClient)
        : setNameFantasyClient("");
    }

    if (response.Neighborhood_origin) {
      const neighborhoodOrigin = response.Neighborhood_origin.name;
      neighborhoodOrigin
        ? setNeighborhoodOrigin(neighborhoodOrigin)
        : setNeighborhoodOrigin("");
    }

    if (response.Neighborhood_destiny) {
      const neighborhoodDestiny = response.Neighborhood_destiny.name;
      neighborhoodDestiny
        ? setNeighborhoodDestiny(neighborhoodDestiny)
        : setNeighborhoodDestiny("");
    }
  }
  // #endregion Fill Fields

  // #region Hadle Whatsapp
  function handleWhatsapp() {
    if (passengerPhone !== "") {
      Linking.openURL(
        `whatsapp://send?phone=+55${passengerPhone}&text=Olá ${passengerName}, tudo bem? Meu nome é ${nameDriver}, eu serei o motorista responsavel por tansportar o(a) senhor(a) por conta da ${nameFantasyClient}`
      );
    } else {
      toastfyError(
        "Atenção",
        "Não foi encontrado um número para contato via Whatsapp",
        10
      );
    }
  }
  // #endregion Hadle Whatsapp

  // #region Hadle Waze
  function handleWaze() {
    if (streetOrigin === "" || streetDestiny === "") {
      toastfyError(
        "Atenção",
        "Não foi encontrada endereço para consulta de rotas pelo Waze",
        10
      );
      return;
    }

    const streetOriginUrl = streetOrigin.replace(" ", "%20");
    const addressOriginUrl = `${streetNumberOrigin}%20${streetOriginUrl}`;

    const streetDestinyUrl = streetDestiny.replace(" ", "%20");
    const addressDestinyUrl = `${streetNumberDestiny}%20${streetDestinyUrl}`;

    console.log(addressOriginUrl);
    console.log(addressDestinyUrl);

    if (idSituation == 3 || idSituation == 4) {
      Linking.openURL(`https://waze.com/ul?q=${addressOriginUrl}`);
    } else if (idSituation == 5 || idSituation == 6) {
      Linking.openURL(`https://waze.com/ul?q=${addressDestinyUrl}`);
    } else {
      toastfyError(
        "Atenção",
        "Essa ordem de serviço não está em uma situação apta para consulta de rotas pelo Waze",
        10
      );
    }
  }
  // #endregion Handle Waze

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0F4C82"
          style={styles.loading}
        />
      ) : (
        <></>
      )}

      <Toast ref={(ref) => Toast.setRef(ref)} />

      <ScrollView style={styles.containerScroll}>
        <View style={styles.main}>
          <View style={styles.iconNameClient}>
            <CustomIcon name="user-2-line" size={75} color="#000" />

            <View style={styles.nameCodClient}>
              <Text style={styles.nameClient}>{nameFantasyClient}</Text>
              <Text style={styles.codClient}>Código: {idClient}</Text>
            </View>
          </View>

          {/* OS */}
          <View style={styles.orderService}>
            <View style={styles.dataTitle}>
              <CustomIcon name="file-list-line" size={35} color="#000" />
              <Text style={styles.dataTitleText}>Ordem de serviço</Text>
            </View>

            <View style={styles.codSituationServiceOrder}>
              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Código</Text>
                <Text style={styles.textLightGray}>{idServiceOrder}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Situação</Text>
                <Text style={styles.textLightGray}>{situation}</Text>
              </View>
            </View>
          </View>

          {/* ORIGIN */}
          <View style={styles.data}>
            <View style={styles.titleClientAddress}>
              <View style={styles.dataTitle}>
                <CustomIcon name="map-pin-line" size={35} color="#000" />
                <Text style={styles.dataTitleText}>Origem</Text>
              </View>

              {clientAddressOrigin ? (
                <View style={styles.dataTitle}>
                  <CustomIcon name="checkbox-line" size={20} color="#000" />
                  <Text style={styles.clientAddress}>Cliente</Text>
                </View>
              ) : (
                <View></View>
              )}
            </View>

            <View style={styles.dataColumn}>
              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Bairro</Text>
                <Text style={styles.textLightGray}>{neighborhoodOrigin}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Rua</Text>
                <Text style={styles.textLightGray}>{streetOrigin}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Número</Text>
                <Text style={styles.textLightGray}>{streetNumberOrigin}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Complemento</Text>
                <Text style={styles.textLightGray}>{complementOrigin}</Text>
              </View>
            </View>
          </View>

          {/* DESTINY */}
          <View style={styles.data}>
            <View style={styles.titleClientAddress}>
              <View style={styles.dataTitle}>
                <CustomIcon name="map-pin-line" size={35} color="#000" />
                <Text style={styles.dataTitleText}>Destino</Text>
              </View>
              {clientAddressDestiny ? (
                <View style={styles.dataTitle}>
                  <CustomIcon name="checkbox-line" size={20} color="#000" />
                  <Text style={styles.clientAddress}>Cliente</Text>
                </View>
              ) : (
                <View></View>
              )}
            </View>

            <View style={styles.dataColumn}>
              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Bairro</Text>
                <Text style={styles.textLightGray}>{neighborhoodDestiny}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Rua</Text>
                <Text style={styles.textLightGray}>{streetDestiny}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Número</Text>
                <Text style={styles.textLightGray}>{streetNumberDestiny}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Complemento</Text>
                <Text style={styles.textLightGray}>{complementDestiny}</Text>
              </View>
            </View>
          </View>

          {/* PASSENGERS */}
          <View style={styles.data}>
            <View style={styles.dataTitle}>
              <CustomIcon name="group-line" size={35} color="#000" />
              <Text style={styles.dataTitleText}>Passageiros</Text>
            </View>

            <View style={styles.dataColumn}>
              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Nome para contato</Text>
                <Text style={styles.textLightGray}>{passengerName}</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Número de passageiros</Text>
                <Text style={styles.textLightGray}>{numberPassengers}</Text>
              </View>
            </View>
          </View>

          {/* OBSERVATION */}
          <View style={styles.data}>
            <View style={styles.dataTitle}>
              <CustomIcon name="file-list-3-line" size={35} color="#000" />
              <Text style={styles.dataTitleText}>Observação</Text>
            </View>

            <View style={styles.dataColumn}>
              <View style={styles.textsColumn}>
                <Text style={styles.textLightGray}>{observationService}</Text>
              </View>
            </View>
          </View>

          {/* SOLICITATION */}
          <View style={styles.data}>
            <View style={styles.dataTitle}>
              <CustomIcon name="calendar-2-line" size={35} color="#000" />
              <Text style={styles.dataTitleText}>Solicitado</Text>
            </View>

            <View style={styles.dataColumn}>
              <View style={styles.textsColumn}>
                <Text style={styles.textLightGray}>{dateTimeSolicitation}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              onPress={() => {
                handleWhatsapp();
              }}
              style={styles.buttonWhatsApp}
            >
              <CustomIcon name="whatsapp-line" size={30} color="#EFEFEF" />

              <Text style={styles.buttonText}>Contato</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleWaze();
              }}
              style={styles.buttonWaze}
            >
              <MaterialCommunityIcons name="waze" size={33} color="#EFEFEF" />

              <Text style={styles.buttonText}>Rotas</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <CustomIcon name="arrow-right-line" size={30} color="#EFEFEF" />

            <Text style={styles.buttonText}>Próxima situação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 9999999999999,
  },

  safeContainer: {
    flex: 1,
  },

  containerScroll: {
    // flex: 1,
  },

  main: {
    // flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    margin: 15,
  },

  button: {
    flexDirection: "row",
    height: 51,
    backgroundColor: "#0f4c82",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 5,
  },

  buttonWhatsApp: {
    flex: 1,
    flexDirection: "row",
    height: 51,
    color: "#000",
    backgroundColor: "#04D361",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 5,
    marginRight: 3,
  },

  buttonWaze: {
    flex: 1,
    flexDirection: "row",
    height: 51,
    color: "#000",
    backgroundColor: "#33CCFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 5,
    marginLeft: 3,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 5,
  },

  buttonText: {
    color: "#EFEFEF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },

  iconNameClient: {
    flexDirection: "row",
    marginBottom: 20,
  },

  nameCodClient: {},

  nameClient: {
    fontSize: 26,
    fontWeight: "bold",
  },

  codClient: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#595959",
  },

  data: {
    marginBottom: 15,
  },

  dataTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 7,
  },

  dataTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 3,
  },

  textsColumn: {
    flex: 1,
    marginBottom: 5,
  },

  textDarkGray: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#717171",
  },
  textLightGray: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B0B0B0",
    textTransform: "uppercase",
  },

  orderService: {
    flex: 1,
    marginBottom: 15,
  },

  codSituationServiceOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  titleClientAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  clientAddress: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 1,
  },
});
