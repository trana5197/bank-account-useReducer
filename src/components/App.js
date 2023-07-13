import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  loanTaken: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: !state.isActive };

    case "deposit":
      return { ...state, balance: state.balance + action.payload };

    case "withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "getLoan":
      return {
        ...state,
        loanTaken: true,
        balance: state.balance + (state.loanTaken ? 0 : action.payload),
        loan: state.loan + (state.loanTaken ? 0 : action.payload),
      };

    case "payLoan":
      return {
        ...state,
        loanTaken: false,
        balance: state.balance - (!state.loanTaken ? 0 : action.payload),
        loan: state.loan - (!state.loanTaken ? 0 : action.payload),
      };

    case "closeAccount":
      return {
        ...(state.balance === 0 && !state.loanTaken ? initialState : state),
      };

    default:
      return "Unknow action";
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="app">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "getLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
