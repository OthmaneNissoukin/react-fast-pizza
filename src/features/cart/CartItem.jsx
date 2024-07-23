import Button from "../../ui/Button";
import UpdateQuantity from "./UpdateQuantity"
import { formatCurrency } from "../../utils/helpers";
import {useDispatch} from "react-redux"
import {pizzaDeleted} from "./cartSlice.js"

function CartItem({ item }) {
  const dispatch = useDispatch()
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="flex items-center justify-between py-2 md:gap-2">
      <div className="grow md:flex md:items-center md:justify-between">
        <p>
          {quantity}&times; {name}
        </p>
        <div>
          <p className="text-sm font-bold">{formatCurrency(quantity * totalPrice)}</p>
        </div>
      </div>
      <div className="flex gap-2 sm:gap-3 items-center text-sm">
        <UpdateQuantity pizzaQuantity={quantity} pizzaId={pizzaId} />
        <Button type="small" onClick={() => dispatch(pizzaDeleted(pizzaId))}>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
