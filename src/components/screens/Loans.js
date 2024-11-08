import { useState } from "react";

function Loans({ loans, dispatchData, currFormat }) {
  const [loanAmount, setLoanAmount] = useState(500);
  const [disabled, setDisabled] = useState(false);
  return (
    <form id="loans_form">
      <h3>Loans</h3>
      <div>
        <p>Request the minimum loan amount: $500.00 </p>
        <p>or enter an amount below:</p>
        <input
          type="text"
          placeholder="Enter loan amount"
          onChange={(e) => {
            setLoanAmount(e.target.value < 1 ? "" : Number(e.target.value));
            setDisabled(
              e.target.value === "" || e.target.value >= 500 ? false : true
            );
          }}
        />
      </div>

      {loanAmount < 500 ? (
        <p>Minimum loan request $500 </p>
      ) : (
        <p>Loan amount requested: ${currFormat(loanAmount)}</p>
      )}
      <div>
        <button
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            dispatchData({ type: "LOANREQUEST", payload: loanAmount });
            setLoanAmount(500);
          }}
        >
          Request loan
        </button>
      </div>
    </form>
  );
}

export default Loans;
