import Main from "./Main";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import {useEffect, useReducer} from "react";
import Question from "./Question";

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
    case "Start": return {...state, status:"active"};
    case "DataFailed": return {...state, status: "error", };
    case "DataReceived": return {...state, questions: Action.payload, status: "ready"};
    default: throw new Error("Action unknown.");
  }
}

export default function App()
{
  const [{questions, status}, Dispatch] = useReducer(Reducer,initialState);
  const numberOfQuestions = questions.length;

  useEffect(function()
  {
    fetch("http://localhost:8000/questions")
      .then(response=>response.json())
      .then(data=>Dispatch({type: "DataReceived", payload: data}))
      .catch(error => Dispatch({type: "DataFailed"}));
  }, []);

  console.log(status)

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {
          status === "ready" && 
          <StartScreen 
            numberOfQuestions={numberOfQuestions} 
            Dispatch={Dispatch}
          />
        }
        {status === "active" && <Question />}
      </Main>
    </div>
  )
}