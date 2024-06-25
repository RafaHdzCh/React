import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true)
{
  const ref = useRef();
  useEffect(function() 
  {
    function HandleClick(event)
    {
      if(ref.current && !ref.current.contains(event.target))
      {
        handler();
      }
    }
    
    document.addEventListener("click", HandleClick, listenCapturing)
    return () => document.removeEventListener("click", HandleClick);

  }, [handler,listenCapturing]);

  return ref;
}