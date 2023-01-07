import { Form, Input, Select } from "antd";
import React from "react";
import "./style.scss";

const BeneficiaryCreate = ({ alias, accountNumber, isInternal, children }) => {
  const [form] = Form.useForm();
  return (
    <div className="beneficiaryList__add">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        fields={[
          {
            name: ["name"],
            value: alias,
          },
          {
            name: ["accnumber"],
            value: accountNumber,
          },
          {
            name: ["bankType"],
            value: isInternal ? "internal" : "external",
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

      {children}
    </div>
  );
};

export default BeneficiaryCreate;
