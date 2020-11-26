import AsyncStorage from "@react-native-community/async-storage";
import api from "./api";

export const TOKEN_KEY = "@soste-Token";
export const ID_EXECUTINGPERSON = "@soste-IdExecutingPerson";
export const NAME_EXECUTINGPERSON = "@soste-NameExecutingPerson";

export const isAuthenticated = async () => {
  try {
    const token_key = await AsyncStorage.getItem(TOKEN_KEY);

    const response = await api.get("/access/mobile/session");

    if (
      response.status === 200 &&
      response.data.message === "Token de sessão válido."
    ) {
      return true;
    }
  } catch (error) {
    // console.log("Authenticated false");
    return false;
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const getIdExecutingPerson = async () => {
  return await AsyncStorage.getItem(ID_EXECUTINGPERSON);
};

export const getNameExecutingPerson = async () => {
  return await AsyncStorage.getItem(NAME_EXECUTINGPERSON);
};

export const login = async (
  token,
  id_executingperson,
  name_executingperson
) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(ID_EXECUTINGPERSON, id_executingperson);
  await AsyncStorage.setItem(NAME_EXECUTINGPERSON, name_executingperson);
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(ID_EXECUTINGPERSON);
  await AsyncStorage.removeItem(NAME_EXECUTINGPERSON);
};
