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
