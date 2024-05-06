import {useState} from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./packingList";
import Stats from "./stats";

export default function App()
{
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

  function HandleClearList()
  {
    const confirmed = window.confirm("Are you sure you want to delete all items?")
    if(confirmed) SetItems([]);
  }
  
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
      OnClearList={HandleClearList}
    />
    <Stats 
      items={items} 
    />
  </div>
)
};