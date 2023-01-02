import { Form, Input, List, Modal, Radio } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { FiMoreVertical } from "react-icons/fi";
import ModelCustom from "../common/ModalCustom";
import ButtonCustom from "../common/ButtonCustom";
import { ExclamationCircleFilled } from '@ant-design/icons';


const { confirm } = Modal;
function BeneficiaryItem({ nonumber }) {
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
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="beneficiaryList__item">
      <div className="no-box">{nonumber}</div>
      <div className="content">
        <h4> NGUYEN HIEU NGHIA </h4>
        <div className="cardnumber">14410000232388</div>
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
            <Form layout="vertical" autoComplete="off">
              <Form.Item name="name" label="Tên gợi nhớ">
                <Input />
              </Form.Item>
              <Form.Item name="accnumber" label="Số tài khoản">
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
                  onClick={hideModal}
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
