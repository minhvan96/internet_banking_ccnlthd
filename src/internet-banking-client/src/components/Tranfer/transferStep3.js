import React, { useEffect, useState } from "react";
import "./style.scss";
import ButtonCustom from "../common/ButtonCustom";
import { AiFillCheckCircle } from "react-icons/ai";
import { message } from "antd";
import { bankInternalTransactionTranferbyId } from "../../apis/transactionTransfer";
import { convertCurrentcy } from "../../utils/common";
import BeneficiaryCreate from "../Beneficiary/BeneficiaryCreate";
import { addInternalBeneficiary } from "../../apis/beneficiaryApi";
import ModelCustom from "../common/ModalCustom";
import { BsPlusLg } from "react-icons/bs";

const styleButton = { width: "100%", height: "44px" };
const TransferStep3 = ({ isInternalTransfer, bankTransactionId, nextStep }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionCurrent, setTransactionCurrent] = useState({});
  const [messageApi] = message.useMessage();
  useEffect(() => {
    const fetch = async () => {
      const dataAPI = await bankInternalTransactionTranferbyId(
        bankTransactionId
      );
      if (dataAPI) setTransactionCurrent(dataAPI);
    };

    fetch();
  }, []);

  const saveBeneficiary = async () => {
    if (transactionCurrent) {
      const result = await addInternalBeneficiary(transactionCurrent, transactionCurrent?.transferToAccount);
      if(result){
        messageApi.open({
          "type": "success",
          content: "Thêm thành công"
        })
        hideModal();
      }
      else{
        messageApi.open({
          "type": "error",
          content: "Thêm không thành công!"
        })
      }
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="tranferStep3">
      <div
        className="transfer__item transfer__item-step2--info"
        style={{ marginTop: "30px" }}
      >
        <div className="transfer-success">
          <div className="icon">
            <AiFillCheckCircle />
          </div>
          <div className="message">GIAO DỊCH THÀNH CÔNG</div>
          <div className="money">
            {" "}
            {convertCurrentcy(transactionCurrent?.transferAmount)} VND
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Tài khoản thụ hưởng</div>
          <div className="step2__value">
            {transactionCurrent?.transferToAccount}
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Tên người thụ hưởng</div>
          <div className="step2__value step2__value-highlight">
            DINH THANH PHU
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Ngân hàng thụ hưởng</div>
          <div className="step2__value">
            Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)
          </div>
        </div>
        <div className="group group-style">
          <div className="step2__label">Nội dụng</div>
          <div className="step2__value">{transactionCurrent?.description}</div>
        </div>
      </div>
      <div className="transfer__bottom transfer__bottom-flex">
        <div className="btn-save">
          <ButtonCustom
            style={styleButton}
            isLine={true}
            text="Lưu danh bạ thụ hưởng"
            onClick={showModal}
          />
        </div>
        <div className="btn-redirect">
          <ButtonCustom style={styleButton} text="Thực hiện giao dịch mới" />
        </div>
      </div>
      <ModelCustom
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Thêm mới"
      >
        <BeneficiaryCreate
          accountNumber={transactionCurrent?.transferToAccount}
          alias={transactionCurrent?.transferToBeneficiary}
          isInternal={true}
        >
          <div className="footer">
            <div className="btn__cancel">
              <ButtonCustom
                isLine={true}
                style={{ width: "100%", height: "45px" }}
                text="Hủy"
                icon={<BsPlusLg />}
                onClick={hideModal}
              />
            </div>
            <div className="btn__submit">
              <ButtonCustom
                style={{ width: "100%", height: "45px" }}
                text="Thêm mới"
                icon={<BsPlusLg />}
                onClick={saveBeneficiary}
              />
            </div>
          </div>
        </BeneficiaryCreate>
      </ModelCustom>
    </div>
  );
};

export default TransferStep3;
