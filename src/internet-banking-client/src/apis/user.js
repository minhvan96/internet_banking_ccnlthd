import { TOKEN_KEY } from "./auth";
import apiInstance from "./config";

const signIn = async (email, password) => {
  try {
    const { data } = await apiInstance.post("user/login", { email, password });
    return data;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};

const signUp = async (email, username, password) => {
  const { data } = await apiInstance.post("user/register", {
    email,
    username,
    password,
  });
  return data;
};

const userApi = {
    signIn,
    signUp,
  };
  
  export default userApi;