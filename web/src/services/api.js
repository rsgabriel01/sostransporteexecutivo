import axios from "axios";

import { getToken, getIdExecutingPerson } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  const executingperson = getIdExecutingPerson();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  if (executingperson) {
    config.headers.id_executingperson = `${executingperson}`;
  }
  return config;
});

export default api;
