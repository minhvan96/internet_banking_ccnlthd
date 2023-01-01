import { Input } from "antd";
import React from "react";
import { CiSearch } from "react-icons/ci";

const InputSearch = () => {
  return (
    <div className="inputSeach">
      <div className="icon">
        <CiSearch />
      </div>
      <Input placeholder="Search" className="input" />
    </div>
  )
};

export default InputSearch;
