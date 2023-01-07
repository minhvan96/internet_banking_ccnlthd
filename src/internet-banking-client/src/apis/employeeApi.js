import apiInstance from "./config";

export const getAllCustomers = async () => {
  try {
    const { data } = await apiInstance.get("customer");
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};
