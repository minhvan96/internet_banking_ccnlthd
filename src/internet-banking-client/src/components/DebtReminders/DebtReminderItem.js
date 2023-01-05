import { Form, Input, List, Modal, Radio, Select } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { FiMoreVertical } from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";
import ButtonCustom from "../common/ButtonCustom";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;
function DebtReminderItem({ nonumber, debt, setDebtList }) {
  const [form] = Form.useForm();
  const data = ["Chỉnh sửa", "Xóa"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const remove = () => {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn chắc chắn muốn xóa tên hưởng thụ này?",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        setDebtList((list) => {
          const index = list.findIndex((x) => x.id === debt.id);
          list.splice(index, 1);
          return list.length ? list : [];
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const submitUpdate = () => {
    const formData = form.getFieldsValue();
    setDebtList((list) => {
      const result = list.map((x) =>
        x.id === debt.id
          ? { ...x, accountNumber: formData.accnumer, alias: formData.name }
          : x
      );
      return result;
    });

    hideModal();
  };
  return (
    <div className="DebtReminderList__item">
      <div className="no-box">{nonumber}</div>
      <div className="content">
        <h4> {debt.accnumer} </h4>
        <div className="cardnumber">{debt.accnumber}</div>
        <div className="note">Ghi chú: {debt.description}</div>
        <div className="note">
          Dịch vụ: Cho mượn nợ/thanh toán nợ
        </div>
      </div>
      <div className="showmore">
        <FiMoreVertical />
        <div className="showmoreList">
          <List
            className="list__ant"
            size="small"
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item onClick={item === "Chỉnh sửa" ? showModal : remove}>
                {item}
              </List.Item>
            )}
          />
        </div>
        <ModelCustom
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Cập nhật"
        >
          <div className="DebtReminderList__add">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              fields={[
                {
                  name: ["accnumber"],
                  value: debt.accnumber,
                },
                {
                  name: ["amount"],
                  value: debt.amount,
                },
                {
                  name: ["description"],
                  value: debt.description,
                },
              ]}
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
                  onClick={hideModal}
                />
              </div>
              <div className="btn__submit">
                <ButtonCustom
                  style={{ width: "100%", height: "45px" }}
                  text="Cập nhật"
                  onClick={submitUpdate}
                />
              </div>
            </div>
          </div>
        </ModelCustom>
      </div>
    </div>
  );
}
export default DebtReminderItem;
