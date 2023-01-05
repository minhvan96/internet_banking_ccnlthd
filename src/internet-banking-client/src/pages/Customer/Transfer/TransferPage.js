import React, { useState } from "react";
import BreakCrumbCommon from "../../../components/common/BreakCrumb";
import "./style.scss";
import TransferStep1 from "../../../components/Tranfer/transferStep1";
import TransferStep2 from "../../../components/Tranfer/transferStep2";
import TransferStep3 from "../../../components/Tranfer/transferStep3";
import useAuth from "../../../hooks/useAuth";

const styleButton = { width: "100%", height: "44px" };
const TransferPage = ({ isInternalTransfer }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(3);
  const [bankTransactionId, setBankTransactionId] = useState(1);

  const breakcrumbData = [
    {
      displayName: "Trang chủ",
      url: "/",
    },
    {
      displayName: "CHuyển tiền trong hệ thống",
      url: "",
    },
  ];
  const separator = ">";

  const renderStep = () => {
    if (currentStep === 1)
      return <TransferStep1 isInternalTransfer={isInternalTransfer} />;
    else if ((currentStep = 2)) return <TransferStep2 />;
    else return <TransferStep3 />;
  };

  const nextStep = (stepNum, bankId) => {
    setBankTransactionId(bankId);
    setCurrentStep(stepNum);
  };
  return (
    <div className="transfer">
      {/* heaer */}
      <h2 className="transfer__header">Chuyển tiền trong hệ thống</h2>
      {/* breakcrumb */}
      <BreakCrumbCommon data={breakcrumbData} separator={separator} />

      {currentStep === 1 ? (
        <TransferStep1
          isInternalTransfer={isInternalTransfer}
          currentUser={user}
          nextStep={nextStep}
        />
      ) : currentStep === 2 ? (
        <TransferStep2
          bankTransactionId={bankTransactionId}
          currentUser={user}
          isInternalTransfer={isInternalTransfer}
          nextStep={nextStep}
        />
      ) : (
        <TransferStep3
          bankTransactionId={bankTransactionId}
          isInternalTransfer={isInternalTransfer}
          nextStep={nextStep}
        />
      )}
    </div>
  );
};

export default TransferPage;
