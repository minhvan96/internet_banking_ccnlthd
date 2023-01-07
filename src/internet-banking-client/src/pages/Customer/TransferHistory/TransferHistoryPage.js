import React, { useEffect, useState } from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import "./style.scss";
import useAuth from "../../../hooks/useAuth";
import { Col, Row, Select } from "antd";
import TransferHistoryList from "../../../components/TransferHistory/TransferHistoryList";
import {
  getAllBankTranfer,
  getAllBankTranferCashIn,
} from "../../../apis/transactionTransfer";
import { NavLink, Router, useAsyncError } from "react-router-dom";

const styleButton = { width: "100%", height: "44px" };
const TransferHistoryPage = () => {
  const [transferHistory, setTransferHistory] = useState([]);
  const [transferHistoryCashIn, setTransferHistoryCashIn] = useState([]);
  const [currentCash, setCurrentCash] = useState("cashin");

  useEffect(() => {
    const fetch = async () => {
      const dataAPI = await getAllBankTranfer();
      const dataAPICashIn = await getAllBankTranferCashIn();
      setTransferHistory(dataAPI);
      setTransferHistoryCashIn(dataAPICashIn);
    };
    fetch();
  }, []);

  const onChangeCash = (cashType) => {
    setCurrentCash(cashType);
  };

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

      <div className="transferHistory__group">
        <div className="header">
          <div
            className={`${currentCash === "cashin" && "active"} cash-in`}
            onClick={() => onChangeCash("cashin")}
          >
            {/* <Router>
              <NavLink to="cash-in" activeClassName="active"> */}
            Tiền vào
            {/* </NavLink>
            </Router> */}
          </div>
          <div
            className={`${currentCash !== "cashin" && "active"} cash-out`}
            onClick={() => onChangeCash("cashout")}
          >
            Tiền ra
          </div>
        </div>
        <TransferHistoryList
          transferHistoryList={
            currentCash === "cashin" ? transferHistoryCashIn : transferHistory
          }
          isCashIn={currentCash === "cashin" ? true : false}
        />
      </div>
    </div>
  );
};

export default TransferHistoryPage;
