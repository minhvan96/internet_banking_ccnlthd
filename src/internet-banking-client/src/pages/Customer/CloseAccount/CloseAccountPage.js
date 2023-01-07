import { Col, Input, Row, Modal } from "antd";
import React, { useEffect, useState } from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import ButtonCustom from "../../../components/common/ButtonCustom";
import useAuth from "../../../hooks/useAuth";
import "./style.scss";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { redirect, useNavigate } from "react-router-dom";
import { closeAccount } from "../../../apis/auth";

const styleButton = { width: "100%", height: "44px" };
const styleInput = { height: 43, fontWeight: 500, color: "#72bf00" };
const { confirm } = Modal;

const CloseAccountPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const breakcrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "Dịch vụ thẻ",
      url: "",
    },
    {
      displayName: "Đóng tài khoản",
      url: "",
    },
  ];
  const separator = ">";

  const successMessage = () => {
    confirm({
      title: "Thông báo",
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          <strong style={{ color: "#bd401e" }}>ĐÓNG TÀI KHOẢN </strong> thành
          công!"
          <div>
            {" "}
            Chọn <strong style={{ color: "#bd401e" }}>OK </strong> để thoát
          </div>
        </div>
      ),
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      async onOk() {
        successMessage();
      },
      onCancel() {},
    });
  };

  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "This is a notification message",
      content: (
        <div>
          <strong style={{ color: "#bd401e" }}>ĐÓNG TÀI KHOẢN </strong> thành
          công!"
          <div>
            {" "}
            Hệ thống sẽ sau đăng xuất sau{" "}
            <strong style={{ color: "#bd401e" }}>{secondsToGo} </strong>
          </div>
        </div>
      ),
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: (
          <div>
            <strong style={{ color: "#bd401e" }}>ĐÓNG TÀI KHOẢN </strong> thành
            công!"
            <div>
              {" "}
              Hệ thống sẽ sau đăng xuất sau{" "}
              <strong style={{ color: "#bd401e" }}>{secondsToGo} </strong>
            </div>
          </div>
        ),
      });
    }, 1000);
    setTimeout(async () => {
      clearInterval(timer);
      modal.destroy();

      // call api disable account
      const response = await closeAccount();
      if (response) {
        logout();
        navigate("/login");
      } else {
        console.log("faile");
      }
    }, secondsToGo * 1000);
  };

  const onSubmit = () => {
    confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          Bạn chắc chắn muốn{" "}
          <strong style={{ color: "#bd401e" }}>ĐÓNG TÀI KHOẢN </strong>của bạn?"
        </div>
      ),
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      async onOk() {
        countDown();
      },
      onCancel() {},
    });
  };
  return (
    <div className="closeaccount">
      <div className="closeaccount__header">Đóng tài khoản</div>
      <BreakCrumbCommon data={breakcrumbData} separator={separator} />

      <div className="group">
        <div className="group__item">
          <Row gutter={[8, 16]}>
            <Col span={8}>
              <div className="sub">Chủ tài khoản</div>
            </Col>
            <Col span={16}>
              <div className="content">
                <Input
                  readOnly
                  style={styleInput}
                  defaultValue={`${user?.firstName} ${user?.lastName}`}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="group__item">
          <Row gutter={[8, 16]}>
            <Col span={8}>
              <div className="sub">Tài khoản nguồn</div>
            </Col>
            <Col span={16}>
              <div className="content">
                <Input
                  readOnly
                  style={styleInput}
                  defaultValue={user?.bankAccount?.accountNumber}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="btn-submit">
        <Row gutter={[8, 16]}>
          <Col span={8}></Col>
          <Col span={8}>
            <ButtonCustom
              text="Xác nhận"
              style={styleButton}
              onClick={onSubmit}
            />
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </div>
  );
};

export default CloseAccountPage;
