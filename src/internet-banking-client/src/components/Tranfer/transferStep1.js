import { Button, Col, Form, Input, message, Radio, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FaUserFriends } from "react-icons/fa";
import ButtonCustom from "../common/ButtonCustom";
import userApi from "../../apis/user";
import ModelCustom from "../common/ModalCustom";
import BeneficiaryBankingList from "../Beneficiary/BeneficiaryBankingList";
import { getInternalBeneficiary } from "../../apis/beneficiaryApi";
import { bankInternalTransactionTranfer } from "../../apis/transactionTransfer";
import { convertCurrentcy } from "../../utils/common";

const styleButton = { width: "100%", height: "44px" };
const TransferStep1 = ({ isInternalTransfer, currentUser, nextStep }) => {
  console.log(isInternalTransfer);
  const [transactionFee, setTransactionFee] = useState(1); // 0: nguoi chuyen tra - 1: nguoi nhan tra
  const [accountNumberFromList, setAccountNumberFromList] = useState("");
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  const [messageApi] = message.useMessage();

  const onChangeRadio = (e) => {
    setTransactionFee(e.target.value);
  };
  const [form] = Form.useForm();

  const onsubmit = async () => {
    const formData = form.getFieldsValue();
    if (
      !formData.transactionfee ||
      !formData.beneficiaryAccountNumber ||
      !formData.amount ||
      !formData.content
    ) {
      messageApi.open({
        type: "success",
        content: "Vui lòng điền tất cả các trường.",
      });
      return;
    }
    var submitAPI = await bankInternalTransactionTranfer(
      formData.transactionfee,
      formData.beneficiaryAccountNumber,
      formData.amount,
      formData.content
    );

    if (submitAPI) {
      console.log('submit oke');
      const nextStepNum = 2;
      nextStep(nextStepNum, submitAPI);
    }
  };

  const showBeneficiaryList = () => {
    showModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetch = async () => {
      // call api get beneficiary list
      if (isInternalTransfer) {
        const internalbeneficiary = await getInternalBeneficiary();
        console.log(internalbeneficiary);
        let beneficiaryMap = internalbeneficiary.map((x) => {
          return {
            id: x?.id,
            accountNumber: x?.accountNumber,
            alias: x?.alias,
            type: "Nội bộ",
          };
        });
        setBeneficiaryList(beneficiaryMap);
      }
    };

    fetch();
  }, []);
  return (
    <div className="tranferStep1">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        fields={[
          {
            name: ["rootAccountNumber"],
            value: currentUser?.bankAccount?.accountNumber,
          },
          {
            name: ["transactionFee"],
            value: "0",
          },
          {
            name: ["amount"],
            value: 600000,
          },
          {
            name: ["beneficiaryAccountNumber"],
            value: accountNumberFromList,
          },
          {
            name: ["content"],
            value: `${currentUser?.firstName} ${currentUser?.lastName} chuyen tien`,
          },
        ]}
      >
        <div className="transfer__item" style={{ marginTop: "30px" }}>
          <Row gutter={[8, 16]} className="top">
            <Col span={8}>
              <div className="lablename">Tài khoản nguồn</div>
            </Col>
            <Col span={16}>
              <Form.Item
                name="rootAccountNumber"
                label={null}
                style={{ marginBottom: 0 }}
              >
                <Input
                  className="input input-custom"
                  placeholder="Tài khoản nguồn"
                  style={{ fontWeight: 500, letterSpacing: 1, fontSize: 16 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 16]} className="bottom">
            <Col span={8}>
              <div className="lablename">Số dư khả dụng</div>
            </Col>
            <Col span={16}>
              <div className="bottom-right-value">
                {convertCurrentcy(currentUser?.bankAccount?.balance)}
              </div>
            </Col>
          </Row>
        </div>

        <div className="transfer__item">
          {!isInternalTransfer && (
            <Row gutter={[8, 16]} className="top">
              <Col span={8}>
                <div className="lablename">Ngân hàng thụ hưởng</div>
              </Col>
              <Col span={16}>
                <Select
                  placeholder="Chọn ngân hàng thụ hưởng"
                  style={{
                    width: "100%",
                    textAlign: "initial",
                    fontSize: "16px",
                    fontWeight: 400,
                    height: 45,
                  }}
                  className="select-box"
                  // onChange={handleChange}
                  options={[
                    {
                      value: "BIDV",
                      label: "BIDV",
                    },
                    {
                      value: "HSBC",
                      label: "HSBC",
                    },
                    {
                      value: "SCB",
                      label: "SCB",
                    },
                  ]}
                />
              </Col>
            </Row>
          )}
          <Row gutter={[8, 16]} className="top">
            <Col span={8}>
              <div className="lablename">Thông tin người hưởng</div>
            </Col>
            <Col span={14}>
              <Form.Item
                name="beneficiaryAccountNumber"
                style={{ marginBottom: 0 }}
              >
                <Input
                  className="input input-custom"
                  placeholder="Nhập số tài khoản thụ hưởng"
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className="icon" onClick={showBeneficiaryList}>
                <FaUserFriends />
              </div>
            </Col>
          </Row>
        </div>

        <div className="transfer__item">
          <Row gutter={[8, 16]} className="top">
            <Col span={8}>
              <div className="lablename">Số tiền</div>
            </Col>
            <Col span={16}>
              <Form.Item name="amount" style={{ marginBottom: 0 }}>
                <Input
                  className="input input-custom"
                  placeholder="Nhập số tiền"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 16]} className="top">
            <Col span={8}>
              <div className="lablename">Phí giao dịch</div>
            </Col>
            <Col span={16}>
              <div className="transactionfee">
                <Form.Item name="transactionfee" style={{ marginBottom: 0 }}>
                  <Radio.Group>
                    <Radio style={{ color: "#fff" }} value="sender pay">
                      Người chuyển trả
                    </Radio>
                    <Radio style={{ color: "#fff" }} value="receiver pay">
                      Người nhận trả
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={[8, 16]} className="top">
            <Col span={8}>
              <div className="lablename">Nội dung</div>
            </Col>
            <Col span={16}>
              <Form.Item name="content" style={{ marginBottom: 0 }}>
                <Input className="input" placeholder="Nhập nội dung" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
      <div className="transfer__bottom">
        <ButtonCustom style={styleButton} text="Tiếp tục" onClick={onsubmit} />
      </div>

      <ModelCustom
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Danh sách thụ hưởng"
      >
        <BeneficiaryBankingList
          setAccountNumber={setAccountNumberFromList}
          beneficiaryList={beneficiaryList}
        />

        <ButtonCustom text="Chọn" onClick={hideModal} />
        <div className="note" style={{ fontSize: 12, marginTop: 20 }}>
          Quý khách có thể chọn một người thụ hưởng cho 1 lần giao dịch
        </div>
      </ModelCustom>
    </div>
  );
};

export default TransferStep1;
