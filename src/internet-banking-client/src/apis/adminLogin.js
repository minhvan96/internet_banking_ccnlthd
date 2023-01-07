import apiInstance from "./config";

export const AdminLogin = async (
    username,
    password
) => {
    try {
        const body = {
            username,
            password
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
            `bank-internal-transaction/${id}`
        );
        console.log(data);
        return data;
    } catch (error) {
        throw new Error("Invalid username or password");
    }
};

export const getAllBankTranfer = async () => {
    try {
        const { data } = await apiInstance.get(
            `bank-internal-transaction`
        );
        console.log(data);
        return data;
    } catch (error) {
        throw new Error("Invalid username or password");
    }
};

export const getAllBankTranferCashIn = async () => {
    try {
        const { data } = await apiInstance.get(
            `bank-internal-transaction/transfer/received`
        );
        console.log(data);
        return data;
    } catch (error) {
        throw new Error("Invalid username or password");
    }
};
