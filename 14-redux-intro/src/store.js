import {legacy_createStore as CreateStore, combineReducers} from "redux";

const initialStateAccount = 
{
  balance: 0,
  loan: 0,
  loanPurpose: ""
}

const initialStateCustomer =
{
  fullName: "",
  nationalID: "",
  createdAt: "",
}

function AccountReducer(state = initialStateAccount, action) 
{
  switch(action.type)
  {
    case "account/deposit": 
    return{
      ...state, 
      balance: state.balance + action.payload
    };

    case "account/withdraw": 
    return{
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

function CustomerReducer(state = initialStateCustomer, action)
{
  switch(action.type)
  {
    case "customer/createCustomer": 
    return {
      ...state, 
      fullName:action.payload.fullName, 
      nationalID: action.payload.nationalID, 
      createdAt: action.payload.createdAt
    };

    case "customer/updateName":
    return{
      ...state, 
      fullName: action.payload
    };

    default: return state;
  }
}

const rootReducer = combineReducers(
{
  account: AccountReducer,
  customer: CustomerReducer
})

const store = CreateStore(rootReducer);

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

function CreateCustomer(fullName, nationalID)
{
  return {
    type: "customer/createCustomer", 
    payload: 
    {
      fullName, 
      nationalID, 
      createdAt: new Date().toISOString()
    }
  }
}

function UpdateName(fullName)
{
  return {type: "customer/updateName", payload: fullName};
}

store.dispatch(CreateCustomer("Rafa Hernandez", "123123123"))
console.log(store.getState());