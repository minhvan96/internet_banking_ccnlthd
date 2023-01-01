import React from "react";
import  {Modal } from "antd";

const ModelCustom = ({ isModalOpen, setIsModalOpen, title, children }) => {
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        className="modal-custom"
        style={{ width: "480px" }}
        footer={""}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModelCustom;
