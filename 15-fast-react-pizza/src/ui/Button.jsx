import { Link } from "react-router-dom"

export default function Button({children, disabled, to})
{
  const classname = `
        bg-yellow-400 
        uppercase 
        font-semibold 
        text-stone-800 
        px-4 
        py-2 
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

  if(to) return <Link to={to} className={classname}>{children}</Link>

  return(
    <button disabled={disabled} className={classname}> 
      {children}
    </button>
  )
}