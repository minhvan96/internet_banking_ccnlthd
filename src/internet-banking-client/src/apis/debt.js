import apiInstance from "./config";

export const addDebt = async (loanAccount, amount, description) => {
  try {
    const { data } = await apiInstance.post(
      "debt-management/debit-transfer",
      {loanAccount, amount, description}
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error creating");
  }
};

export const getDebt = async (isCreator, isUnpaid) => {
    try {
      const data = await apiInstance.post(
        "debt-management/filter-debt-transaction", {isCreator, isUnpaid}
      );

      return data;
    } catch (error) {
      throw new Error("Error getting");
    }
};