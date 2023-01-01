import { Radio } from "antd";
import React from "react";
import "./style.scss";
import { FiMoreVertical } from "react-icons/fi";

function BeneficiaryItem({ nonumber }) {
  return (
    <div className="beneficiaryList__item">
      <div className="no-box">{nonumber}</div>
      <div className="content">
        <h4> NGUYEN HIEU NGHIA </h4>
        <div className="cardnumber">14410000232388</div>
        <div className="note">
          Dịch vụ: Chuyển tiền nhanh NAPAS247 qua tài khoản
        </div>
      </div>
      <div className="showmore">
        <FiMoreVertical />
      </div>
    </div>
  );
}
export default BeneficiaryItem;
