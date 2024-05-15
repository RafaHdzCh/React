import Main from "./Main";
import Error from "./Error";
import Timer from "./Timer";
import Header from "./Header";
import Loader from "./Loader";
import Footer from "./Footer";
import Question from "./Question";
import NextButton from "./NextButton";
import StartScreen from "./StartScreen";
import {useEffect, useReducer} from "react";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const SECONDS_PER_QUESTION = 10;

const initialState = 
{
  questions: [],
  //loading, error, ready, active, finish
  status: "loading" ,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

function Reducer(state, Action)
{
  switch(Action.type)
  {
    case "Start": 
      return{
              ...state, 
              status:"active",
              secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
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
    case "Finish":
      return{
              ...state,
              status: "finished",
              highscore: state.points > state.highscore ? state.points : state.highscore
            }
    case "Restart":
      return{
              ...initialState, 
              questions: state.questions,
              status: "ready"
            };

    case "Tick":
      return{
              ...state,
              secondsRemaining: state.secondsRemaining-1,
              status: state.secondsRemaining <= 0 ? "finished" : state.status
            }
    default: throw new Error("Action unknown.");
  }
}

export default function App()
{
  const [{questions, status, index, answer, points, highscore, secondsRemaining}, Dispatch] = useReducer(Reducer,initialState);
  const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((previous, current) => previous + current.points, 0);

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
            Dispatch={Dispatch}
            numberOfQuestions={numberOfQuestions} 
          />
        }
        {
          status === "active" && 
          <>
            <Progress 
              index={index} 
              points={points}
              numberOfQuestions={numberOfQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question 
              answer={answer}
              Dispatch={Dispatch}
              question={questions[index]}
            />
            <Footer>
              <Timer 
                Dispatch={Dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton 
                index={index}
                answer={answer}
                Dispatch={Dispatch} 
                numberOfQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        }
        {
          status === "finished" &&
          <FinishScreen 
            points={points}
            Dispatch={Dispatch}
            highscore={highscore}
            maxPossiblePoints={maxPossiblePoints}
          />
        }
      </Main>
    </div>
  )
}