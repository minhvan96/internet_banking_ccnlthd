import React from "react";
import { Button, Input } from "antd";
import "./stype.scss";
import { Link } from "react-router-dom";
import { SpaceCompactItemContext } from "antd/es/space/Compact";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login__container">
        <div className="login__form">
          <div className="login__form-header">
            <h1 className="header__title title-primary">NPTV</h1>
            <h1 className="header__title title-second">Digibank</h1>
          </div>
          <p className="login__form-wellcome">Kính chào Quý khách</p>
          <div className="login__form-alert"></div>
          <div className="form-control login__form-username login__form-input">
            <Input placeholder="Tên đăng nhập" />
          </div>
          <div className="form-control login__form-password login__form-input">
            <Input placeholder="Mật khẩu" />
          </div>
          <Button type="primary" className="login__form-submit">
            Đăng nhập
          </Button>

          <div className="login__form-forget">
            <Link>Quên mật khẩu?</Link>
            <Link>Hướng dẫn chuyển đổi sang VCB Digibank</Link>
            <Link>Đặt lịch hẹn với Vietcombank</Link>
          </div>
        </div>
        <div className="login__footer">
          <div className="left">
            <span>Điều khoản sử dụng dịch vụ</span>
            <span className="space">|</span>
            <span>Biểu phí dịch vụ</span>
            <span className="space">|</span>
            <span>Hướng dẫn sử dụng dịch vụ</span>
            <span className="space">|</span>
            <span>Hướng dẫn giao dịch an toàn</span>
            <span className="space">|</span>
            <span>Câu hỏi thường gặp</span>
          </div>
          <div className="right">
            <span>Liên hệ</span>
            <span className="space">|</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
