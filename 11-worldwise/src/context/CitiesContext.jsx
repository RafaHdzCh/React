import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

export function CitiesProvider({children})
{
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () 
  {
    async function fetchCities() 
    {
      try 
      {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } 
      catch (error) 
      {
        alert(error.message);
      } 
      finally 
      {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return <CitiesContext.Provider value={
    {
      cities,
      isLoading
    }
  }>
    {children}
  </CitiesContext.Provider>
}

export function useCities()
{
  const context = useContext(CitiesContext);
  if(context === undefined) throw new Error("PostContext was used outside of the PostProvider");
  return context;
}