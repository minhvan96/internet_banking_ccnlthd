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

function BeneficiaryBankingList({ setAccountNumber, beneficiaryList }) {
  const onChoose = (data) => {
    setAccountNumber(data.target.value);
  };
  console.log(beneficiaryList);

  return (
    <div className="beneficiaryBanking__List">
      <Radio.Group
        name="chooseAccountNumber"
        style={{ width: "100%" }}
        onChange={onChoose}
      >
        {beneficiaryList &&
          beneficiaryList.length &&
          beneficiaryList.map((item, ind) => (
            <div className="beneficiaryBanking__item" key={ind}>
              <Row gutter={[8, 16]}>
                <Col span={20}>
                  <div className="alias">{item.alias}</div>
                  <div className="accountnumber">{item.accountNumber}</div>
                </Col>
                <Col span={4}>
                  <Radio
                    style={{ color: "#fff" }}
                    value={item.accountNumber}
                  ></Radio>
                </Col>
              </Row>
            </div>
          ))}
      </Radio.Group>
      {(!beneficiaryList || beneficiaryList.length === 0) && (
        <div className="item__empty" style={{textAlign: 'center', margin: '20px 0'}}>Danh bạ rỗng</div>
      )}
    </div>
  );
}

export default BeneficiaryBankingList;
