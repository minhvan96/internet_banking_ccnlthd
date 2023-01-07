import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Form, message, Row, Select } from "antd";
import InputSearch from "../common/InputSearch";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import ModelCustom from "../common/ModalCustom";
import EmployeeItem from "./EmployeeItem";
import CreateEmployee from "./CreateEmployee";
import { getAllEmployee } from "../../apis/administratorApi";

const styleButton = { width: "100%", height: "100%" };

function EmployeeList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [employeeList, setEmployeeList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetch = async () => {
      const internalemployee = await getAllEmployee();
      setEmployeeList(internalemployee);
    };
    fetch();
  }, []);

  console.log("render; ", employeeList);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="employeeList">
      {contextHolder}
      <div className="employeeList__searchgroup">
        <Row gutter={[8, 16]}>
          <Col span={20}>
            <InputSearch />
          </Col>
          <Col span={4}>
            <ButtonCustom
              style={styleButton}
              text="Thêm mới"
              icon={<BsPlusLg />}
              onClick={showModal}
            />
            <ModelCustom
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              title="Thêm mới"
            >
              <CreateEmployee
                hideModal={hideModal}
                setEmployeeList={setEmployeeList}
              />
            </ModelCustom>
          </Col>
        </Row>
      </div>
      <div className="employeeList__group">
        {employeeList &&
          employeeList.length &&
          employeeList.map((item, index) => (
            <EmployeeItem
              nonumber={index + 1}
              key={index}
              employee={item}
              setEmployeeList={setEmployeeList}
            />
          ))}
        <div className="footer">
          <div className="showCount">
            Hiển thị
            <Select
              defaultValue="10"
              style={{
                width: 80,
              }}
              className="select-box"
              // onChange={handleChange}
              options={[
                {
                  value: "20",
                  label: "20",
                },
                {
                  value: "50",
                  label: "50",
                },
                {
                  value: "100",
                  label: "100",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployeeList;
