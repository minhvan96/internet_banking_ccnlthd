import React, {useState, useEffect} from "react";
import "../Employee/style.scss";
import {Col, Form, Input, message, Row, Select} from "antd";
import InputSearch from "../common/InputSearch";
import ButtonCustom from "../common/ButtonCustom";
import {BsPlusLg} from "react-icons/bs";
import ModelCustom from "../common/ModalCustom";
import CustomerItem from "./CustomerItem";
import CreateCustomer from "./CreateCustomer";

const styleButton = {width: "100%", height: "100%"};

function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [customers, setCustomers] = useState([]);
  const [form] = Form.useForm();

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

  const addCustomer = async () => {
    const formSubmit = form.getFieldsValue();
    console.log(formSubmit);
    let result;
    if (formSubmit.bankType === "Nội bộ") {

    }
    form.setFieldValue({});
    successMessage("Thêm khách hàng thành công!");
    hideModal();
  };

  return (
    <div className="employeeList">
      {contextHolder}
      <div className="employeeList__searchgroup">
        <Row gutter={[8, 16]}>
          <Col span={20}>
            <InputSearch/>
          </Col>
          <Col span={4}>
            <ButtonCustom
              style={styleButton}
              text="Thêm mới"
              icon={<BsPlusLg/>}
              onClick={showModal}
            />
            <ModelCustom
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              title="Thêm mới"
            >
              <CreateCustomer hideModal={hideModal}/>
            </ModelCustom>
          </Col>
        </Row>
      </div>
      <div className="employeeList__group">
        <CustomerItem
          nonumber={1}
          key={1}
          employee={customers}
          setemployeeList={setCustomers}
        />
        <CustomerItem
          nonumber={1}
          key={1}
          employee={null}
          setemployeeList={setCustomers}
        />
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

export default CustomerList;
