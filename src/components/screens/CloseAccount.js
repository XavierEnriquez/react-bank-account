function CloseAccount({ balance, loan, dispatchData, currFormat }) {
  return (
    <div>
      <form id="close-acct_form">
        <h3>Close Account</h3>
        {!balance & !loan ? (
          <div>
            <p>Are you sure you want to close your account?</p>
          </div>
        ) : (
          <div>
            <p>To close account:</p>
          </div>
        )}
        {loan > balance ? (
          <>
            <p>
              Deposit: <span>{currFormat(loan - balance)}</span> to payoff loans
            </p>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatchData({ type: "DEPOSIT", payload: loan - balance });
                }}
              >
                Deposit amount
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {(loan > 0) & (loan <= balance) ? (
          <>
            <p>
              Payoff loans: <span>{currFormat(loan)}</span>{" "}
            </p>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatchData({ type: "LOANPAYMENT", payload: loan });
                }}
              >
                Confirm loan payoff
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {(balance > 0) & !loan ? (
          <>
            <p>
              Withdraw remaining account balance:{" "}
              <span>{currFormat(balance)}</span>
            </p>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatchData({ type: "WITHDRAW", payload: balance });
                }}
              >
                Withdraw balance
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {(balance === 0) & (loan === 0) ? (
          <div>
            <button
              onClick={(e) => {
                dispatchData({ type: "RESET" });
              }}
            >
              Yes, close account
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default CloseAccount;
