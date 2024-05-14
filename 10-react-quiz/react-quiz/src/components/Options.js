export default function Options({question, Dispatch, answer}) {
  

  return (
    <div className="options">
      {
        question.options.map((option, index) => 
        {
          const isAnswer = index === answer;
          const isCorrect = index === question.correctOption;
          const hasAnswered = answer !== null;

          return (
            <button
              className={
                `btn btn-option 
                ${isAnswer ? "answer" : ""} 
                ${hasAnswered ? (isCorrect ? "correct" : "wrong") : ""}`
              }
              key={option}
              disabled={hasAnswered}
              onClick={() => Dispatch({ type: "NewAnswer", payload: index })}
            >
              {option}
            </button>
        );
      })}
    </div>
  );
}