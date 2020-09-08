import api from "./api";

export const TOKEN_KEY = "@soste-Token";
export const ID_EXECUTINGPERSON = "@soste-IdExecutingPerson";
export const NAME_EXECUTINGPERSON = "@soste-NameExecutingPerson";

export const isAuthenticated = async () => {
  try {
    const response = await api.get("/acess/session", {
      headers: {
        token: localStorage.getItem(TOKEN_KEY),
      },
    });

    if (
      response.status === 200 &&
      response.data.message === "Token de sessão válido."
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getIdExecutingPerson = () =>
  localStorage.getItem(ID_EXECUTINGPERSON);

export const getNameExecutingPerson = () =>
  localStorage.getItem(NAME_EXECUTINGPERSON);

export const login = (token, id_executingperson, name_executingperson) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ID_EXECUTINGPERSON, id_executingperson);
  localStorage.setItem(NAME_EXECUTINGPERSON, name_executingperson);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ID_EXECUTINGPERSON);
  localStorage.removeItem(NAME_EXECUTINGPERSON);
};
