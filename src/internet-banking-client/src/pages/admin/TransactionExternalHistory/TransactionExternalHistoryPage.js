import React, { useState } from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import "./style.scss";
import { Col, DatePicker, Form, Input, Row } from "antd";
import ButtonCustom from "../../../components/common/ButtonCustom";
import TransactionExternalHistoryList from "../../../components/TransactionExternalHistory/TransactionExternalHistoryList";
import dateFormat from "dateformat";
import { getTransactionHistory } from "../../../apis/administratorApi";
import { convertCurrentcy } from "../../../utils/common";

const styleButton = { width: "100%", height: "44px", marginTop: "30px" };
const TransactionExternalHistoryPage = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const breakcrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "Lịch sử giao dịch",
      url: "",
    },
  ];
  const separator = ">";

  const onSearch = async () => {
    const formDate = form.getFieldsValue();
    const startDate = dateFormat(formDate.time[0].toDate(), "isoDateTime");
    const endDate = dateFormat(formDate.time[1].toDate(), "isoDateTime");
    const body = {
      fromDate: startDate,
      endDate: endDate,
      bank: formDate.bankName,
    };

    const response = await getTransactionHistory(body);
    console.log(response);
    setTransactionHistory(response);
  };

  return (
    <div className="transactionExternalHistory">
      <h3 className="title"> Lịch sử giao dịch tài khoản</h3>
      <BreakCrumbCommon data={breakcrumbData} separator={separator} />
      <div className="timegroup">
        <Form form={form} layout="vertical">
          <Row gutter={[8, 16]} className="top" style={{ width: "100%" }}>
            <Col span={8}>
              <Form.Item label="Tên ngân hàng" name="bankName">
                <Input
                  placeholder="Tên ngân hàng"
                  style={{
                    width: "100%",
                    textAlign: "initial",
                    fontSize: "16px",
                    fontWeight: 400,
                    height: 45,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="time">
                <Form.Item label="Thời gian" name="time">
                  <RangePicker
                    style={{
                      width: "100%",
                      textAlign: "initial",
                      fontSize: "16px",
                      fontWeight: 400,
                      height: 45,
                    }}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col span={4}>
              <ButtonCustom
                text="Xem kết quả"
                style={styleButton}
                onClick={onSearch}
              />
            </Col>
          </Row>
        </Form>
      </div>

      {transactionHistory && transactionHistory.totalAmount && (
        <div className="total">
          <div className="label">Tổng phí giao dịch: </div>
          <div className="total-fee">
            {convertCurrentcy(transactionHistory?.totalAmount)}
          </div>
        </div>
      )}

      <div className="transferHistory__group">
        <div className="header">
          <div className="cash-in cashin" style={{ fontWeight: 500 }}>
            Danh sách giao dịch liên ngân hàng
          </div>
        </div>
        <TransactionExternalHistoryList
          transactionHistory={transactionHistory?.transaction}
        />
      </div>
    </div>
  );
};

export default TransactionExternalHistoryPage;
