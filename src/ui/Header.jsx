import { Link } from "react-router-dom";
import Home from "./Home";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-yellow-200 bg-yellow-500 p-4 uppercase ">
      <Link path="/" element={<Home />} className="tracking-widest">
        Fast Pizza Co.
      </Link>
      <SearchOrder />
      <Username className={"hidden md:inline-block"} />
    </header>
  );
}

export default Header;
