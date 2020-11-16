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

import api from "../services/api";
import { isAuthenticated, logout, getToken } from "../services/auth";
import logo from "../assets/logo/SOSTE.png";
import { toastfySuccess, toastfyInfo, toastfyError } from "../helpers/toastify";
import { NavigationActions } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  // #region Definitions
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [executionSoList, setExecutionSoList] = useState([
    {
      id: 19,
      client: "ENJIS",
      os: 19,
      originClient: true,
      neghborhoodClient: "SÃO CRISTOVÃO",
      destinyClient: false,
      neghborhoodDestiny: "SITIO DE RECREIO PARAÍSO",
      solicitation: "16/11/2020 08:26:00",
    },
    {
      id: 20,
      client: "ENJIS",
      os: 20,
      originClient: true,
      neghborhoodClient: "SITIO DE RECREIO PARAÍSO",
      destinyClient: false,
      neghborhoodDestiny: "SÃO CRISTOVÃO",
      solicitation: "16/11/2020 08:26:00",
    },
    {
      id: 21,
      client: "ENJIS",
      os: 21,
      originClient: true,
      neghborhoodClient: "SITIO DE RECREIO PARAÍSO",
      destinyClient: false,
      neghborhoodDestiny: "SÃO CRISTOVÃO",
      solicitation: "16/11/2020 08:26:00",
    },
    {
      id: 22,
      client: "ENJIS",
      os: 22,
      originClient: true,
      neghborhoodClient: "SITIO DE RECREIO PARAÍSO",
      destinyClient: false,
      neghborhoodDestiny: "SÃO CRISTOVÃO",
      solicitation: "16/11/2020 08:26:00",
    },
    {
      id: 23,
      client: "ENJIS",
      os: 21,
      originClient: true,
      neghborhoodClient: "SITIO DE RECREIO PARAÍSO",
      destinyClient: false,
      neghborhoodDestiny: "SÃO CRISTOVÃO",
      solicitation: "16/11/2020 08:26:00",
    },
  ]);

  const [waitingSoList, setWaitingSoList] = useState([
    {
      id: 22,
      client: "ZACARIS",
      os: 22,
      originClient: false,
      destinyClient: true,
      solicitation: "16/11/2020 14:26:00",
    },
    {
      id: 23,
      client: "ZACARIS",
      os: 23,
      originClient: false,
      destinyClient: true,
      solicitation: "16/11/2020 14:36:00",
    },
    {
      id: 24,
      client: "ZACARIS",
      os: 24,
      originClient: false,
      destinyClient: true,
      solicitation: "16/11/2020 14:46:00",
    },
    {
      id: 25,
      client: "DIVES",
      os: 25,
      originClient: true,
      destinyClient: false,
      solicitation: "16/11/2020 14:56:00",
    },
    {
      id: 26,
      client: "DIVES",
      os: 26,
      originClient: true,
      destinyClient: false,
      solicitation: "16/11/2020 15:06:00",
    },
    {
      id: 27,
      client: "DIVES",
      os: 27,
      originClient: true,
      destinyClient: false,
      solicitation: "16/11/2020 15:16:00",
    },
  ]);
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

  // #region Logout
  async function handleLogout() {
    try {
      setLoading(true);

      const response = await api.delete("/access/mobile/logout");
      if (response) {
        setLoading(false);
        await logout();
        navigation.navigate("Login");
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
  // #endregion Logout

  return (
    <SafeAreaView style={stylesGlobal.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0F4C82"
          style={stylesGlobal.loading}
        />
      ) : (
        <></>
      )}

      <Toast ref={(ref) => Toast.setRef(ref)} />

      <View style={stylesGlobal.header}>
        <BorderlessButton onPress={handleLogout}>
          <CustomIcon name="logout-box-line" size={30} color="#0F4C82" />
        </BorderlessButton>

        <Image source={logo} style={stylesGlobal.logo} />

        <View style={stylesGlobal.viewWhite} />
      </View>

      <View style={stylesGlobal.execution}>
        <Text style={stylesExecution.listTitle}>Em execução</Text>

        <FlatList
          style={stylesExecution.list}
          data={executionSoList}
          keyExtractor={(executionSo) => executionSo.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={stylesExecution.listItem}
              onPress={() => navigation.navigate("ServiceOrder")}
            >
              <View style={stylesExecution.iconTextTitleGroupList}>
                <CustomIcon name="taxi-wifi-line" size={30} color="#EFEFEF" />

                <Text style={stylesExecution.textTitleList}>{item.client}</Text>
              </View>
              <View style={stylesExecution.iconTextGroupList}>
                <CustomIcon name="file-list-2-line" size={30} color="#EFEFEF" />

                <Text style={stylesExecution.textList}>{item.os}</Text>
              </View>
              <View style={stylesExecution.iconTextGroupList}>
                <CustomIcon name="map-pin-line" size={30} color="#EFEFEF" />

                <Text style={stylesExecution.textList}>
                  {item.originClient ? "CLIENTE" : "PASSAGEIRO"}
                </Text>
              </View>
              <View style={stylesExecution.iconTextGroupList}>
                <CustomIcon name="map-pin-line" size={30} color="#EFEFEF" />

                <Text style={stylesExecution.textList}>
                  {item.destinyClient ? "CLIENTE" : "PASSAGEIRO"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={stylesGlobal.waiting}>
        <Text style={stylesWaiting.listTitle}>Aguardando execução</Text>

        <FlatList
          style={stylesWaiting.list}
          data={waitingSoList}
          keyExtractor={(waitingSo) => waitingSo.id.toString()}
          horizontal={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={stylesWaiting.listItem}
              onPress={() => navigation.navigate("ServiceOrder")}
            >
              <View style={stylesWaiting.iconTextTitleGroup}>
                <CustomIcon name="taxi-wifi-line" size={30} color="#858585" />

                <Text style={stylesWaiting.textTitle}>{item.client}</Text>
              </View>

              <View style={stylesWaiting.dataClient}>
                <View style={stylesWaiting.iconTextGroup}>
                  <CustomIcon
                    name="file-list-2-line"
                    size={30}
                    color="#858585"
                  />

                  <Text style={stylesWaiting.textList}>{item.os}</Text>
                </View>
                <View style={stylesWaiting.iconTextGroup}>
                  <CustomIcon name="map-pin-line" size={30} color="#858585" />

                  <Text style={stylesWaiting.textList}>
                    {item.originClient ? "CLIENTE" : "PASSAGEIRO"}
                  </Text>
                </View>
                <View style={stylesWaiting.iconTextGroup}>
                  <CustomIcon name="map-pin-line" size={30} color="#858585" />

                  <Text style={stylesWaiting.textList}>
                    {item.destinyClient ? "CLIENTE" : "PASSAGEIRO"}
                  </Text>
                </View>
              </View>

              <Text style={stylesWaiting.solicitation}>
                {`Solicitado: ${item.solicitation}`}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const stylesGlobal = StyleSheet.create({
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 10,
    marginTop: 10,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
  },

  viewWhite: {
    height: 30,
    width: 30,
  },

  container: {
    flex: 1,
  },

  execution: {
    alignSelf: "stretch",
    marginTop: 30,
  },

  waiting: {
    flex: 1,
    alignSelf: "stretch",
    marginTop: 30,
  },
});

const stylesExecution = StyleSheet.create({
  list: {
    paddingLeft: 10,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    alignSelf: "center",
  },

  listItem: {
    alignItems: "flex-start",
    backgroundColor: "#0F4C82",
    borderRadius: 5,
    marginRight: 10,
    height: 210,
    width: 150,
    padding: 10,
  },

  iconTextTitleGroupList: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  textTitleList: {
    flexWrap: "wrap",
    color: "#ffffff",
    fontWeight: "bold",
    paddingLeft: 5,
    textTransform: "uppercase",
  },

  iconTextGroupList: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  textList: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    textAlignVertical: "center",
    color: "#ffffff",
    fontWeight: "bold",
    paddingLeft: 1,
    textTransform: "capitalize",
  },
});

const stylesWaiting = StyleSheet.create({
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    alignSelf: "center",
  },

  list: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  listItem: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderWidth: 2,
    borderColor: "#858585",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },

  iconTextTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  textTitle: {
    flexWrap: "wrap",
    color: "#858585",
    fontWeight: "bold",
    paddingLeft: 5,
    textTransform: "uppercase",
  },

  dataClient: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },

  iconTextGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },

  textList: {
    alignItems: "center",
    textAlignVertical: "center",
    color: "#858585",
    fontWeight: "bold",
    paddingLeft: 1,
    textTransform: "capitalize",
  },

  solicitation: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 10,
    color: "#858585",
  },
});
