export default function Progress({index, numberOfQuestions, points, maxPossiblePoints})
{
  return(
    <header className="progress">
      <progress max={numberOfQuestions} value={index}></progress>
      
      <p> Question <strong>{index+1}</strong> / {numberOfQuestions}</p>
      <p> <strong>{points}</strong> / {maxPossiblePoints}</p>
    </header>
  )
}