import { Col, Row } from "antd";
import React from "react";
import { convertCurrentcy } from "../../utils/common";
import dateFormat from "dateformat";

const TransactionExternalHistoryList = ({ transactionHistory }) => {
  return (
    <div className="transactionExternalHistory__list">
      {transactionHistory &&
        transactionHistory.length > 0 &&
        transactionHistory.map((item, index) => (
          <div className="transactionExternalHistory__item" key={index}>
            <Row gutter={[8, 16]} style={{ width: "100%" }}>
              <Col span={14}>
                <div className="left">
                  <div className="info-tranfer txt-sub-left">
                    {item?.bankName}
                  </div>
                  <div className="txt-sub txt-sub-left">
                    {dateFormat(item?.creationDate, "fullDate")}
                  </div>
                  <div className="txt-sub txt-sub-left">
                    {item?.description}
                  </div>
                </div>
              </Col>
              <Col span={10}>
                <div className="right">
                  <div
                    className="txt-sub txt-sub-right"
                    style={{ color: "#fff" }}
                  >
                    Mã giao dịch: {item?.id}
                  </div>
                  <div
                    className={`info-tranfer ${
                      item?.transactionType === "send"
                        ? "transfer-sub"
                        : "transfer-plus"
                    } transfer-money`}
                  >
                    {item?.transactionType === "send" ? "-" : "+"}{" "}
                    {convertCurrentcy(item?.amount)}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}

      {!transactionHistory ||
        (transactionHistory.length < 1 && (
          <div className="history-empty">Lịch sử trống</div>
        ))}
    </div>
  );
};

export default TransactionExternalHistoryList;
