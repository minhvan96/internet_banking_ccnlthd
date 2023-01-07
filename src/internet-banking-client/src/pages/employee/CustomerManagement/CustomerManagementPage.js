import React from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import CustomerList from "../../../components/Customer/CustomerList";
import "./style.scss";

const CustomerManagementPage = () => {
  const breakCrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "Quản lý khách hàng",
      url: "",
    },
  ];
  const separator = ">";
  return (
    <div className="employee">
      <h2 className="employee__header">Quản lý khách hàng</h2>
      <BreakCrumbCommon data={breakCrumbData} separator={separator}/>
      <CustomerList/>
    </div>
  );
};
export default CustomerManagementPage;
