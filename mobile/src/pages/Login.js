import React from "react";
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
} from "react-native";

import { createIconSet } from "react-native-vector-icons";
const glyphMap = require("../assets/customIcons/remixicon.glyphmap.json");
const assetId = require("../assets/customIcons/remixicon.ttf");
const CustomIcon = createIconSet(glyphMap, "remixicon", assetId);

import logo from "../assets/logo/SOSTE.png";

export default function Login() {
  return (
    <KeyboardAvoidingView
      anabled={Platform.OS === "ios"}
      behavior="padding"
      style={styles.container}
    >
      <Image source={logo} />

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <CustomIcon name="admin-line" size={30} color="#000" />
          <TextInput
            style={styles.inputUser}
            placeholder="Usuário"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>
        </View>

        <View style={styles.inputGroupPassword}>
          <CustomIcon name="admin-fill" size={30} color="#000" />

          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          ></TextInput>

          <CustomIcon name="admin-line" size={30} color="#000" />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    borderRadius: 5,
    // borderWidth: 1,
    fontSize: 16,
    color: "#3f3d56",
    height: "100%",
    width: 270,
    marginRight: 200,
  },

  inputPassword: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 5,
    // borderWidth: 1,

    fontSize: 16,
    color: "#3f3d56",
    height: "100%",
    width: 230,
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
