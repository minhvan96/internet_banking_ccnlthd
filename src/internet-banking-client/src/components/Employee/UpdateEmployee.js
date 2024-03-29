import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Form, Input, message, Row, Select } from "antd";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import { addEmployee, updateEmployee } from "../../apis/administratorApi";

const UpdateEmployee = ({ hideModal, setEmployeeList, employee }) => {
  const [form] = Form.useForm();
  const onSubmit = (id) => {
    handleUpdateEmployee(id);
    form.resetFields();
    hideModal();
  };

  const handleUpdateEmployee = async (id) => {
    const formSubmit = form.getFieldsValue();
    formSubmit.id = id;
    console.log(formSubmit);
    const response = await updateEmployee(formSubmit);
    if (response) {
      setEmployeeList((employee) => {
        const result = employee.map((x) =>
          +x.id !== id
            ? x
            : {
                email: formSubmit?.email,
                firstName: formSubmit?.firstName,
                id: formSubmit?.id,
                lastName: formSubmit?.lastName,
                phoneNumber: formSubmit?.phoneNumber,
                userName: formSubmit?.userName,
              }
        );
        return result;
      });
    }
    successMessage("Cập nhật nhân viên thành công!");
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
            onClick={() => onSubmit(employee.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
