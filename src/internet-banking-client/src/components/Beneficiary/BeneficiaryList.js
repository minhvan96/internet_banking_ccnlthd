import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Form, Input, message, Row, Select } from "antd";
import InputSearch from "../common/InputSearch";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import BeneficiaryItem from "./BeneficiaryItem";
import ModelCustom from "../common/ModalCustom";
import {
  addInternalBeneficiary,
  getExternalBeneficiary,
  getInternalBeneficiary,
} from "../../apis/beneficiaryApi";

const styleButton = { width: "100%", height: "100%" };

function BeneficiaryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi] = message.useMessage();
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  const [form] = Form.useForm();

  const fetch = async () => {
    const internalbeneficiary = await getInternalBeneficiary();
    // const externalbeneficiary = await getExternalBeneficiary();
    let beneficiaryMap;
    beneficiaryMap = internalbeneficiary.map((x) => {
      return {
        id: x?.id,
        accountNumber: x?.accountNumber,
        alias: x?.alias,
        type: "Nội bộ",
      };
    });
    // beneficiaryMap = [
    //   ...beneficiaryMap,
    //   ...externalbeneficiary.map((x) => {
    //     return {
    //       id: x?.id,
    //       accountNumber: x?.accountNumber,
    //       alias: x?.alias,
    //     };
    //   }),
    // ];
    setBeneficiaryList(beneficiaryMap);
  };

  useEffect(() => {
    fetch();
  }, []);

  const successMessage = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const addBeneficiary = () => {
    const formSubmit = form.getFieldsValue();
    let result;
    if (formSubmit.bankType === "internal")
      result = addInternalBeneficiary(formSubmit.accnumber, formSubmit.name);
    // console.log(result);
    form.setFieldValue({});
    successMessage("Thêm người hưởng thụ thành công!");
    hideModal();
  };

  const changeBankType = (value) => {
    form.setFieldValue({
      bankType: value,
    });
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
                <Form
                  form={form}
                  layout="vertical"
                  autoComplete="off"
                  fields={[
                    {
                      name: ["bankType"],
                      value: "Nội bộ",
                    },
                  ]}
                >
                  <Form.Item name="name" label="Tên gợi nhớ">
                    <Input />
                  </Form.Item>
                  <Form.Item name="accnumber" label="Số tài khoản">
                    <Input />
                  </Form.Item>
                  <Form.Item name="bankType" label="Loại ngân hàng">
                    <Select
                      style={{
                        width: "200px",
                      }}
                      className="select-box"
                      onChange={changeBankType}
                      options={[
                        {
                          value: "internal",
                          label: "Nội bộ",
                        },
                        {
                          value: "external",
                          label: "Liên ngân hàng",
                        },
                      ]}
                    />
                  </Form.Item>
                </Form>

                <div className="footer">
                  <div className="btn__cancel">
                    <ButtonCustom
                      isLine={true}
                      style={{ width: "100%", height: "45px" }}
                      text="Hủy"
                      icon={<BsPlusLg />}
                      onClick={hideModal}
                    />
                  </div>
                  <div className="btn__submit">
                    <ButtonCustom
                      style={{ width: "100%", height: "45px" }}
                      text="Thêm mới"
                      icon={<BsPlusLg />}
                      onClick={addBeneficiary}
                    />
                  </div>
                </div>
              </div>
            </ModelCustom>
          </Col>
        </Row>
      </div>
      <div className="beneficiaryList__group">
        {beneficiaryList &&
          beneficiaryList.length &&
          beneficiaryList.map((item, index) => (
            <BeneficiaryItem
              nonumber={index + 1}
              key={item.id}
              beneficiary={item}
              setBeneficiaryList={setBeneficiaryList}
            />
          ))}
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
