import React, { useEffect, useState } from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import "./style.scss";
import useAuth from "../../../hooks/useAuth";
import { Col, Row, Select } from "antd";
import TransferHistoryList from "../../../components/TransferHistory/TransferHistoryList";
import { getAllBankTranfer } from "../../../apis/transactionTransfer";

const styleButton = { width: "100%", height: "44px" };
const TransferHistoryPage = () => {
  const [transferHistory, setTransferHistory] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const dataAPI = await getAllBankTranfer();
      setTransferHistory(dataAPI);
    };
    fetch();
  }, []);

  const { user } = useAuth();
  return (
    <div className="transferHistory">
      <h3 className="title"> Lịch sử giao dịch tài khoản</h3>
      <div className="timegroup">
        <Row gutter={[8, 16]} className="top" style={{ width: "100%" }}>
          <Col span={6}>
            <div className="label">Thời gian</div>
          </Col>
          <Col span={18}>
            <div className="time">
              <Select
                placeholder="Chọn thời gian"
                defaultValue="30 ngày gần nhất"
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
                    value: "7",
                    label: "7 ngày gần nhất",
                  },
                  {
                    value: "30",
                    label: "30 ngày gần nhất",
                  },
                ]}
              />
            </div>
          </Col>
        </Row>
      </div>

      <TransferHistoryList transferHistoryList={transferHistory} />
    </div>
  );
};

export default TransferHistoryPage;
