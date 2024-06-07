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
    case "account/deposit": return {...state, balance: state.balance + action.payload};
    case "account/withdrwa": return {...state, balance: state.balance - action.payload};
    case "account/requestLoan": return state.loan > 0 ? state : {...state, loan: action.payload};
    case "account/payLoan": return {...state, loan:0, loanPurpose:"", balance:state.balance-state.loan}
    default: return state;
  }
}