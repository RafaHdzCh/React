import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function SearchOrder()
{
  const [query, SetQuery] = useState();
  const navigate = useNavigate();

  function HandleSubmit(event)
  {
    event.preventDefault();
    if(!query) return;
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={HandleSubmit}>
      <input 
        placeholder="Search order #" 
        value={query} 
        onChange={event=>SetQuery(event.target.value)}
      />
    </form>
  )
}