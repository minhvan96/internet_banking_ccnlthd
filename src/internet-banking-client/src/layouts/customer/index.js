import React from "react";
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
import { Layout, Menu, theme } from "antd";
import "./style.scss";
import Avatar from "../../assets/images/carmel.jpg";
import logo from "../../assets/images/logo.svg";
import CardLayout from "../../components/card/LayoutCard";

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

function CustomerLayout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
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
        <div className="logo">
          <img alt="logo" src={logo} />
        </div>
        <CardLayout>
          <div className="acc__card">
            <div className="avatar">
              <img alt="avatar" src={Avatar} />
            </div>
            <div className="wellcome">Xin chào</div>
            <div className="accname">
              <h2>NGUYEN HIEU NGHIA</h2>
            </div>
          </div>
        </CardLayout>

        <CardLayout>
          <div className="accinfo__card">
            <div className="card__row">
              <div className="left">Danh sách tài khoản/thẻ</div>
              <div className="right">Chi tiết</div>
            </div>
            <div className="card__row">
              <div className="left">
                <div className="top">Tài khoản thanh toán</div>
                <div className="bottom">1017332621</div>
              </div>
              <div className="right">Chi tiết</div>
            </div>
            <div className="card__row">
              <div className="left">
                <div className="top">Số dư</div>
                <div className="bottom">1017332621</div>
              </div>
              <div className="right">Chi tiết</div>
            </div>
          </div>
        </CardLayout>
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        /> */}
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 330,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <p>long content</p>
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
            }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default CustomerLayout;
