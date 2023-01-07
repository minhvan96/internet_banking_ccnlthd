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
  getNotify,
} from "../../apis/debt";

const styleButton = { width: "100%", height: "100%" };

function DebtReminderList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi] = message.useMessage();
  const [Debt, setDebt] = useState([]);
  const [form] = Form.useForm();
  const [selectedDebt, setSelectedDebt] = useState("");
  const [isLoading, setLoading] = useState(true)

  const fetch = async (isCreator, isUnpaid) => {
    let _isCreator = isCreator == false ? isCreator : true;
    let _isUnpaid = isUnpaid == false ? isUnpaid : true;
    const internalDebt = await getDebt(_isCreator, _isUnpaid);
    
    let debtMap;
    debtMap = internalDebt.data.map((x) => {
      return {
        id: x?.id,
        accnumber: x?.accountNumber,
        amount: x?.transferAmount,
        description: x?.description,
        isPaid: x?.isPaid,
      };
    });

    setDebt(debtMap);
  };

  const fetchNoti = async () => {
    const dataNoti = await getNotify();
    console.log("🚀 ~ file: DebtReminderList.js:46 ~ fetchNoti ~ dataNoti", dataNoti)
  }

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

  const hanldeAddDebt = async () => {
    const formSubmit = form.getFieldsValue();
    let result;
    result = await addDebt(formSubmit.accnumber, formSubmit.amount, formSubmit.description);
    console.log(result);
    form.setFieldValue({});
    successMessage("Thêm nợ thành công!");
    hideModal();
  };

  useEffect(()=> {
    fetchNoti();
    if(selectedDebt === 'list-Debt-Remender') {
      fetch(true, true);
      setLoading(false);
    } else {
      fetch(false, true);
      setLoading(false);
    }
  }, [selectedDebt, Debt])

  return (
    !isLoading ? (

    <div className="DebtReminderList">
      <div className="DebtReminderList__searchgroup">
        <Row gutter={[8, 16]}>
          <Col span={20}>
            <InputSearch />
          </Col>
          <Col span={4}>
            <ButtonCustom
              style={styleButton}
              text="Nhắc nợ"
              icon={<BsPlusLg />}
              onClick={showModal}
            />
            <ModelCustom
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              title="Tạo nhắc nợ"
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
                      text="Tạo nhắc nợ"
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
      <div className="selectBox">
        <div className="showCount">
            Chọn danh sách
            <Select
              defaultValue="list-Debt"
              style={{
                marginLeft: '10px',
                width: 200,
              }}
              className="select-box"
              onChange={value => {
                setSelectedDebt(value);
              }}
              options={[
                {
                  value: "list-Debt",
                  label: "Danh sách nợ",
                },
                {
                  value: "list-Debt-Remender",
                  label: "Danh sách nhắc nợ",
                }
              ]}
            />
        </div>
      </div>
      <div className="DebtReminderList__group">
        {Debt &&
          Debt.length &&
          Debt.map((item, index) => (
            <DebtReminderItem
              nonumber={index + 1}
              key={item.id}
              debt={item}
              setDebtList={setDebt}
              statusList={selectedDebt}
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
    ) : (
      <div>
        <div className="empty"></div>
        
        </div>
    )
  );
}
export default DebtReminderList;
