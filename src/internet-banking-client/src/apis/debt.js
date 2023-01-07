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

export const postPaymentDebt = async (transactionId) => {
  try {
    const { data } = await apiInstance.get(
      `debt-management/debt-payment-request/${transactionId}`
    );

    return data;
  } catch (error) {
    throw new Error("Error getting");
  }
};

export const accessPaymentDebt = async (transactionId, code) => {
  try {
    const { data } = await apiInstance.post(
      'debt-management/debt-payment', {transactionId, code}
    );

    return data;
  } catch (error) {
    throw new Error("Error payment");
  }
};