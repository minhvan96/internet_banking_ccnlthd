import React from "react";
import "./style.scss";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import BeneficiaryList from "../../../components/Beneficiary/BeneficiaryList";

function Beneficiary() {
  const breakcrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "Danh bạ hưởng thị",
      url: "",
    },
  ];
  const separator = ">";
  return (
    <div className="beneficiary">
      {/* heaer */}
      <h2 className="beneficiary__header">Danh bạ hưởng thụ</h2>
      {/* breakcrumb */}
      <BreakCrumbCommon data={breakcrumbData} separator={separator} />
      <BeneficiaryList />
    </div>
  );
}
export default Beneficiary;
