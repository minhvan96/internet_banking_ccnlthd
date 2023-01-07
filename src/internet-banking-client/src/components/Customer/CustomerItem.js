import {Form, List, message, Modal} from "antd";
import React, {useState} from "react";
import "./style.scss";
import {FiMoreVertical} from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";
import Deposit from "./Deposit";

const {confirm} = Modal;

function CustomerItem({nonumber, customer, setCustomers}) {
  console.log(`customer: ${customer}`)
  const [form] = Form.useForm();
  const data = ["Nạp tiền", "Xóa"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="employeeList__item">
      {contextHolder}
      <div className="no-box">{nonumber}</div>
      <div className="content">
        <h4>
          {customer?.name}
        </h4>
        <div className="note">Id: {customer?.id} </div>
        <div className="note">Tên tài khoản: {customer?.name} </div>
        <div className="note">Email: {customer?.email} </div>
        <div className="note">Số tài khoản: {customer?.accountNumber}</div>
        <div className="note">Số dư: {customer?.balance}</div>
      </div>
      <div className="showmore">
        <FiMoreVertical/>
        <div className="showmoreList">
          <List
            className="list__ant"
            size="small"
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item onClick={showModal}>
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
          <Deposit
            hideModal={hideModal}
            setCustomers={setCustomers}
            customer={customer}
          />
        </ModelCustom>
      </div>
    </div>
  );
}

export default CustomerItem;
