import { useEffect } from "react"

export default function Timer({Dispatch, secondsRemaining})
{
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(function()
  {
    const id = setInterval(function()
    {
      Dispatch({type: "Tick"});
    }, 1000);

    return () => clearInterval(id);
  }
  ,[Dispatch]);

  return(
    <div className="timer">
      {minutes<10 && "0"}{minutes}
      :
      {seconds<10 && "0"}{seconds}
    </div>
  )
}