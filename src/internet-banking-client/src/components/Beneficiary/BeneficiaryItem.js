import { Form, Input, List, Modal, Radio, Select } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { FiMoreVertical } from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";
import ButtonCustom from "../common/ButtonCustom";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;
function BeneficiaryItem({ nonumber, beneficiary, setBeneficiaryList }) {
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
        setBeneficiaryList((list) => {
          const index = list.findIndex((x) => x.id === beneficiary.id);
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
    setBeneficiaryList((list) => {
      const result = list.map((x) =>
        x.id === beneficiary.id
          ? { ...x, accountNumber: formData.accnumer, alias: formData.name }
          : x
      );
      return result;
    });

    hideModal();
  };
  return (
    <div className="beneficiaryList__item">
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
