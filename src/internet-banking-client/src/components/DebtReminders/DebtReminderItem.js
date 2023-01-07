import { Form, Input, List, Modal, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import apiInstance from "../../apis/config";
import {
  postPaymentDebt,
  accessPaymentDebt,
} from "../../apis/debt";
import "./style.scss";
import Swal from 'sweetalert2'

const { confirm } = Modal;
function DebtReminderItem({ nonumber, debt, setDebtList, statusList }) {

  useEffect(() => {
    console.log(debt);
  })

  const handlePayment = async (event) => {
    event.preventDefault();

    const transactionId = event.currentTarget.id;
    const data = await postPaymentDebt(parseInt(transactionId));
    console.log("🚀 ~ file: DebtReminderItem.js:23 ~ handlePayment ~ data", data)

    if (data) {
      await Swal.fire({
        title: 'Kiểm tra thông tin',
        text: `Số tài khoản/sđt: ${data.loanAccount.accountNumber } ; Số tiền: ${data.transferAmount}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5fb621',
        cancelButtonColor: '#fc3d03',
        confirmButtonText: 'Trả nợ',
        cancelButtonText: 'Hủy'
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire({
            title: 'Kiểm tra mail và điền mã code',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonColor: '#5fb621',
            cancelButtonColor: '#fc3d03',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            showLoaderOnConfirm: true,
            preConfirm: async (codeId) => {
              // return fetch(`//api.github.com/users/${login}`)
              //   .then(response => {
              //     if (!response.ok) {
              //       throw new Error(response.statusText)
              //     }
              //     return response.json()
              //   })
              //   .catch(error => {
              //     Swal.showValidationMessage(
              //       `Request failed: ${error}`
              //     )
              //   })
              // const code = parseInt(codeId);
              // console.log(transactionId);
              // console.log(code);
              // return apiInstance.post('debt-management/debt-payment', { transactionId, code }).then(response => {
              //   if (!response.ok) {
              //     throw new Error(response.statusText)
              //   }
              //   return response.json()
              // })
              // .catch(error => {
              //     Swal.showValidationMessage(
              //       `lỗi không đúng mã code hoặc tài khoản không đủ tiền : Request failed: ${error}`
              //     )
              //   })
              try {
                const code = parseInt(codeId);
                const check = await accessPaymentDebt(transactionId, code);

                if (!check) {
                  Swal.showValidationMessage(
                    'lỗi không đúng mã code hoặc tài khoản không đủ tiền'
                  )
                }
                return check;
              } catch (error) {
                Swal.showValidationMessage(
                  `Error: ' + error.message`
                )
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thanh toán thành công',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }

      })
    }
    else {
      alert('data empty')
    }
  }

  return (
    <div className="DebtReminderList__item">
      <div className="no-box">{nonumber}</div>
      <div className="content">
        <h4> {debt.accnumer} </h4>
        <div className="cardnumber">{debt.accnumber}</div>
        <div className="cardnumber">Số tiền nợ: {debt.amount}</div>
        <div className="note">Ghi chú: {debt.description}</div>
        <div className="note">
          Dịch vụ: Cho mượn nợ/thanh toán nợ
        </div>
      </div>
      <div className="status">
        {debt.isPaid === false && (statusList === '' || statusList === 'list-Debt') &&
          <button id={debt.id} onClick={handlePayment}>
            Thanh toán
          </button>
        }
        {debt.isPaid === true &&
          <p id={debt.id} >Đã thanh toán</p>
        }
        {debt.isPaid === false && statusList === 'list-Debt-Remender' &&
          <button id={debt.id}>
            Chưa thanh toán
          </button>
        }
      </div>

    </div>
  );
}
export default DebtReminderItem;
