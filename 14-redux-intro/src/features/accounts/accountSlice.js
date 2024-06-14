import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
}

const accountSlice = createSlice(
{
  name: "account",
  initialState,
  reducers:
  {
    Deposit(state, action)
    {
      state.balance += action.payload;
      state.isLoading = false;
    },
    Withdraw(state,action)
    {
      state.balance -= action.payload;
    },
    RequestLoan: 
    {
      prepare(amount, purpose)
      {
        return{
          payload: {amount, purpose}
        }
      },
      reducer(state,action)
      {
        if(state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      }
  },
    PayLoan(state, action)
    {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    ConvertingCurrency(state)
    {
      state.isLoading = true;
    }
  }
});

export function Deposit(amount, currency) 
{
  
  if(currency === "USD") return {type: "account/Deposit", payload: amount};
  return async function(dispatch, getState) 
  {
    dispatch({type: "account/ConvertingCurrency"});
    const result = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await result.json();
    const converted = data.rates.USD;
    dispatch({type: "account/Deposit", payload: converted});
  };
}

export const { Withdraw, RequestLoan, PayLoan} = accountSlice.actions;
export default accountSlice.reducer;



/*
//USUAL REDUCER

export default function AccountReducer(state = initialState, action) 
{
  switch(action.type)
  {
    case "account/deposit": 
    return{
      ...state, 
      balance: state.balance + action.payload,
      isLoading: false
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

    case "account/convertingCurrency":
    return {
      ...state,
      isLoading:true
    }

    default: return state;
  }
}

export function Deposit(amount, currency) 
{
  
  if(currency === "USD") return {type: "account/deposit", payload: amount};
  return async function(dispatch, getState) 
  {
    dispatch({type: "account/convertingCurrency"});
    const result = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await result.json();
    const converted = data.rates.USD;
    dispatch({type: "account/deposit", payload: converted});
  };
}

export function Withdraw(amount) 
{
  return {type: "account/withdraw", payload: amount};
}

export function RequestLoan(amount, purpose) 
{
  return {type: "account/requestLoan", payload: {amount, purpose}};
}

export function PayLoan()
{
  return {type: "account/payLoan"};
}
*/