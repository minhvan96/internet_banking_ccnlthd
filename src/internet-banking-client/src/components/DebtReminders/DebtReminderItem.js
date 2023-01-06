import { Form, Input, List, Modal, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(debt);
  })

  return (
    <div className="DebtReminderList__item">
      <div className="no-box">{nonumber}</div>
      <div className="content">
        <h4> {debt.accnumer} </h4>
        <div className="cardnumber">{debt.accnumber}</div>
        <div className="cardnumber">Số tiền nợ: {debt.amount}</div>
        <div className="note">Ghi chú: {debt.description}</div>
        <div className="note">
          Dịch vụ: Cho mượn nợ/thanh toán nợ
        </div>
      </div>
      <div className="status">
        { debt.isPaid === false &&
          <button>
            Thanh toán
          </button>
        }
        { debt.isPaid === true &&
          <p>Đã thanh toán</p>
        }

      </div>

    </div>
  );
}
export default DebtReminderItem;
