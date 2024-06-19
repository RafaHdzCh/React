import { Link } from "react-router-dom"

export default function Button({children, disabled, to, type, onClick})
{
  const base =
  `
    bg-yellow-400 
    uppercase 
    font-semibold 
    text-stone-800
    inline-block 
    tracking-wider 
    rounded-full 
    hover:bg-yellow-300 
    transition-colors 
    duration-300
    focus:outline-none
    focus:ring 
    focus: ring-offset-1
    focus:ring-yellow-300
    disabled:cursor-not-allowed
  `

  const styles = 
  {
    primary: base + " px-4 py-2 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-3 py-2 md:px-2 md:py-3.5 text-xs",
    secondary:`
                border-2
                border-stone-500
                disabled:cursor-not-allowed
                duration-300
                font-semibold 
                focus:outline-none
                focus:ring 
                focus: ring-offset-1
                focus:ring-stone-600
                hover:bg-stone-600
                hover:text-stone-200
                inline-block 
                md:px-6
                md:py-4
                px-4 py-2
                rounded-full 
                tracking-wider 
                transition-colors 
                text-stone-500
                uppercase 
              `
  }

  if(to) return <Link to={to} className={styles[type]}>{children}</Link>
  if(onClick) return(
    <button onClick={onClick} disabled={disabled} className={styles[type]}> 
      {children}
    </button>
  )

  return(
    <button disabled={disabled} className={styles[type]}> 
      {children}
    </button>
  )
}