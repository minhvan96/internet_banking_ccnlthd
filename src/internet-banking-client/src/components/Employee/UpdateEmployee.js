import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Form, Input, message, Row, Select } from "antd";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";

const styleButton = { width: "100%", height: "100%" };
const UpdateEmployee = ({employee, hideModal}) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    
    // hideModal();
  };
  return (
    <div className="employeeList__add">
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
        <Form.Item name="password" label="Mật khẩu">
          <Input placeholder="Mật khẩu" />
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
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
