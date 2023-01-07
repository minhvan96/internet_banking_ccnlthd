import React, { useState, useEffect } from "react";
import "./style.scss";
import { Col, Form, Input, message, Row, Select } from "antd";
import InputSearch from "../common/InputSearch";
import ButtonCustom from "../common/ButtonCustom";
import { BsPlusLg } from "react-icons/bs";
import ModelCustom from "../common/ModalCustom";
import EmployeeItem from "./EmployeeItem";
import CreateEmployee from "./CreateEmployee";
// import {
//   addInternalemployee,
//   getExternalemployee,
//   getInternalemployee,
// } from "../../apis/employeeApi";

const styleButton = { width: "100%", height: "100%" };

function EmployeeList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [employeeList, setEmployeeList] = useState([]);
  const [form] = Form.useForm();

  // const fetch = async () => {
  //   const internalemployee = await getInternalemployee();
  //   // const externalemployee = await getExternalemployee();
  //   let employeeMap;
  //   employeeMap = internalemployee.map((x) => {
  //     return {
  //       id: x?.id,
  //       accountNumber: x?.accountNumber,
  //       alias: x?.alias,
  //       type: "Nội bộ",
  //     };
  //   });
  //   // employeeMap = [
  //   //   ...employeeMap,
  //   //   ...externalemployee.map((x) => {
  //   //     return {
  //   //       id: x?.id,
  //   //       accountNumber: x?.accountNumber,
  //   //       alias: x?.alias,
  //   //     };
  //   //   }),
  //   // ];
  //   setEmployeeList(employeeMap);
  // };

  // useEffect(() => {
  //   fetch();
  // }, []);

  const successMessage = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const addemployee = async () => {
    const formSubmit = form.getFieldsValue();
    console.log(formSubmit);
    let result;
    if (formSubmit.bankType === "Nội bộ") {
      // setEmployeeList([
      //   ...employeeList,
      //   {
      //     accountNumber: result?.accountNumber,
      //     alias: result.alias,
      //     type: "Nội bộ",
      //   },
      // ]);
    }
    form.setFieldValue({});
    successMessage("Thêm người hưởng thụ thành công!");
    hideModal();
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
              <CreateEmployee hideModal={hideModal} />
            </ModelCustom>
          </Col>
        </Row>
      </div>
      <div className="employeeList__group">
        {/* {employeeList &&
          employeeList.length &&
          employeeList.map((item, index) => (
            <EmployeeItem
              nonumber={index + 1}
              key={index}
              employee={item}
              setEmployeeList={setEmployeeList}
            />
          ))} */}

        <EmployeeItem
          nonumber={1}
          key={1}
          employee={employeeList}
          setemployeeList={setEmployeeList}
        />
        <EmployeeItem
          nonumber={1}
          key={1}
          employee={null}
          setemployeeList={setEmployeeList}
        />
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
