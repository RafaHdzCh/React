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
        className="
        w-28
        bg-yellow-100
        rounded-full 
        px-4 
        py-2 
        text-sm 
        placeholder:text-stone-400
        sm:w-64
        sm:focus:w-72
        transition-all
        duration-300
        focus:outline-none
        focus:ring
        focus:ring-yellow-500
        focus:ring-opacity-50
      "/>
    </form>
  )
}