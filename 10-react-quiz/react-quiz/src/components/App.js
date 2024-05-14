import Main from "./Main";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import {useEffect, useReducer} from "react";
import Question from "./Question";
import NextButton from "./NextButton";

const initialState = 
{
  questions: [],
  //loading, error, ready, active, finish
  status: "loading" ,
  index: 0,
  answer: null,
  points: 0
};

function Reducer(state, Action)
{
  switch(Action.type)
  {
    case "Start": 
      return{
              ...state, 
              status:"active"
            };
    case "DataFailed": 
      return{
              ...state, 
              status: "error"
            };
    case "DataReceived": 
      return{
              ...state, 
              questions: Action.payload, 
              status: "ready"
            };
    case "NewAnswer": 
    const currentQuestion = state.questions[state.index];
    const isTheCorrectAnswer = Action.payload === currentQuestion.correctOption;
      return {
              ...state, 
              answer: Action.payload, 
              points: isTheCorrectAnswer ? state.points + currentQuestion.points : state.points
            };
    case "NextQuestion":
      return{
              ...state,
              index: state.index+1,
              answer: null
            }
    default: throw new Error("Action unknown.");
  }
}

export default function App()
{
  const [{questions, status, index, answer}, Dispatch] = useReducer(Reducer,initialState);
  const numberOfQuestions = questions.length;

  useEffect(function()
  {
    fetch("http://localhost:8000/questions")
      .then(response=>response.json())
      .then(data=>Dispatch({type: "DataReceived", payload: data}))
      .catch(error => Dispatch({type: "DataFailed"}));
  }, []);

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
        {
          status === "active" && 
          <>
            <Question 
              question={questions[index]}
              Dispatch={Dispatch}
              answer={answer}
            />
            <NextButton Dispatch={Dispatch} answer={answer}/>
          </>
        }
      </Main>
    </div>
  )
}