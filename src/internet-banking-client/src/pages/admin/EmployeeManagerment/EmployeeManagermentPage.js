import React from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import EmployeeList from "../../../components/Employee/EmployeeList";
import "./style.scss";

const EmployeeManagermentPage = () => {
  const breakcrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "Quản lý nhân viên",
      url: "",
    },
  ];
  const separator = ">";
  return (
    <div className="employee">
      {/* heaer */}
      <h2 className="employee__header">Quản lý nhân viên</h2>
      {/* breakcrumb */}
      <BreakCrumbCommon data={breakcrumbData} separator={separator} />
      <EmployeeList />
    </div>
  );
};
export default EmployeeManagermentPage;
