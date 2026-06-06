import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 uppercase bg-yellow-500 border-b-2 border-slate-600 sm:px-6">
      <Link to="/" className="font-semibold tracking-widest ">Fast React Pizza Co.</Link>

      <SearchOrder />

   <Username/>
    </header>
  );
}
