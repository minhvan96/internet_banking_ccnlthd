import React from "react";
import  {Modal } from "antd";

const ModelCustom = ({ isModalOpen, setIsModalOpen, title, children }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        className="modal-custom"
        style={{ width: "480px" }}
        footer={""}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModelCustom;
