import apiInstance from "./config";

export const getAllEmployee = async () => {
  try {
    const { data } = await apiInstance.get("administration/get-employee");
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const addEmployee = async (body) => {
  try {
    body.id = 0;
    const { data } = await apiInstance.post(
      "administration/create-or-update-employee",
      body
    );
    return data;
  } catch (error) {
    throw new Error("add failed");
  }
};

export const updateEmployee = async (body) => {
    try {
      const { data } = await apiInstance.post(
        "administration/create-or-update-employee",
        body
      );
      return data;
    } catch (error) {
      throw new Error("add failed");
    }
  };
