import apiInstance from "./config";

export const addInternalBeneficiary = async (bankExternalAccountId, alias) => {
  try {
    console.log(bankExternalAccountId, alias);
    const { data } = await apiInstance.post(
      "Customer/add-internal-beneficiary",
      { bankAccountNumber: bankExternalAccountId, alias }
    );
    console.log(data);
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
