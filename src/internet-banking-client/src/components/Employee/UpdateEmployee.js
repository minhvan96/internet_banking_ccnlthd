import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Form, Input, message, Row, Select } from "antd";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import { addEmployee } from "../../apis/administratorApi";

const UpdateEmployee = ({ hideModal, setEmployeeList, employee }) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    handleUpdateEmployee();
    form.resetFields();
    hideModal();
  };

  const handleUpdateEmployee = async () => {
    const formSubmit = form.getFieldsValue();
    const response = await addEmployee(formSubmit);
    if (response) {
      setEmployeeList((employee) => {
        return [
          ...employee,
          {
            email: response?.email,
            firstName: response?.firstName,
            id: response?.id,
            lastName: response?.lastName,
            phoneNumber: response?.phoneNumber,
            userName: response?.userName,
          },
        ];
      });
    }
    form.setFieldValue({});
    successMessage("Thêm người hưởng thụ thành công!");
    hideModal();
  };
  const successMessage = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className="employeeList__add">
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
        fields={[
          {
            name: ["firstName"],
            value: employee?.firstName,
          },
          {
            name: ["lastName"],
            value: employee?.lastName,
          },
          {
            name: ["email"],
            value: employee?.email,
          },
          {
            name: ["phoneNumber"],
            value: employee?.phoneNumber,
          },
          {
            name: ["username"],
            value: employee?.userName,
          },
        ]}
      >
        <Form.Item name="firstName" label="Họ nhân viên">
          <Input placeholder="Họ nhân viên" />
        </Form.Item>
        <Form.Item name="lastName" label="Tên nhân viên">
          <Input placeholder="Tên nhân viên" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Số điện thoại">
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item name="username" label="Tên đăng nhập">
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
      </Form>

      <div className="footer">
        <div className="btn__cancel">
          <ButtonCustom
            isLine={true}
            style={{ width: "100%", height: "45px" }}
            text="Hủy"
            onClick={hideModal}
          />
        </div>
        <div className="btn__submit">
          <ButtonCustom
            style={{ width: "100%", height: "45px" }}
            text="Cập nhật"
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
