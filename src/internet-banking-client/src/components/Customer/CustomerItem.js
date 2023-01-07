import {Form, List, message, Modal} from "antd";
import React, {useState} from "react";
import "./style.scss";
import {FiMoreVertical} from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";

const {confirm} = Modal;

function CustomerItem({nonumber, employee, setEmployeeList}) {
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
        <h4>
          {employee?.firstName} {employee?.lastName}
        </h4>
        <div className="note">Email: {employee?.email} </div>
        <div className="note">Số điện thoại: {employee?.phoneNumber}</div>
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
        </ModelCustom>
      </div>
    </div>
  );
}

export default CustomerItem;
