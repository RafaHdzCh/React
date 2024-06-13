import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Deposit, RequestLoan, Withdraw, PayLoan } from "./accountSlice.js";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();

  const 
  {
    loan: currentLoan, 
    loanPurpose: currentLoanPurpose, 
    balance,
    isLoading,
  } = useSelector(store => store.account);
  
  function handleDeposit() 
  {
    if(!depositAmount) return;

    dispatch(Deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency(currency)
  }

  function handleWithdrawal() 
  {
    if(!withdrawalAmount) return;

    dispatch(Withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() 
  {
    if(!loanAmount || !loanPurpose) return;

    dispatch(RequestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() 
  {
    dispatch(PayLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(event) => setDepositAmount(Number(event.target.value))}
          />
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="MXN">Mexican Peso</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}> {isLoading ? "Converting..." : "Deposit"} </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(event) => setWithdrawalAmount(Number(event.target.value))}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(event) => setLoanAmount(Number(event.target.value))}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(event) => setLoanPurpose(event.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {
          currentLoan > 0 && (
            <div>
              <span>Pay back ${currentLoan}({currentLoanPurpose})</span>
              <button onClick={handlePayLoan}>Pay loan</button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default AccountOperations;
