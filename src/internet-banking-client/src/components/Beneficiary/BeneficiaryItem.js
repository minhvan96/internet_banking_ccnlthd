import { Form, Input, List, message, Modal, Radio, Select } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { FiMoreVertical } from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";
import ButtonCustom from "../common/ButtonCustom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  deleteBeneficiary,
  updateBeneficiary,
} from "../../apis/beneficiaryApi";

const { confirm } = Modal;
function BeneficiaryItem({ nonumber, beneficiary, setBeneficiaryList }) {
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
        const deleteAPI = await deleteBeneficiary(accountNumber, alias);
        if (deleteAPI) {
          setBeneficiaryList((list) => {
            const index = list.findIndex((x) => x.id === beneficiary.id);
            list.splice(index, 1);
            return list.length ? list : [];
          });
        }
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
    const dataAPI = await updateBeneficiary(formData.accnumber, formData.name);
    if (dataAPI) {
      setBeneficiaryList((list) => {
        const result = list.map((x) =>
          x.id === beneficiary.id
            ? { ...x, accountNumber: formData.accnumber, alias: formData.name }
            : x
        );
        return result;
      });
      messageApi.open({ type: "success", content: "Cập nhật thành công!" });
      hideModal();
    } else {
      messageApi.open({
        type: "warning",
        content: "Cập nhật thất bại, vui lòng thử lại!",
      });
    }
  };
  return (
    <div className="beneficiaryList__item">
      {contextHolder}
      <div className="no-box">{nonumber}</div>
      <div className="content">
        <h4> {beneficiary.alias} </h4>
        <div className="cardnumber"> {beneficiary.accountNumber} </div>
        <div className="note">Loại ngân hàng: {beneficiary.type} </div>
        <div className="note">
          Dịch vụ: Chuyển tiền nhanh NAPAS247 qua tài khoản
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
              <List.Item
                onClick={
                  item === "Chỉnh sửa"
                    ? showModal
                    : () => remove(beneficiary.accountNumber, beneficiary.alias)
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
          <div className="beneficiaryList__add">
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              fields={[
                {
                  name: ["name"],
                  value: beneficiary.alias,
                },
                {
                  name: ["accnumber"],
                  value: beneficiary.accountNumber,
                },
                {
                  name: ["bankType"],
                  value: beneficiary.type,
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
                  disabled={true}
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
export default BeneficiaryItem;
