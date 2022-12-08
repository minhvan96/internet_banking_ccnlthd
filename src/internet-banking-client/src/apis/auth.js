import apiInstance from "./config";
export const TOKEN_KEY = "token";

export const setAuthHeader = (token = localStorage.getItem(TOKEN_KEY)) => {
  if (token)
    apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};