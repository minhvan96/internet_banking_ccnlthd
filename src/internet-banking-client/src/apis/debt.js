import apiInstance from "./config";

export const addDebt = async (accountNumber, amount, description) => {
  try {
    const { data } = await apiInstance.post(
      "debt-management/debit-transfer",
      {accountNumber, amount, description}
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error creating");
  }
};

export const getDebt = async () => {
    try {
      const { data } = await apiInstance.get(
        "debt-management/get-debtor"
      );
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("Error creating");
    }
};