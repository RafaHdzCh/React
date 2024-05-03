import {useState} from "react";

const messages = 
[
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App()
{
  return (
  <div>
    <Steps />
  </div>
  )
}

 function Steps()
{
  //useState only available at the top level
  const [step, SetStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function HandlePrevious()
  {
    if(step > 1) SetStep((currentStep) => currentStep-1);
  }

  function HandleNext()
  {
    if(step < 3) SetStep((currentStep) => currentStep+1);
  }

  return (
    <div>
      <button className="close" onClick={()=>setIsOpen(is => !is)}>  &times; </button>
      {
        isOpen &&
        (<div className="steps">
          <div className="numbers">
            <div className={step === 1 ? "active" : ""}>1</div>
            <div className={step === 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          <p className="message"> Step {step}: {messages[step-1]} </p>
          <div className="buttons">
            <button 
              style={{backgroundColor: "#7950f2", color: "#fff"}} 
              onClick={HandlePrevious}> 
              Previous
            </button>
            <button 
              style={{backgroundColor: "#7950f2", color: "#fff"}} 
              onClick={HandleNext}> 
              Next
            </button>
          </div>
        </div>)
      }   
    </div>
  )
}