import React, { useState } from "react";
import "./style.scss";
import { Col, Form, Input, InputNumber, Radio, Row, Select } from "antd";
import InputSearch from "../common/InputSearch";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import BeneficiaryItem from "./BeneficiaryItem";
import ModelCustom from "../common/ModalCustom";

const styleButton = { width: "100%", height: "100%" };

function BeneficiaryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
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
              onClick={showModal}
            />
            <ModelCustom
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              title="Thêm mới"
            >
              <div className="beneficiaryList__add">
                <Form layout="vertical" autoComplete="off">
                  <Form.Item name="name" label="Tên gợi nhớ">
                    <Input />
                  </Form.Item>
                  <Form.Item name="accnumber" label="Số tài khoản">
                    <Input />
                  </Form.Item>
                </Form>

                <div className="footer">
                  <div className="btn__cancel">
                    <ButtonCustom
                      isLine={true}
                      style={{ width: "100%", height: "45px" }}
                      text="Hủy"
                      icon={<BsPlusLg />}
                      onClick={showModal}
                    />
                  </div>
                  <div className="btn__submit">
                    <ButtonCustom
                      style={{ width: "100%", height: "45px" }}
                      text="Thêm mới"
                      icon={<BsPlusLg />}
                      onClick={showModal}
                    />
                  </div>
                </div>
              </div>
            </ModelCustom>
          </Col>
        </Row>
      </div>
      <div className="beneficiaryList__group">
        <BeneficiaryItem nonumber={1} />
        <BeneficiaryItem nonumber={2} />
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
