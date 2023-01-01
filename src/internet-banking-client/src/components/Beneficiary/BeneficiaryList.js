import React from "react";
import "./style.scss";
import { Col, Row } from "antd";
import InputSearch from "../common/InputSearch";

function BeneficiaryList() {
  return (
    <div className="beneficiaryList">
      <div className="beneficiaryList__searchgroup">
        <Row gutter={[8, 16]}>
          <Col span={20}>
            <InputSearch />
          </Col>
          <Col span={4}>right</Col>
        </Row>
      </div>
      <div className="beneficiaryList__group"></div>
    </div>
  );
}
export default BeneficiaryList;
