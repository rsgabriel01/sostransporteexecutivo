import React, { useState, useEffect, useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
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

export default function Login() {
  //#region Definitions
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const userInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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

  // #region use Focus Effect
  useFocusEffect(
    useCallback(() => {
      setFocus("user");

      return () => {
        clearFields();
      };
    }, [])
  );
  // #endregion use Effect

  const clearFields = () => {
    setUser("");
    setPassword("");
    setPasswordInvisible("");
    setPasswordInvisible(true);
  };

  const setFocus = (input) => {
    switch (input) {
      case "user":
        setTimeout(() => {
          userInputRef.current.focus();
        }, 1);
        break;

      case "password":
        setTimeout(() => {
          passwordInputRef.current.focus();
        }, 1);
        break;
    }
  };

  const validateFields = () => {
    if (user === "") {
      toastfyError("Atenção", "O usuário deve ser preenchido");
      setFocus("user");
      return false;
    }
    if (password === "") {
      toastfyError("Atenção", "A senha deve ser preenchida.");
      setFocus("password");
      return false;
    }
    if (password.length < 8) {
      toastfyError("Atenção", "A senha deve conter no mínimo 8 caracteres.");
      setFocus("password");
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

        const response = await api.post("/access/mobile/login", data);

        if (response) {
          setLoading(false);

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
        toastfyError("Erro", error.request);
      } else {
        console.log("Error", error.message);
        toastfyError("Erro", error.message);
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

      <SafeAreaView style={styles.form}>
        <View style={styles.inputGroup}>
          <CustomIcon name="user-line" size={30} color="#3f3d56" />
          <TextInput
            ref={userInputRef}
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
            ref={passwordInputRef}
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
      </SafeAreaView>

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
