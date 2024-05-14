import Options from "./Options"

export default function Question({question, Dispatch, answer})
{
  return(
    <div>
      <h4> {question.question} </h4>
      <Options 
        question={question} 
        Dispatch={Dispatch}
        answer={answer}
      />
    </div>
  )
}