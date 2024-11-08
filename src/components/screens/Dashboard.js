// import { useEffect, useState } from "react";

function Dashboard({ balance, loans, currFormat }) {
  return (
    <div className="dashboard">
      <div className="dashboard_data_wrapper">
        <p>
          Balance: <span className="currency_span">{currFormat(balance)}</span>
        </p>
      </div>
      <div className="dashboard_data_wrapper">
        <p>
          Loans: <span className="currency_span">{currFormat(loans)}</span>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
