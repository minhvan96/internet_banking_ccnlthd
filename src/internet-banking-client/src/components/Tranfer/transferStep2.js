import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import ButtonCustom from "../common/ButtonCustom";
import {
  bankInternalTransactionTranferbyId,
  bankInternalTransactionVerify,
} from "../../apis/transactionTransfer";
import { convertCurrentcy } from "../../utils/common";

const styleButton = { width: "100%", height: "44px" };
const TransferStep2 = ({
  isInternalTransfer,
  currentUser,
  bankTransactionId,
  nextStep,
}) => {
  const [transactionCurrent, setTransactionCurrent] = useState({});
  const [messageApi] = message.useMessage();
  const [otp, setOTP] = useState("0");
  useEffect(() => {
    const fetch = async () => {
      const dataAPI = await bankInternalTransactionTranferbyId(
        bankTransactionId
      );
      if (dataAPI) setTransactionCurrent(dataAPI);
    };

    fetch();
  }, []);

  const onChangeOTP = (e) => {
    setOTP(e?.target?.value);
  };
  const onSubmit = async () => {
    if (!otp) {
      messageApi.error("vui lòng nhập OTP.");
      return;
    }
    var verifyAPI = await bankInternalTransactionVerify(
      +bankTransactionId,
      +otp
    );
    if (!verifyAPI) {
      console.log("OTP correctly!");
      nextStep(3, bankTransactionId);
    }
  };
  return (
    <div className="tranferStep2">
      <div className="transfer__item" style={{ marginTop: "30px" }}>
        <div className="OTP__label">
          Quý khách vui lòng nhập OTP đã được gửi đến email của bạn
        </div>
        <div className="OTP__phonenumber">{currentUser?.email}</div>
        <div className="OTP__num">
          <Input
            className="input input-custom"
            style={{ textAlign: "center" }}
            placeholder="Nhập OTP"
            onChange={onChangeOTP}
          />
        </div>
      </div>
      <div className="transfer__item transfer__item-step2--info">
        <div className="group">
          <div className="step2__label">Tài khoản nguồn</div>
          <div className="step2__value">
            {currentUser?.bankAccount?.accountNumber}
          </div>
        </div>
      </div>

      <div className="transfer__item transfer__item-step2--info">
        <div className="group group-style">
          <div className="step2__label">Tài khoản thụ hưởng</div>
          <div className="step2__value">
            {transactionCurrent?.transferToAccount}
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Tên người thụ hưởng</div>
          <div className="step2__value step2__value-highlight">
            DINH THANH PHU
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Ngân hàng thụ hưởng</div>
          <div className="step2__value">
            Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Số tiền</div>
          <div className="step2__value step2__value-highlight">
            {convertCurrentcy(transactionCurrent?.transferAmount)}
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Phí giao dịch</div>
          <div className="step2__value">
            {transactionCurrent?.paymentType === "sender pay"
              ? "Người chuyển trả"
              : "Người nhận trả"}
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Nội dụng</div>
          <div className="step2__value">{transactionCurrent?.description}</div>
        </div>
      </div>
      <div className="transfer__bottom">
        <ButtonCustom
          style={styleButton}
          text="Hoàn Thành"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default TransferStep2;
