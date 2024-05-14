import { useReducer } from "react";

const initialState = {count: 0, step: 1};

function Reducer(state, Action)
{
  switch(Action.type)
  {
    case "Decrease": return {...state, count: state.count - state.step};
    case "Increase": return {...state, count: state.count + state.step};
    case "DefineStep": return {...state, step: Action.payload};
    case "DefineCount": return {...state, count: Action.payload};
    case "Reset": return initialState;
    default: throw new Error("Unknown action");
  }
}

function DateCounter() 
{
  const [state, Dispatch] = useReducer(Reducer, initialState);
  const {count, step} = state;

  const currentDate = new Date();
  const date = new Date(currentDate.setDate(currentDate.getDate() + count));

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
    Dispatch({type: "DefineStep", payload: Number(event.target.value)})
  };

  const Reset = function () 
  {
    Dispatch({type: "Reset"})
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