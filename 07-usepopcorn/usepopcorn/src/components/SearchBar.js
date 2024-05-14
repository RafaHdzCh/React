import { useEffect, useRef } from "react";

export function SearchBar({ query, SetQuery }) 
{
  const inputElement = useRef(null);
  useEffect(function()
  {
    function Callback(event)
    {
      if(document.activeElement === inputElement.current) return;
      if(event.code !== "Enter") return;

      inputElement.current.focus();
      SetQuery("");
    }
    document.addEventListener("keydown", Callback);
    return () => document.addEventListener("keydown", Callback);
  }, [SetQuery]);
    
  return (
    <input
      className="search"
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => SetQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
