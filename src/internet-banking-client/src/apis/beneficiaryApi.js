import apiInstance from "./config";

export const addInternalBeneficiary = async (bankExternalAccountId, alias) => {
  try {
    const { data } = await apiInstance.post(
      "Customer/add-internal-beneficiary",
      { bankAccountNumber: bankExternalAccountId, alias }
    );
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const addExternalBeneficiary = async (bankExternalAccountId, alias) => {
  try {
    const { data } = await apiInstance.post(
      "Customer/add-external-beneficiary",
      { bankExternalAccountId, alias }
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const getInternalBeneficiary = async () => {
  try {
    const { data } = await apiInstance.get(
      "Customer/current/internal-beneficiary"
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const getExternalBeneficiary = async () => {
  try {
    const { data } = await apiInstance.get(
      "Customer/current/external-beneficiary"
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const deleteBeneficiary = async (bankAccountNumber, alias) => {
  try {
    const { data } = await apiInstance.delete(
      "customer/delete-external-beneficiary",
      { bankAccountNumber, alias }
    );
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Delete failed.");
  }
};

export const updateBeneficiary = async (bankAccountNumber, alias) => {
  try {
    const { data } = await apiInstance.put(
      "customer/update-external-beneficiary",
      { bankAccountNumber, alias }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Delete failed.");
  }
};
