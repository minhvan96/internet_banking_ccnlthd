import React from "react";
import "./style.scss";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// data format:
    // displayName: string
    // url: string
// separator: string

function BreakCrumbCommon({ data, separator }) {
  const breakcrumbItem =
    data &&
    data.map((item, ind) => (
      <Breadcrumb.Item key={ind}>
        {ind + 1 < data.length ? (
          <Link to={item.url}>{item.displayName}</Link>
        ) : (
          item.displayName
        )}
      </Breadcrumb.Item>
    ));
  return (
    <Breadcrumb separator={separator} className="breakcrumb">
      {breakcrumbItem}
    </Breadcrumb>
  );
}

export default BreakCrumbCommon;
