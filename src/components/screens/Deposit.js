import { useState } from "react";

function Deposit({ dispatchData, currFormat }) {
  const [depAmount, setDepAmount] = useState("");
  const [disabled, setDisabled] = useState(true);
  return (
    <form id="deposits_form">
      <h3>Deposits</h3>
      <div>
        <p>New deposit</p>
        <input
          value={depAmount}
          type="text"
          placeholder="Enter deposit amount"
          onChange={(e) => {
            setDepAmount(e.target.value < 1 ? "" : Number(e.target.value));
            setDisabled(e.target.value < 1 ? true : false);
          }}
        />
      </div>
      {depAmount < 1 ? (
        <p>Minimum deposit $1 </p>
      ) : (
        <p>Deposit amount: {currFormat(depAmount)}</p>
      )}
      <div>
        <button
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            dispatchData({ type: "DEPOSIT", payload: depAmount });
            setDepAmount("");
            setDisabled(true);
          }}
        >
          Confirm deposit
        </button>
      </div>
    </form>
  );
}

export default Deposit;
