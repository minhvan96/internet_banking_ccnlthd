import { Col, Row } from "antd";
import React from "react";
import { convertCurrentcy } from "../../utils/common";

const TransferHistoryList = ({ transferHistoryList }) => {
  return (
    <div className="transferHistory__list">
      <div className="header">Toàn bộ</div>
      {transferHistoryList &&
        transferHistoryList.length &&
        transferHistoryList.map((item, index) => (
          <div className="transferHistory__item" key={index}>
            <Row gutter={[8, 16]} style={{ width: "100%" }}>
              <Col span={14}>
                <div className="left">
                  <div className="txt-sub txt-sub-left">04/01/2023</div>
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
                  <div className="info-tranfer transfer-plus txt-sub-right">
                    {convertCurrentcy(item?.transferAmount)}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}
    </div>
  );
};

export default TransferHistoryList;
