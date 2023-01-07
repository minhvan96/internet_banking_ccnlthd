import React from "react";
import "./style.scss";
import Banner from "../../../assets/images/banner.jpg";
import { HiUserGroup } from "react-icons/hi";
import {
  MdTransferWithinAStation,
  MdOutlineRememberMe,
  MdModelTraining,
} from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa";
import { ImHistory } from "react-icons/im";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      <div className="banner">
        <img src={Banner} alt="bannerimg" />
      </div>
      <div className="swiper__list">
        <div className="swiper__item">
          <NavLink to="/beneficiary">
            <div className="icon">
              <HiUserGroup />
            </div>
          </NavLink>
          <div className="content">Danh bạ</div>
        </div>
        <div className="swiper__item">
          <NavLink to="/beneficiary">
            <div className="icon">
              <MdTransferWithinAStation />
            </div>
          </NavLink>
          <div className="content">Chuyển tiền nội bộ</div>
        </div>
        <div className="swiper__item">
          <NavLink to="/beneficiary">
            <div className="icon">
              <MdTransferWithinAStation />
            </div>
          </NavLink>
          <div className="content">Chuyển tiền liên ngân hàng</div>
        </div>
        <div className="swiper__item">
          <NavLink to="/beneficiary">
            <div className="icon">
              <ImHistory />
            </div>
          </NavLink>
          <div className="content">Lịch sử giao dịch</div>
        </div>
        <div className="swiper__item">
          <NavLink to="/beneficiary">
            <div className="icon">
              <MdModelTraining />
            </div>
          </NavLink>
          <div className="content">Ghi nhợ</div>
        </div>
        <div className="swiper__item">
          <NavLink to="/beneficiary">
            <div className="icon">
              <MdOutlineRememberMe />
            </div>
          </NavLink>
          <div className="content">Nhặc nợ</div>
        </div>
        <div className="swiper__item">
          <NavLink to="/beneficiary">
            <div className="icon">
              <FaAmazonPay />
            </div>
          </NavLink>
          <div className="content">Thanh toán hóa đơn</div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
