export default function NextButton({Dispatch, answer})
{
  if(answer === null)
  {
    return null;
  } 

  return(
    <button 
      className="btn btn-ui"
      onClick={() => Dispatch({type: "NextQuestion"})}
    >
      Next
    </button>
  )
}