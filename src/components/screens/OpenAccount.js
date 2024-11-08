import { useState } from "react";

function OpenAccount({ dispatchData, dispatchScreen, currFormat }) {
  const [depAmount, setDepAmount] = useState(500);
  const [disabled, setDisabled] = useState(false);

  return (
    <form id="open-acct_form">
      <h3>Open Account</h3>
      <div>
        <p>Minimum initial deposit required: $500 </p>
        <p>or enter another amount below:</p>
        <input
          type="text"
          placeholder="your deposit amount"
          onChange={(e) => {
            setDepAmount(e.target.value < 1 ? "" : Number(e.target.value));
            setDisabled(
              e.target.value === "" || e.target.value >= 500 ? false : true
            );
          }}
        />
      </div>
      {depAmount < 500 ? (
        <p>Minimum deposit $500 </p>
      ) : (
        <p>Initial deposit: {currFormat(depAmount)}</p>
      )}
      <div>
        <button
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            dispatchData({ type: "OPENACCOUNT", payload: depAmount });
            dispatchScreen({ type: "ACTIVESCREEN", payload: "deposits" });
            dispatchScreen({ type: "ISACTIVE", payload: false });
          }}
        >
          Open account
        </button>
      </div>
    </form>
  );
}

export default OpenAccount;
