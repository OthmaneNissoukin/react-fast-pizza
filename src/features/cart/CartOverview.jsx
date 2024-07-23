import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartItems, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const cartTotalItems = useSelector(getTotalCartItems)
  const cartTotalPrice = useSelector(getTotalCartPrice)
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 sm:p-6">
      <p className="space-x-3 font-semibold text-stone-300">
        <span>{cartTotalItems} pizzas</span>
        <span>${cartTotalPrice || 0}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
