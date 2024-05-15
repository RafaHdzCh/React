export default function NextButton({Dispatch, answer, index, numberOfQuestions})
{
  if(answer === null)
  {
    return null;
  } 

  if (index < numberOfQuestions - 1)
  {
    return(
      <button 
        className="btn btn-ui"
        onClick={() => Dispatch({type: "NextQuestion"})}
      >
        Next
      </button>
    )
  }

  if (index === numberOfQuestions - 1)
    {
      return(
        <button 
          className="btn btn-ui"
          onClick={() => Dispatch({type: "Finish"})}
        >
          Finish
        </button>
      )
    }
}