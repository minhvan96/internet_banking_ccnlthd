import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
import "./style.scss";
import logo from "../../assets/images/logo.svg";
import { Input } from "antd";
import useAuth from "../../hooks/useAuth";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { logout, user } = useAuth();
  console.log(user);
  const handleSignOut = () => {
    logout();
  };

  return (
    <Layout hasSider className="cuslayout">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#041A1E",
          padding: "20px",
        }}
        width="330px"
      >
        <NavLink to="/" style={{ padding: 0 }}>
          <div className="cuslayout__logo">
            <img alt="logo" src={logo} />
          </div>
        </NavLink>
        <div className="menu">
          {pathname.includes("admin") && (
            <>
              <NavLink
                to="/admin/"
                style={{ padding: 0 }}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <div className="menu__item">
                  <div className="icon"></div>
                  <div className="content">Quản lý nhân viên</div>
                </div>
              </NavLink>

              <NavLink
                to="/admin/transaction-external-history"
                style={{ padding: 0 }}
              >
                <div className="menu__item">
                  <div className="icon"></div>
                  <div className="content">
                    Lịch sử giao dịch liên ngân hàng
                  </div>
                </div>
              </NavLink>
            </>
          )}
        </div>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 330,
          position: "relative",
          height: "100vh",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            width: "100%",
          }}
          className="cuslayout__header"
        >
          <NavLink to="/" style={{ padding: 0 }}>
            <div
              style={{
                maxWidth: "100%",
              }}
              className="left"
            >
              <img alt="logo" src={logo} />
            </div>
          </NavLink>
          <div
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
            className="right"
          >
            {/* <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 200, background: "#fff"}}
            /> */}
            <button
              onClick={handleSignOut}
              type="button"
              className="flex items-center justify-center px-4 font-bold text-white bg-gray-600 border border-gray-600 rounded hover:bg-transparent hover:text-gray-600"
            >
              <span className="mr-2">Logout</span>
              {/* <ExportOutlined /> */}
            </button>
          </div>
        </Header>
        <Content
          style={{
            padding: "64px 0 0 0",
            overflow: "initial",
            background: "#0F2026",
          }}
        >
          <div
            style={{
              padding: 0,
              textAlign: "center",
            }}
          >
            {/* <p>long content</p>
            {
              // indicates very long content
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? "more" : "..."}
                    <br />
                  </React.Fragment>
                )
              )
            } */}
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            height: "23px",
            margin: "0",
            padding: 0,
            position: "fixed",
            width: "100%",
            bottom: 0,
          }}
          className=""
        >
          <div>Ant Design ©2018 Created by Ant UED</div>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
