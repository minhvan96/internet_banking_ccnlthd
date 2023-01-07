import { Form, Input, List, message, Modal, Radio, Select } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { FiMoreVertical } from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import UpdateEmployee from "./UpdateEmployee";
import { deleteEmployee } from "../../apis/administratorApi";

const { confirm } = Modal;
function EmployeeItem({ nonumber, employee, setEmployeeList }) {
  const data = ["Chỉnh sửa", "Xóa"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const remove = (id) => {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn chắc chắn muốn xóa tên hưởng thụ này?",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      async onOk() {
        // call api delete
        const response = await deleteEmployee(id);
        setEmployeeList((list) => {
          const index = list.findIndex((x) => x.id === id);
          const splice1 = list.splice(0, index);
          const splice2 = list.splice(index + 1, list.length);
          return [...splice1, ...splice2];
        });
      },
      onCancel() {
        messageApi.open({
          type: "warning",
          content: "Có lỗi xảy ra, vui lòng thử lại!",
        });
      },
    });
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
        <FiMoreVertical />
        <div className="showmoreList">
          <List
            className="list__ant"
            size="small"
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                onClick={
                  item === "Chỉnh sửa" ? showModal : () => remove(employee.id)
                }
              >
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
          <UpdateEmployee
            hideModal={hideModal}
            setEmployeeList={setEmployeeList}
            employee={employee}
          />
        </ModelCustom>
      </div>
    </div>
  );
}
export default EmployeeItem;
