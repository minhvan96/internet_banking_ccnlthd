import { Form, Input, List, message, Modal, Radio, Select } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { FiMoreVertical } from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";
import ButtonCustom from "../common/ButtonCustom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import UpdateEmployee from "./UpdateEmployee";
// import {
//   deleteemployee,
//   updateemployee,
// } from "../../apis/employeeApi";

const { confirm } = Modal;
function EmployeeItem({ nonumber, employee, setEmployeeList }) {
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

  const remove = (accountNumber, alias) => {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn chắc chắn muốn xóa tên hưởng thụ này?",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      async onOk() {
        // call api delete
        // const deleteAPI = await deleteemployee(accountNumber, alias);
        // if (deleteAPI) {
        //   setemployeeList((list) => {
        //     const index = list.findIndex((x) => x.id === employee.id);
        //     list.splice(index, 1);
        //     return list.length ? list : [];
        //   });
        // }
        messageApi.open({ type: "success", content: "Xóa thành công!" });
      },
      onCancel() {
        messageApi.open({
          type: "warning",
          content: "Có lỗi xảy ra, vui lòng thử lại!",
        });
      },
    });
  };

  const submitUpdate = async () => {
    const formData = form.getFieldsValue();
    //update
    // const dataAPI = await updateemployee(formData.accnumber, formData.name);
    // if (dataAPI) {
    //   setemployeeList((list) => {
    //     const result = list.map((x) =>
    //       x.id === employee.id
    //         ? { ...x, accountNumber: formData.accnumber, alias: formData.name }
    //         : x
    //     );
    //     return result;
    //   });
    //   messageApi.open({ type: "success", content: "Cập nhật thành công!" });
    //   hideModal();
    // } else {
    //   messageApi.open({
    //     type: "warning",
    //     content: "Cập nhật thất bại, vui lòng thử lại!",
    //   });
    // }
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
                  item === "Chỉnh sửa"
                    ? showModal
                    : () => remove(employee.accountNumber, employee.alias)
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
