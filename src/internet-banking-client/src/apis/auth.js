import apiInstance from "./config";
export const TOKEN_KEY = "idToken";

export const setAuthHeader = (token = localStorage.getItem(TOKEN_KEY)) => {
  if (token)
    apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export const closeAccount = async () => {
  try {
    const data = await apiInstance.post("auth/disable-account");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Disable failed.");
  }
};
