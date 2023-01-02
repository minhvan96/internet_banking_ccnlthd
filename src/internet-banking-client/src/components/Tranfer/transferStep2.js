import {  Input } from "antd";
import React, { useState } from "react";
import "./style.scss";
import ButtonCustom from "../common/ButtonCustom";

const styleButton = { width: "100%", height: "44px" };
const TransferStep2 = () => {
  return (
    <div className="tranferStep2">
      <div className="transfer__item" style={{ marginTop: "30px" }}>
        <div className="OTP__label">
          Quý khách vui lòng nhập OTP đã được gửi đến số điện thoại
        </div>
        <div className="OTP__phonenumber">0947094472</div>
        <div className="OTP__num">
          <Input
            className="input input-custom"
            style={{ textAlign: "center" }}
            placeholder="Nhập OTP"
          />
        </div>
      </div>
      <div className="transfer__item transfer__item-step2--info">
        <div className="group">
          <div className="step2__label">Tài khoản nguồn</div>
          <div className="step2__value">1017332621</div>
        </div>
      </div>

      <div className="transfer__item transfer__item-step2--info">
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
          <div className="step2__label">Số tiền</div>
          <div className="step2__value step2__value-highlight">10,000 VND</div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Phí giao dịch</div>
          <div className="step2__value">Người chuyển trả</div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Nội dụng</div>
          <div className="step2__value">NGUYEN HIEU NGHIA chuyen tien </div>
        </div>
      </div>
      <div className="transfer__bottom">
        <ButtonCustom style={styleButton} text="Hoàn Thành" />
      </div>
    </div>
  );
};

export default TransferStep2;
