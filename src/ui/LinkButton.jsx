import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({children,to}) {
    const navigate = useNavigate();
    const className = "text-base blue-500 text- hover:text-blue-900 hover:underline"

  if(to == "-1") return 
      <button className={className} onClick={() => navigate(-1)}>{children}</button>
      
  return (
<Link to={to} className={className}>{children}</Link>
  )
}
