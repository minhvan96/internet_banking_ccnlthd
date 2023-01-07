import { Col, Row } from "antd";
import React from "react";
import { convertCurrentcy } from "../../utils/common";

const TransferHistoryList = ({ transferHistoryList, isCashIn }) => {

  return (
    <div className="transferHistory__list">
      {transferHistoryList &&
        transferHistoryList.length > 0 &&
        transferHistoryList.map((item, index) => (
          <div className="transferHistory__item" key={index}>
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

      {!transferHistoryList || transferHistoryList.length < 1 && (
        <div className="history-empty">Lịch sử trống</div>
      )}
    </div>
  );
};

export default TransferHistoryList;
