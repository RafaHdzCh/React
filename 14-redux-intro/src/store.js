import {legacy_createStore as createStore} from "redux";

const initialState = 
{
  balance: 0,
  loan: 0,
  loanPurpose: ""
}

function reducer(state = initialState, action) 
{
  switch(action.type)
  {
    case "account/deposit": return {
      ...state, 
      balance: state.balance + action.payload
    };

    case "account/withdraw": 
    return {
      ...state, balance: state.balance - action.payload
    };

    case "account/requestLoan": 
    return state.loan > 0 ? state : {
      ...state, loan: 
      action.payload.amount, 
      loanPurpose:action.payload.purpose, 
      balance: state.balance + action.payload.amount
    };

    case "account/payLoan": 
    return {
      ...state, 
      loan:0, 
      loanPurpose:"", 
      balance:state.balance-state.loan
    }

    default: return state;
  }
}

const store = createStore(reducer);

function Deposit(amount) 
{
  return {type: "account/deposit", payload: amount};
}
function Withdraw(amount) 
{
  return {type: "account/withdraw", payload: amount};
}
function RequestLoan(amount, purpose) 
{
  return {type: "account/requestLoan", payload: {amount, purpose}};
}

function PayLoan()
{
  return {type: "account/payLoan"};
}

store.dispatch(Deposit(500));
console.log(store.getState());
store.dispatch(Withdraw(100));
console.log(store.getState());