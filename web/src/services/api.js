import axios from "axios";

import { getToken, getIdExecutingPerson } from "./auth";

// const { REACT_APP_API_URL } = process.env

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:3333/api'}`,
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
