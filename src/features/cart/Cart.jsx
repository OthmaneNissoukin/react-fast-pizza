import { getTotalCartPrice, pizzaCleared } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart"
import { formatCurrency } from "../../utils/helpers";


function Cart() {
  const cart = useSelector(store=>store.cart);
  const totalCartPrice = useSelector(getTotalCartPrice)
  const username = useSelector(store=>store.user.username)
  const dispatch = useDispatch()

  if (!cart.length) return <EmptyCart />

  return (
    <div className="p-2">
      <LinkButton to={"/menu"}>&larr; Back to menu</LinkButton>

      <h2 className="my-4 font-semibold">Your cart, {username || "GUEST"}</h2>

      <ul className="divide-y-2 divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-3 space-x-2">
        <Button to="/order/new" type="small" color="black">
          {`Order pizzas ${formatCurrency(totalCartPrice)}`}
        </Button>
        <Button type="secondary" onClick={() => dispatch(pizzaCleared())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
