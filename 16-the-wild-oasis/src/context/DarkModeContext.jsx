import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({children})
{
  const [isDarkMode, SetIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  
  useEffect(function() 
  {
    if(isDarkMode)
    {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode")
    }
    else
    {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode")
    }
  }, [isDarkMode]);
  
  function ToggleDarkMode()
  {
    SetIsDarkMode(isDark => !isDark)
  }
  return (
  <DarkModeContext.Provider 
    value={{isDarkMode, ToggleDarkMode}}
  >
    {children}
  </DarkModeContext.Provider>)
}

function useDarkMode()
{
  const context = useContext(DarkModeContext);
  if(context === undefined) throw new Error("Dark mode context was use outside of DarkModeProvider");

  return context;
}

export {DarkModeProvider, useDarkMode};