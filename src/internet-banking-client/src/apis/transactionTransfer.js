import apiInstance from "./config";

export const bankInternalTransactionTranfer = async (
  transactionPaymentType,
  toAccount,
  transferAmount,
  description
) => {
  try {
    const body = {
      transactionPaymentType,
      toAccount,
      transferAmount: +transferAmount,
      description,
    };
    const { data } = await apiInstance.post(
      "bank-internal-transaction/transfer",
      body
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const bankInternalTransactionVerify = async (
  transferId,
  verificationCode
) => {
  try {
    const body = {
      transferId,
      verificationCode,
    };
    console.log(body);
    const { data } = await apiInstance.post(
      "bank-internal-transaction/verify",
      body
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const bankInternalTransactionTranferbyId = async (id) => {
  try {
    const { data } = await apiInstance.get(
      `bank-internal-transaction?id=${id}`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};
