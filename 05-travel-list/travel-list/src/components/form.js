import { useState } from "react";

export default function Form({OnAddItems})
{
  const [description, SetDescription] = useState("");
  const [quantity, SetQuantity] = useState(1);
  

  function HandleSubmit(event)
  {
    event.preventDefault();
    if(!description) return;
    
    const newItem = {description, quantity, packed: false, id: Date.now()};
    OnAddItems(newItem);
    SetDescription("");
    SetQuantity(1);
  }

  return (
  <form 
    className="add-form" 
    onSubmit={HandleSubmit}
  > 
    <h3> What do you need for your trip? </h3>
    <select 
      value={quantity}
      onChange={event =>SetQuantity(Number(event.target.value))}
    >
      {
        Array.from({length: 20}, (currentValue,index) => index + 1)
             .map((num)=> <option value={num} key={num}>{num}</option>)
      }
    </select>
    <input 
      type="text" 
      placeholder="Item..." 
      value={description} 
      onChange={event => SetDescription(event.target.value)}
    >
    </input>
    <button>Add</button>
  </form>
  )
}