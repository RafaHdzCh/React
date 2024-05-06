import {useState} from "react";

export default function App()
{
  //#region Shared State

  const [items, SetItems] = useState([]);
  function HandleAddItems(item)
  {
    SetItems(items=> [...items, item]);
  }

  function HandleDeleteItem(id)
  {
    SetItems(items => items.filter(item=>item.id !== id))
  }

  //#endregion
  
  return(
  <div className="app">
    <Logo/>
    <Form OnAddItems={HandleAddItems}/>
    <PackingList items={items} OnDeleteItem={HandleDeleteItem}/>
    <Stats/>
  </div>
)
};

function Logo()
{
  return <h1>Far Away</h1>
}

function Form({OnAddItems})
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
  <form className="add-form" onSubmit={HandleSubmit}> 
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

function PackingList({items, OnDeleteItem})
{
  return (
  <div className="list">
    <ul>
      {
        items.map(item => 
        <Item item={item} OnDeleteItem={OnDeleteItem} key={item.id}/>
      )}
    </ul>
  </div>
  )
}

function Item({item, OnDeleteItem})
{
  return( 
  <li>
    <span style={item.packed ? {textDecoration:"line-through"}:{}}> 
      {item.quantity} {item.description}
    </span> 
    <button onClick={()=>OnDeleteItem(item.id)}>❌</button>
  </li>)
}

function Stats()
{
  return (
  <footer className="stats">
    You have X items on your list, and you already packed Y(X%)
  </footer>
  )
}