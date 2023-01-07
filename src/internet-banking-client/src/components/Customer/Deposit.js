import React from "react";
import "./style.scss";
import {Form, Input, message} from "antd";
import ButtonCustom from "../common/ButtonCustom";
import {BsPlusLg} from "react-icons/bs";
import {makeDeposit} from "../../apis/customerApi";
import {getAllCustomers} from "../../apis/employeeApi";

const Deposit = ({hideModal, setCustomers, customer}) => {
  const [form] = Form.useForm();

  const onSubmit = async (id) => {
    await handleDeposit(id);
    form.resetFields();
    hideModal();
  };

  const handleDeposit = async (id) => {
    const formSubmit = form.getFieldsValue();
    formSubmit.userId = id;
    console.log(formSubmit);
    const response = await makeDeposit(formSubmit);
    if (response === "") {
      const customers = await getAllCustomers();
      setCustomers(customers);
    }
    successMessage("Nạp tiền thành công!");
    hideModal();
  };

  const successMessage = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  console.log(customer)
  const [messageApi, contextHolder] = message.useMessage();
  return (<div className="employeeList__add">
    {contextHolder}
    <Form
      form={form}
      layout="horizontal"
      autoComplete="off"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
    >
      <Form.Item name="depositAmount" label="Số tền nạp">
        <Input placeholder="Số tền nạp"/>
      </Form.Item>
    </Form>

    <div className="footer">
      <div className="btn__cancel">
        <ButtonCustom
          isLine={true}
          style={{width: "100%", height: "45px"}}
          text="Hủy"
          icon={<BsPlusLg/>}
          onClick={hideModal}
        />
      </div>
      <div className="btn__submit">
        <ButtonCustom
          style={{width: "100%", height: "45px"}}
          text="Nạp tiền"
          icon={<BsPlusLg/>}
          onClick={() => onSubmit(customer.id)}
        />
      </div>
    </div>
  </div>);
};

export default Deposit;
