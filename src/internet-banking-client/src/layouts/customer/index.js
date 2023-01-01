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
import { Input, Space } from "antd";

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

function CustomerLayout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => console.log(value);
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
        <div className="cuslayout__logo">
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
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 330,
          position: 'relative',
          height: '100vh'
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="cuslayout__header"
        >
          <div className="left">
            <img alt="logo" src={logo} />
          </div>
          <div className="right">
            {/* <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 200, background: "#fff"}}
            /> */}
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
            position: 'absolute',
            width: '100%',
            bottom: 0
          }}
          className=""
        >
          <div>Ant Design ©2018 Created by Ant UED</div>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default CustomerLayout;
