import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const TOKEN_KEY = "@soste-Token";
export const ID_EXECUTINGPERSON = "@soste-IdExecutingPerson";

const api = axios.create({
  baseURL: "http://100.116.39.101:3333/api",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  const executingperson = await AsyncStorage.getItem(ID_EXECUTINGPERSON);
  console.log(token);
  console.log(executingperson);

  if (token) {
    config.headers.authorization = `${token}`;
  }
  if (executingperson) {
    config.headers.id_executingperson = `${executingperson}`;
  }
  return config;
});

export default api;
