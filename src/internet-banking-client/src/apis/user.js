import { TOKEN_KEY } from "./auth";
import apiInstance from "./config";

const signIn = async (username, password) => {
  try {
    const { data } = await apiInstance.post("auth/login", { username, password });
    console.log("🚀 ~ file: user.js:7 ~ signIn ~ data", data)
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
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
    const { data } = await apiInstance.get("user/current");
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