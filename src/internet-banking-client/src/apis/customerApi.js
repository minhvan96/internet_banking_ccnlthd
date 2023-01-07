import apiInstance from "./config";

export const registerCustomer = async (body) => {
  try {
    body.id = 0;
    const { data } = await apiInstance.post(
      "auth/register",
      body
    );
    return data;
  } catch (error) {
    throw new Error("add failed");
  }
};