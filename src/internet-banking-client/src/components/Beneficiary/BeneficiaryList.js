import React from "react";
import "./style.scss";
import { Col, Radio, Row, Select } from "antd";
import InputSearch from "../common/InputSearch";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import BeneficiaryItem from "./BeneficiaryItem";

const styleButton = { width: "100%", height: "100%" };

function BeneficiaryList() {
  return (
    <div className="beneficiaryList">
      <div className="beneficiaryList__searchgroup">
        <Row gutter={[8, 16]}>
          <Col span={20}>
            <InputSearch />
          </Col>
          <Col span={4}>
            <ButtonCustom
              style={styleButton}
              text="Thêm mới"
              icon={<BsPlusLg />}
            />
          </Col>
        </Row>
      </div>
      <div className="beneficiaryList__group">

          <BeneficiaryItem  nonumber={1}/>
          <BeneficiaryItem nonumber={2}/>
        <div className="footer">
          <div className="showCount">
            Hiển thị
            <Select
              defaultValue="10"
              style={{
                width: 80,
              }}
              className="select-box"
              // onChange={handleChange}
              options={[
                {
                  value: "20",
                  label: "20",
                },
                {
                  value: "50",
                  label: "50",
                },
                {
                  value: "100",
                  label: "100",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default BeneficiaryList;
