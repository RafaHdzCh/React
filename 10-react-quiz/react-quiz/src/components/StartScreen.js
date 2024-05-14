export default function StartScreen({numberOfQuestions, Dispatch})
{
  return(
    <div className="start">
      <h2> Welcome to The React Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your React Knowledge </h3>
      <button 
        className="btn btn-ui" 
        onClick={()=>Dispatch({type: "Start"})}
      > 
        Start 
      </button>
    </div>
  )
}