import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Form, Input, message, Row, Select } from "antd";
import InputSearch from "../common/InputSearch";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import DebtReminderItem from "./DebtReminderItem";
import ModelCustom from "../common/ModalCustom";
import {
  addDebt,
  getDebt,
} from "../../apis/debt";

const styleButton = { width: "100%", height: "100%" };

function DebtReminderList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi] = message.useMessage();
  const [Debt, setDebt] = useState([]);
  const [form] = Form.useForm();

  const fetch = async () => {
    const internalDebt = await getDebt();
    // const externalbeneficiary = await getExternalBeneficiary();
    let debtMap;
    debtMap = internalDebt.map((x) => {
      return {
        id: x?.id,
        accnumber: x?.accnumber,
        amount: x?.amount,
        description: x?.description,
      };
    });

    setDebt(debtMap);
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

  const hanldeAddDebt = () => {
    const formSubmit = form.getFieldsValue();
    let result;
    if (formSubmit.bankType === "internal")
      result = addDebt(formSubmit.accountNumber, formSubmit.amount, formSubmit.description);
    // console.log(result);
    form.setFieldValue({});
    successMessage("Thêm nợ thành công!");
    hideModal();
  };

  const changeBankType = (value) => {
    form.setFieldValue({
      bankType: value,
    });
  };

  return (
    <div className="DebtReminderList">
      <div className="DebtReminderList__searchgroup">
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
              <div className="DebtReminderList__add">
              <Form
              form={form}
              layout="vertical"
              autoComplete="off"
            //   fields={[
            //     {
            //       name: ["accnumber"],
            //       value: debt.accnumber,
            //     },
            //     {
            //       name: ["amount"],
            //       value: debt.amount,
            //     },
            //     {
            //       name: ["description"],
            //       value: debt.description,
            //     },
            //   ]}
            >
              <Form.Item name="accnumber" label="Số tài khoản người dùng">
                <Input />
              </Form.Item>
              <Form.Item name="amount" label="Số tiền cho vay">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Ghi chú">
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
                      onClick={hideModal}
                    />
                  </div>
                  <div className="btn__submit">
                    <ButtonCustom
                      style={{ width: "100%", height: "45px" }}
                      text="Thêm mới"
                      icon={<BsPlusLg />}
                      onClick={hanldeAddDebt}
                    />
                  </div>
                </div>
              </div>
            </ModelCustom>
          </Col>
        </Row>
      </div>
      <div className="DebtReminderList__group">
        {Debt &&
          Debt.length &&
          Debt.map((item, index) => (
            <DebtReminderItem
              nonumber={index + 1}
              key={item.id}
              beneficiary={item}
              setDebt={setDebt}
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
export default DebtReminderList;
