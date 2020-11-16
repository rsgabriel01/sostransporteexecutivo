import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

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
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { createIconSet } from "react-native-vector-icons";
import Toast from "react-native-toast-message";

const glyphMap = require("../assets/customIcons/remixicon.glyphmap.json");
const assetId = require("../assets/customIcons/remixicon.ttf");
const CustomIcon = createIconSet(glyphMap, "remixicon", assetId);
import { MaterialCommunityIcons } from "@expo/vector-icons";

import api from "../services/api";
import { isAuthenticated, logout, getToken } from "../services/auth";
import logo from "../assets/logo/SOSTE.png";
import { toastfySuccess, toastfyInfo, toastfyError } from "../helpers/toastify";
import { NavigationActions } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

export default function ServiceOrder() {
  // #region Definitions
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [executionSoList, setExecutionSoList] = useState([]);
  //#endregion Definitions

  // #region Verify Session
  useEffect(() => {
    async function virifyAuthorization() {
      const response = await isAuthenticated();
      if (!response) {
        navigation.navigate("Login");
      }
    }
    virifyAuthorization();
  }, []);
  // #endregion

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
              <Text style={styles.nameClient}>HONDA ENJIS</Text>
              <Text style={styles.codClient}>Código: 2</Text>
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
                <Text style={styles.textLightGray}>19</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Situação</Text>
                <Text style={styles.textLightGray}>
                  NA LISTA DE EXECUÇÃO DO MOTORISTA
                </Text>
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

              {true ? (
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
                <Text style={styles.textLightGray}>SÃO CRISTOVÃO</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Rua</Text>
                <Text style={styles.textLightGray}>AV BRASIL</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Número</Text>
                <Text style={styles.textLightGray}>700</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Complemento</Text>
                <Text style={styles.textLightGray}></Text>
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
              {!true ? (
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
                <Text style={styles.textLightGray}>CANCELLI</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Rua</Text>
                <Text style={styles.textLightGray}>RUA TEREZINA</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Número</Text>
                <Text style={styles.textLightGray}>310</Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Complemento</Text>
                <Text style={styles.textLightGray}>BLOCO 2 AP 91</Text>
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
                <Text style={styles.textLightGray}>
                  GABRIEL RODRIGUES SOUZA
                </Text>
              </View>

              <View style={styles.textsColumn}>
                <Text style={styles.textDarkGray}>Número de passageiros</Text>
                <Text style={styles.textLightGray}>1</Text>
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
                <Text style={styles.textLightGray}>
                  PASSAGEIRO DE BERMUDA MARROM E CAMISETA BRANCA
                </Text>
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
                <Text style={styles.textLightGray}>26/10/2020 15:18:46</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={() => {}} style={styles.buttonWhatsApp}>
              <CustomIcon name="whatsapp-line" size={30} color="#EFEFEF" />

              <Text style={styles.buttonText}>Contato</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.buttonWaze}>
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
  },

  orderService: {
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
