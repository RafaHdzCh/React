import Main from "./Main";
import Header from "./Header";
import {useEffect, useReducer} from "react";

const initialState = 
{
  questions: [],
  //loading, error, ready, active, finish
  status: "loading" 
};

function Reducer(state, Action)
{
  switch(Action.type)
  {
    case "DatFailed": return {...state, status: "error", }
    case "DataReceived": return {...state, questions: Action.payload, status: "ready"};
    
    default: throw new Error("Action unknown.")
  }
}

export default function App()
{
  const [state, Dispatch] = useReducer(Reducer,initialState);

  useEffect(function()
  {
    fetch("http://localhost:8000/questions")
      .then(response=>response.json())
      .then(data=>Dispatch({type: "DataReceived", payload: data}))
      .catch(error => Dispatch({type: "DataFailed"}));
  });

  return (
    <div>
      <Header />
      <Main>
        <p> 1/15 </p>
        <p> Question? </p>
      </Main>
    </div>
  )
}