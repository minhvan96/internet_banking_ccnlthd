import React, { useState } from "react";
import "./style.scss";
import ButtonCustom from "../common/ButtonCustom";
import { AiFillCheckCircle } from "react-icons/ai";

const styleButton = { width: "100%", height: "44px" };
const TransferStep3 = () => {
  return (
    <div className="tranferStep3">
      <div className="transfer__item transfer__item-step2--info" style={{marginTop: "30px"}}>
        <div className="transfer-success">
          <div className="icon">
            <AiFillCheckCircle />
          </div>
          <div className="message">GIAO DỊCH THÀNH CÔNG</div>
          <div className="money">10,000 VND</div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Tài khoản thụ hưởng</div>
          <div className="step2__value">1017332621</div>
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
          <div className="step2__label">Mã giao dịch</div>
          <div className="step2__value">54512348521</div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Nội dụng</div>
          <div className="step2__value">NGUYEN HIEU NGHIA chuyen tien </div>
        </div>
      </div>
      <div className="transfer__bottom transfer__bottom-flex">
        <div className="btn-save">
          <ButtonCustom style={styleButton} isLine={true} text="Lưu danh bạ thụ hưởng" />
        </div>
        <div className="btn-redirect">
          <ButtonCustom style={styleButton} text="Thực hiện giao dịch mới" />
        </div>
      </div>
    </div>
  );
};

export default TransferStep3;
