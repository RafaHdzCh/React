import { useState, useReducer } from "react";

function Reducer(state, Action)
{
  if(Action.type === "Increase") return state + 1;
  if(Action.type === "Decrease") return state - 1;
  if(Action.type === "DefineCount") return Action.payload;
}

function DateCounter() 
{
  //const [count, SetCount] = useState(0);
  const [step, SetStep] = useState(1);
  const [count, Dispatch] = useReducer(Reducer, 0)

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const Decrease = function () 
  {
    Dispatch({type: "Decrease"});
  };

  const Increase = function () 
  {
    Dispatch({type: "Increase"});
  };

  const DefineCount = function (event) 
  {
    Dispatch({type: "DefineCount", payload: Number(event.target.value)})
  };

  const DefineStep = function (event) 
  {
    SetStep(Number(event.target.value));
  };

  const Reset = function () 
  {
    //SetCount(0);
    SetStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={DefineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={Decrease}>-</button>
        <input value={count} onChange={DefineCount} />
        <button onClick={Increase}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={Reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;