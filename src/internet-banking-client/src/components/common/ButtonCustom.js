import { Button } from "antd";
import React from "react";

const ButtonCustom = ({ style, icon, text, onClick, isLine }) => {
  const onEvent = () => {
    onClick();
  };
  return (
    <div
      className={isLine ? "buttonCustom-line" : "buttonCustom"}
      onClick={onEvent}
    >
      <Button style={style} className="container">
        {icon ? <div className="icon">{icon}</div> : ""}
        {text}
      </Button>
    </div>
  );
};

export default ButtonCustom;
