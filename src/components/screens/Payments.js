import { useState } from "react";

function Payments({ balance, loan, dispatchScreen, dispatchData, currFormat }) {
  /**minimun payment is 3% of loan or 1, or if loan less than 1 then loan */
  const minPayment =
    Math.ceil(loan * 3) / 100 > 1
      ? Math.ceil(loan * 3) / 100
      : 1 < loan
      ? 1
      : loan;

  const [paymentAmount, setPaymentAmount] = useState("");
  const [disabled, setDisabled] = useState(false);
  console.log(minPayment, Number(paymentAmount).toFixed(2), balance);

  return (
    <form id="payments_form">
      <h3>Payments</h3>
      {/** if there is a loan  => show payment input, button, messages  */}
      {loan > 0 && (
        <>
          <p>
            Loan balance: <span>{currFormat(loan)}</span>
          </p>
          {/** if balance equals 0.00 => show message, deposit button, loans button */}
          {balance === 0 && (
            <div>
              <p>
                Your account balance is: <span>{currFormat(balance)}</span>
              </p>
              <div className="btn-group">
                <button
                  onClick={(e) => {
                    dispatchScreen({
                      type: "ACTIVESCREEN",
                      payload: "deposits",
                    });
                  }}
                >
                  Make a deposit
                </button>
                <button
                  onClick={(e) => {
                    dispatchScreen({
                      type: "ACTIVESCREEN",
                      payload: "loans",
                    });
                  }}
                >
                  Request a loan
                </button>
              </div>
            </div>
          )}
          {/* if account balance is higher than 0.00 => show payment input, warning messages, payment button */}
          {balance > 0 && (
            <>
              <div>
                <p>
                  Pay minimum required: <span>{currFormat(minPayment)}</span>
                </p>
                <p>or enter your payment amount below</p>
                <input
                  value={paymentAmount}
                  type="text"
                  placeholder="Enter payment amount"
                  onChange={(e) => {
                    setPaymentAmount(e.target.value);
                    setDisabled(
                      (e.target.value <= loan) &
                        (e.target.value <= balance) &
                        (e.target.value >= minPayment) || e.target.value === ""
                        ? false
                        : true
                    );
                  }}
                />
              </div>
              {/**show messages depending on balance, loan, and payment variables */}
              {paymentAmount > loan && (
                <p>Can't pay more than the loan balance</p>
              )}
              {paymentAmount > balance || balance < minPayment ? (
                <p>You don't have enough funds for payment</p>
              ) : (
                ""
              )}
              {(paymentAmount <= balance) &
              (paymentAmount <= loan) &
              (paymentAmount > minPayment) ? (
                <p>Your payment amount {currFormat(Number(paymentAmount))}</p>
              ) : (
                ""
              )}
              {(minPayment <= balance) &
              (paymentAmount <= loan) &
              (paymentAmount <= minPayment) ? (
                <p>Minimum payment amount is: {currFormat(minPayment)}</p>
              ) : (
                ""
              )}
              <div>
                {/*if balance has sufficient funds show payment button else show deposit and loan buttons  */}
                {balance >= minPayment && balance >= paymentAmount ? (
                  <button
                    disabled={disabled}
                    onClick={(e) => {
                      e.preventDefault();
                      if (balance < 1) return;
                      dispatchData({
                        type: "LOANPAYMENT",
                        payload:
                          paymentAmount > minPayment
                            ? paymentAmount
                            : minPayment,
                      });
                      setPaymentAmount("");
                    }}
                  >
                    Confirm payment
                  </button>
                ) : (
                  <div className="btn-group">
                    <button
                      onClick={(e) => {
                        dispatchScreen({
                          type: "ACTIVESCREEN",
                          payload: "deposits",
                        });
                      }}
                    >
                      Make a deposit
                    </button>
                    <button
                      onClick={(e) => {
                        dispatchScreen({
                          type: "ACTIVESCREEN",
                          payload: "loans",
                        });
                      }}
                    >
                      Request a loan
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      {/*if there is no loan => show no loan warning message*/}
      {!loan && (
        <>
          <p>You don't have a loan</p>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatchScreen({
                  type: "ACTIVESCREEN",
                  payload: "loans",
                });
              }}
            >
              Request a loan
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default Payments;
