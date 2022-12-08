import { TOKEN_KEY } from "./auth";
import apiInstance from "./config";

const signIn = async (email, password) => {
  try {
    const { data } = await apiInstance.post("auth/login", { email, password });
    return data;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};

const signUp = async (userName, password, firstName, lastName) => {
  const { data } = await apiInstance.post("auth/register", {
    userName,
    password,
    firstName,
    lastName,
  });
  return data;
};

const getCurrentUser = async (token = localStorage.getItem(TOKEN_KEY)) => {
  try {
    const { data } = await apiInstance.get("auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const userApi = {
    signIn,
    signUp,
    getCurrentUser,
  };
  
  export default userApi;