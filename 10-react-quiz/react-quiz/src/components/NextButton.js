export default function NextButton({Dispatch, answer})
{
  console.log(answer)
  if(answer === null)
  {
    console.log("No hay respuesta.")
    return null;
  } 

  console.log("Hubo respuesta.")
  return(
    <button 
      className="btn btn-ui"
      onClick={() => Dispatch({type: "NextQuestion"})}
    >
      Next
    </button>
  )
}