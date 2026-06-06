import { Link } from "react-router-dom"

export default function Button({children , disabled ,to , type , onClick}) {
    const base =  "font-semibold text-sm uppercase transition-colors duration-300 bg-yellow-400 text-slate-800 rounded-xl hover:bg-yellow-300 focus:ring focus:outline-none focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"

  const styles = {
  primary : base + " px-4 py-3",
  small : base + " py-2 px-4 text-xs md:py-2.5 md:px-5",
  round : base + " py-1 px-2.5 text-xs md:py-2 text-sm md:px-3.5",
  secondary : "font-semibold uppercase text-sm transition-colors duration-500 text-slate-800 rounded-xl focus:ring focus:outline-none focus:ring-slate-800 focus:ring-offset-2 disabled:cursor-not-allowed border-2 border-slate-300 px-3.5 py-2.5 hover:bg-slate-700 hover:text-slate-100"
  }

  if(to) return <Link className={styles[type]} to={to}>{children}</Link>

  if(onClick) return (
    <button onClick={onClick} disabled={disabled}  className={styles[type]}>
      {children}
    </button>
  )

  return (
    <button disabled={disabled}  className={styles[type]}>
      {children}
    </button>
  )
}
