import {Form, List, message, Modal} from "antd";
import React, {useState} from "react";
import "./style.scss";
import {FiMoreVertical} from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";

import UpdateCustomer from "./UpdateCustomer";


const {confirm} = Modal;

function CustomerItem({nonumber, employee, setemployeeList: setCustomers}) {
  const [form] = Form.useForm();
  const data = ["Chỉnh sửa", "Xóa"];
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
        <h4> NGUYEN HIEU NGHIA </h4>
        <div className="note">Email: nghiadx2001@gmail.com</div>
        <div className="note">Số điện thoại: 0947094472</div>
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
              <List.Item>
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
          <UpdateCustomer hideModal={hideModal}/>
        </ModelCustom>
      </div>
    </div>
  );
}

export default CustomerItem;
