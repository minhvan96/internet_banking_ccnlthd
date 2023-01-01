import { Button } from "antd";
import React from "react";

const ButtonCustom = ({ style, icon, text }) => {
  return (
    <div className="buttonCustom">
      <Button style={style} className="container">
        {" "}
        {icon ? <div className="icon">{icon}</div> : ""}
        {text}
      </Button>
    </div>
  );
};

export default ButtonCustom;
