import React from "react";
import "./style.scss";
import Banner from "../../../assets/images/banner.jpg";
import { HiUserGroup } from "react-icons/hi";
import {
  MdTransferWithinAStation,
  MdOutlineRememberMe,
  MdModelTraining,
} from "react-icons/md";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { ImHistory } from "react-icons/im";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      <div className="banner">
        <img src={Banner} alt="bannerimg" />
      </div>
      <div className="swiper__list">
        <NavLink to="/beneficiary">
          <div className="swiper__item">
            <div className="icon">
              <HiUserGroup />
            </div>
            <div className="content">Danh bạ</div>
          </div>
        </NavLink>
        <NavLink to="/beneficiary">
          <div className="swiper__item">
            <div className="icon">
              <MdTransferWithinAStation />
            </div>
            <div className="content">Chuyển tiền nội bộ</div>
          </div>
        </NavLink>
        <NavLink to="/beneficiary">
          <div className="swiper__item">
            <div className="icon">
              <MdTransferWithinAStation />
            </div>
            <div className="content">Chuyển tiền liên ngân hàng</div>
          </div>
        </NavLink>
        <NavLink to="/beneficiary">
          <div className="swiper__item">
            <div className="icon">
              <ImHistory />
            </div>
            <div className="content">Lịch sử giao dịch</div>
          </div>
        </NavLink>
        <NavLink to="/beneficiary">
          <div className="swiper__item">
            <div className="icon">
              <MdModelTraining />
            </div>
            <div className="content">Ghi nhợ</div>
          </div>
        </NavLink>
        <NavLink to="/beneficiary">
          <div className="swiper__item">
            <div className="icon">
              <MdOutlineRememberMe />
            </div>
            <div className="content">Nhặc nợ</div>
          </div>
        </NavLink>
        <NavLink to="/closeaccount">
          <div className="swiper__item">
            <div className="icon">
              <MdOutlineCloseFullscreen />
            </div>
            <div className="content">Đóng tài khoản</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
export default HomePage;
