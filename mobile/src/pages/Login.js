import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
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
import { login, isAuthenticated } from "../services/auth";
import logo from "../assets/logo/SOSTE.png";
import { toastfySuccess, toastfyInfo, toastfyError } from "../helpers/toastify";

export default function Login({ navigation }) {
  //#region Definitions
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const [loading, setLoading] = useState(false);
  //#endregion Definitions

  //#region Verify Session
  useEffect(() => {
    async function virifyAuthorization() {
      const response = await isAuthenticated();
      if (response) {
        navigation.navigate("Home");
      }
    }
    virifyAuthorization();
  }, []);
  //#endregion

  const alertMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const validateFields = () => {
    if (user === "") {
      toastfyError("Atenção", "O usuário deve ser preenchido.");
      return false;
    }
    if (password === "") {
      toastfyError("Atenção", "A senha deve ser preenchida.");
      return false;
    }
    if (password.length < 8) {
      toastfyError("Atenção", "A senha deve conter no mínimo 8 caracteres.");
      return false;
    }

    return true;
  };

  async function handleSubmit() {
    console.log(user, password);

    const data = {
      user,
      password,
    };

    try {
      if (validateFields() === true) {
        setLoading(true);

        const response = await api.post("/acess/mobile/login", data);

        if (response) {
          // toastfySuccess("Sucesso", "sadasdas");

          await login(
            response.data.session.token,
            response.data.id_person,
            response.data.personName
          );

          navigation.navigate("Home");
        }
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
      } else {
        console.log("Error", error.message);
      }
    }
  }

  const handleVisiblePassword = () => {
    if (passwordInvisible) {
      setPasswordInvisible(false);
    } else if (!passwordInvisible) {
      setPasswordInvisible(true);
    }
  };
  return (
    <KeyboardAvoidingView
      anabled={Platform.OS === "ios"}
      behavior="padding"
      style={styles.container}
    >
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

      <Image source={logo} />

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <CustomIcon name="user-line" size={30} color="#3f3d56" />
          <TextInput
            style={styles.inputUser}
            placeholder="Usuário"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            autoFocus={true}
            value={user}
            onChangeText={setUser}
          ></TextInput>
        </View>

        <View style={styles.inputGroupPassword}>
          <CustomIcon name="lock-2-line" size={30} color="#3f3d56" />

          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            secureTextEntry={passwordInvisible}
            value={password}
            onChangeText={setPassword}
          ></TextInput>

          {passwordInvisible ? (
            <CustomIcon
              name="eye-line"
              size={30}
              color="#3f3d56"
              onPress={handleVisiblePassword}
            />
          ) : (
            <CustomIcon
              name="eye-off-line"
              size={30}
              color="#3f3d56"
              onPress={handleVisiblePassword}
            />
          )}
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </KeyboardAvoidingView>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 40,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcdce6",
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    borderRadius: 5,
  },

  inputGroupPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcdce6",
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    borderRadius: 5,
  },

  inputUser: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#3f3d56",
    height: "100%",
  },

  inputPassword: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#3f3d56",
    height: "100%",
  },

  button: {
    height: 51,
    backgroundColor: "#0f4c82",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 5,
  },

  buttonText: {
    color: "#EFEFEF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
