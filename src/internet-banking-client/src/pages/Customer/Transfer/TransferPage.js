import { Col, Input, Radio, Row, Select } from "antd";
import React, { useState } from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import "./style.scss";
import { FaUserFriends } from "react-icons/fa";
import ButtonCustom from "../../../components/common/ButtonCustom";

const styleButton = { width: "100%", height: "44px" };
const TransferPage = ({ isInternalTransfer }) => {
  const [transactionFee, setTransactionFee] = useState(1); // 0: nguoi chuyen tra - 1: nguoi nhan tra
  const onChangeRadio = (e) => {
    setTransactionFee(e.target.value);
  };
  const breakcrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "CHuyển tiền trong hệ thống",
      url: "",
    },
  ];
  const separator = ">";
  return (
    <div className="transfer">
      {/* heaer */}
      <h2 className="transfer__header">Chuyển tiền trong hệ thống</h2>
      {/* breakcrumb */}
      <BreakCrumbCommon data={breakcrumbData} separator={separator} />

      <div className="transfer__item" style={{ marginTop: "30px" }}>
        <Row gutter={[8, 16]} className="top">
          <Col span={8}>
            <div className="lablename">Tài khoản nguồn</div>
          </Col>
          <Col span={16}>
            <Select
              defaultValue="1017332621"
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
                  value: "1017332621",
                  label: "1017332621",
                },
                {
                  value: "1011332221",
                  label: "1011332221",
                },
                {
                  value: "1017332300",
                  label: "1017332300",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[8, 16]} className="bottom">
          <Col span={8}>
            <div className="lablename">Số dư khả dụng</div>
          </Col>
          <Col span={16}>
            <div className="bottom-right-value">1,780,989 VND</div>
          </Col>
        </Row>
      </div>

      <div className="transfer__item">
        {isInternalTransfer && (
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
            <Select
              placeholder="Nhập / chọn tài khoản thụ hưởng"
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
                  value: "1017332621",
                  label: "1017332621",
                },
                {
                  value: "1011332221",
                  label: "1011332221",
                },
                {
                  value: "1017332300",
                  label: "1017332300",
                },
              ]}
            />
          </Col>
          <Col span={2}>
            <div className="icon">
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
            <Input className="input input-custom" placeholder="Nhập số tiền" />
          </Col>
        </Row>
        <Row gutter={[8, 16]} className="top">
          <Col span={8}>
            <div className="lablename">Phí giao dịch</div>
          </Col>
          <Col span={16}>
            <div className="transactionfee">
              <Radio.Group onChange={onChangeRadio} value={transactionFee}>
                <Radio style={{ color: "#fff" }} value={0}>
                  Người chuyển trả
                </Radio>
                <Radio style={{ color: "#fff" }} value={1}>
                  Người nhận trả
                </Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 16]} className="top">
          <Col span={8}>
            <div className="lablename">Nội dung</div>
          </Col>
          <Col span={16}>
            <Input className="input" />
          </Col>
        </Row>
      </div>

      <div className="transfer__bottom">
        <ButtonCustom style={styleButton} text="Tiếp tục" />
      </div>
    </div>
  );
};

export default TransferPage;
