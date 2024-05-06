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
    SetItems(items => items.filter(item=>item.id !== id));
  }

  function HandleToggleItem(id)
  {
    SetItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  //#endregion
  
  return(
  <div className="app">
    <Logo/>
    <Form 
      OnAddItems={HandleAddItems}
    />
    <PackingList 
      items={items} 
      OnDeleteItem={HandleDeleteItem} 
      OnToggleItem={HandleToggleItem}
    />
    <Stats 
      items={items} 
    />
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

function PackingList({items, OnDeleteItem, OnToggleItem})
{
  return (
  <div className="list">
    <ul>
      {
        items.map(item => 
        <Item 
          item={item} 
          OnDeleteItem={OnDeleteItem}
          OnToggleItem={OnToggleItem}
          key={item.id}/>
      )}
    </ul>
  </div>
  )
}

function Item({item, OnDeleteItem, OnToggleItem})
{
  return( 
  <li>
    <input 
      type="checkbox" 
      value={item.packed} 
      onChange={()=> OnToggleItem(item.id)}
    />
    <span style={item.packed ? {textDecoration:"line-through"}:{}}> 
      {item.quantity} {item.description}
    </span> 
    <button 
      onClick={()=>OnDeleteItem(item.id)}
    >
      ❌
    </button>
  </li>)
}

function Stats({items})
{
  const numberOfItems = items.length;

  if(!numberOfItems) return(
    <p className="stats"> 
      <em>
        Start Adding some items!
      </em>
    </p>
  );
  
  const numerOfPackedItems = items.filter(item => item.packed).length;
  const percentage = (numerOfPackedItems/numberOfItems)*100; 

  return (
  <footer className="stats">
    <em>
      {numerOfPackedItems === numberOfItems ? 
      "You got everything! Ready to go!" 
      : 
      `You have ${numberOfItems} items on your list, and you already packed ${numerOfPackedItems}(${Math.round(percentage)}%)`}      
    </em>
  </footer>
  )
}