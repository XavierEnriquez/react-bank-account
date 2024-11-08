import { useReducer } from "react";

import "../App.css";
import Main from "./Main";
import Header from "./Header";
import PanelsWrapper from "./PanelsWrapper";
import MenuPanel from "./MenuPanel";
import DataPanel from "./DataPanel";
import Loader from "./Loader";
import Error from "./Error";
import Dashboard from "./screens/Dashboard";
import Deposit from "./screens/Deposit";
import Withdraw from "./screens/Withdraw";
import Loans from "./screens/Loans";
import Payments from "./screens/Payments";
import OpenAccount from "./screens/OpenAccount";
import CloseAccount from "./screens/CloseAccount";

const initialState = {
  activeScreen: "loading",
  balance: 0,
  deposit: 0,
  deposits: [],
  withdraw: 0,
  withdrawals: [],
  loan: 0,
  loanIds: [],
  loanAmounts: [],
  isActive: true,
  fetchData: "accounts",
};

function screenReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...initialState };
    case "DATASUCCESS":
      return { ...state, activeScreen: "dashboard" };
    case "DATAFAIL":
      return { ...state, activeScreen: "error" };
    case "ACTIVESCREEN":
      return { ...state, activeScreen: action.payload };
    case "ISACTIVE":
      return { ...state, isActive: action.payload };
    default:
      throw new Error("Action unknown");
  }
}
function dataReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...initialState };
    case "DATASUCCESS":
      return {
        ...state,
        balance: action.payload[0].balance,
        loans: action.payload[0].loans,
      };
    case "LOANAMOUNTS":
      return {
        ...state,
        fetchData: "loans",
      };
    case "OPENACCOUNT":
      return {
        ...state,
        balance: action.payload,
        isActive: true,
      };
    case "CLOSEACCOUNT":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.payload };
    case "WITHDRAW":
      return { ...state, balance: state.balance - action.payload };
    case "LOANREQUEST":
      // if (state.loan > 0) return state;
      return {
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      };
    case "LOANPAYMENT":
      return {
        ...state,
        loan: state.loan - action.payload,
        balance: state.balance - action.payload,
      };

    case "ISACTIVE":
      return { ...state, isActive: false };
    default:
      throw new Error("Action unknown");
  }
}

const currencyFormat = function (num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

function App() {
  const [{ balance, loan, deposit }, dispatchData] = useReducer(
    dataReducer,
    initialState
  );
  const [{ isActive, activeScreen }, dispatchScreen] = useReducer(
    screenReducer,
    initialState
  );

  // useEffect(() => {
  //   async function getAccounts(db) {
  //     try {
  //       if (!db) return;
  //       dispatchScreen({ type: "ACTIVESCREEN", payload: "loading" });
  //       const response = await fetch(`http://localhost:8000/${db}`);
  //       if (!response.ok) throw new Error();
  //       const data = await response.json();
  //       console.log(data);
  //       dispatchData({ type: "DATASUCCESS", payload: data });
  //       dispatchScreen({ type: "ACTIVESCREEN", payload: "dashboard" });
  //     } catch (error) {
  //       dispatchScreen({ type: "DATAFAIL" });
  //     }
  //   }
  //   getAccounts(fetchData);
  // }, [fetchData]);

  return (
    <div className="App">
      <Header />
      <Main children>
        <PanelsWrapper>
          <MenuPanel dispatch={dispatchScreen} isActive={isActive} />
          <DataPanel>
            {activeScreen === "loading" ? (
              <Loader />
            ) : (
              <Dashboard
                balance={balance}
                loans={loan}
                currFormat={currencyFormat}
              />
            )}
            {activeScreen === "error" && <Error />}

            {/* {activeScreen === "dashboard" && <Dashboard balance={balance} />} */}
            {activeScreen === "deposits" && (
              <Deposit
                dispatchData={dispatchData}
                currFormat={currencyFormat}
              />
            )}
            {activeScreen === "withdrawals" && (
              <Withdraw
                balance={balance}
                dispatchData={dispatchData}
                dispatchScreen={dispatchScreen}
                currFormat={currencyFormat}
              />
            )}
            {activeScreen === "loans" && (
              <Loans
                loans={loan}
                dispatchData={dispatchData}
                dispatchScreen={dispatchScreen}
                currFormat={currencyFormat}
              />
            )}
            {activeScreen === "payments" && (
              <Payments
                balance={balance}
                loan={loan}
                dispatchData={dispatchData}
                dispatchScreen={dispatchScreen}
                currFormat={currencyFormat}
              />
            )}
            {activeScreen === "open" && (
              <OpenAccount
                deposit={deposit}
                dispatchData={dispatchData}
                dispatchScreen={dispatchScreen}
                currFormat={currencyFormat}
              />
            )}
            {activeScreen === "close" && (
              <CloseAccount
                balance={balance}
                loan={loan}
                dispatchData={dispatchData}
                currFormat={currencyFormat}
              />
            )}
          </DataPanel>
        </PanelsWrapper>
      </Main>
    </div>
  );
}

export default App;

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/
