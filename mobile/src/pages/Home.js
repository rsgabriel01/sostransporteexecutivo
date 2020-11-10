import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  SafeAreaView,
  View,
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
} from "react-native";

import { createIconSet } from "react-native-vector-icons";
import Toast from "react-native-toast-message";

const glyphMap = require("../assets/customIcons/remixicon.glyphmap.json");
const assetId = require("../assets/customIcons/remixicon.ttf");
const CustomIcon = createIconSet(glyphMap, "remixicon", assetId);

import api from "../services/api";
import { isAuthenticated } from "../services/auth";
import logo from "../assets/logo/SOSTE.png";
import { toastfySuccess, toastfyInfo, toastfyError } from "../helpers/toastify";

export default function Home({ navigation }) {
  //#region Definitions
  const [loading, setLoading] = useState(false);
  //#endregion Definitions

  //#region Verify Session
  useEffect(() => {
    async function virifyAuthorization() {
      const response = await isAuthenticated();
      if (response) {
        console.log("response: " + response);
        navigation.navigate("Home");
      }
    }
    virifyAuthorization();
  }, []);
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <StatusBar style="dark" />
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
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 40,
  },
});
