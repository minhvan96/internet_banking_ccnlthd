import React from "react";
import "./style.scss";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import DebtReminderList from "../../../components/DebtReminders/DebtReminderList";

function DebtReminder() {
  const breakcrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "Danh sách nợ",
      url: "",
    },
  ];
  const separator = ">";

  return (
    <div className="debt">
      {/* heaer */}
      <h2 className="debt__header">Danh sách nợ</h2>
      {/* breakcrumb */}
      <BreakCrumbCommon data={breakcrumbData} separator={separator} />
      < DebtReminderList/>
    </div>
  );
}
export default DebtReminder;
