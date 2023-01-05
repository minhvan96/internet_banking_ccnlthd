import BeneficiaryItem from "./BeneficiaryItem";
import ModelCustom from "../common/ModalCustom";
import {
  addInternalBeneficiary,
  getExternalBeneficiary,
  getInternalBeneficiary,
} from "../../apis/beneficiaryApi";
import { Col, Form, Radio, Row } from "antd";
import ButtonCustom from "../common/ButtonCustom";
import React, { useState, useEffect } from "react";
import "./style.scss";

const styleButton = { width: "100%", height: "100%" };

function BeneficiaryBankingList({ setAccountNumber }) {
  const onChoose = (data) => {
    setAccountNumber(data.target.value);
  };
  return (
    <div className="beneficiaryBanking__List">
      <Radio.Group
        name="chooseAccountNumber"
        style={{ width: "100%" }}
        onChange={onChoose}
      >
        <div className="beneficiaryBanking__item">
          <Row gutter={[8, 16]}>
            <Col span={20}>
              <div className="alias">Thành</div>
              <div className="accountnumber">0331000496045</div>
            </Col>
            <Col span={4}>
              <Radio style={{ color: "#fff" }} value="1"></Radio>
            </Col>
          </Row>
        </div>
        <div className="beneficiaryBanking__item">
          <Row gutter={[8, 16]}>
            <Col span={20}>
              <div className="alias">Thành</div>
              <div className="accountnumber">0331000496045</div>
            </Col>
            <Col span={4}>
              <Radio style={{ color: "#fff" }} value="0331000496045"></Radio>
            </Col>
          </Row>
        </div>
      </Radio.Group>
    </div>
  );
}

export default BeneficiaryBankingList;
