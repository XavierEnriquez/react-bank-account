import { useState } from "react";

function Withdraw({ balance, dispatchData, dispatchScreen, currFormat }) {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [disabled, setDisabled] = useState(true);
  return (
    <div>
      <form id="withdrawal_form">
        <h3>Withdrawals</h3>
        {balance === 0 ? (
          <div>
            <p>
              Your account balance is <span>{currFormat(balance)}</span>
            </p>
            <div className="btn-group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatchScreen({ type: "ACTIVESCREEN", payload: "deposits" });
                }}
              >
                Make a deposit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatchScreen({ type: "ACTIVESCREEN", payload: "loans" });
                }}
              >
                Request a loan
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p>New withdrawal</p>
              <input
                value={withdrawAmount}
                type="text"
                placeholder="Enter withdraw amount"
                onChange={(e) => {
                  setWithdrawAmount(
                    e.target.value < 1 ? "" : Number(e.target.value)
                  );
                  setDisabled(e.target.value < 1 ? true : false);
                }}
              />
            </div>
            {withdrawAmount < 1 ? (
              <p>Minimum amount $1.00 </p>
            ) : withdrawAmount > balance ? (
              <p>Amount requested exceeds account balance!</p>
            ) : (
              <p>Withdrawal amount: {currFormat(withdrawAmount)}</p>
            )}
            {balance < withdrawAmount ? (
              <div>
                <p>If you need more funds </p>
                <button
                  disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatchScreen({ type: "ACTIVESCREEN", payload: "loans" });
                  }}
                >
                  Request a loan
                </button>
              </div>
            ) : (
              <div>
                <button
                  disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatchData({ type: "WITHDRAW", payload: withdrawAmount });
                    setWithdrawAmount("");
                    setDisabled(true);
                  }}
                >
                  Confirm withdraw
                </button>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default Withdraw;
