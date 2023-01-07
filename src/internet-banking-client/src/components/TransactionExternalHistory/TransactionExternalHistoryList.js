import { Col, List, Row } from "antd";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { convertCurrentcy } from "../../utils/common";
import ButtonCustom from "../common/ButtonCustom";

const styleButton = { width: "100%", height: "44px" };
const TransactionExternalHistoryList = () => {
  const data = ["Chỉnh sửa", "Xóa"];
  return (
    <div className="transactionExternalHistory__list">
      {/* {transactionExternalHistoryList &&
        transactionExternalHistoryList.length > 0 &&
        transactionExternalHistoryList.map((item, index) => (
          <div className="transactionExternalHistory__item" key={index}>
            <Row gutter={[8, 16]} style={{ width: "100%" }}>
              <Col span={14}>
                <div className="left">
                  <div className="txt-sub txt-sub-left">
                    {item?.transferDate.split("T")[0]}
                  </div>
                  <div className="info-tranfer txt-sub-left">
                    {item?.description}
                  </div>
                </div>
              </Col>
              <Col span={10}>
                <div className="right">
                  <div className="txt-sub txt-sub-right">
                    Mã giao dịch: {item?.id}
                  </div>
                  <div
                    className={`info-tranfer ${
                      isCashIn ? "transfer-plus" : "transfer-sub"
                    } txt-sub-right`}
                  >
                    {isCashIn ? "+" : "-"}{" "}
                    {convertCurrentcy(item?.transferAmount)}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}

      {!transactionExternalHistoryList ||
        (transactionExternalHistoryList.length < 1 && (
          <div className="history-empty">Lịch sử trống</div>
        ))} */}

      <div className="transactionExternalHistory__item">
        <Row gutter={[8, 16]} style={{ width: "100%" }}>
          <Col span={14}>
            <div className="left">
              <div className="info-tranfer txt-sub-left">Ngân hàng BIDV</div>
              <div className="txt-sub txt-sub-left">18/02/2023</div>
              <div className="txt-sub txt-sub-left" >
                "Nguyen hieu nghia chuyen tien"
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className="right">
              <div className="txt-sub txt-sub-right" style={{color: '#fff'}}>Mã giao dịch: 2554152</div>
              <div className="info-tranfer transfer-plus transfer-money">
                - {convertCurrentcy(150000000)}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TransactionExternalHistoryList;
