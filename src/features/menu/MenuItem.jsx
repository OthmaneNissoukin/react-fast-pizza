import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

import { pizzaAdded, pizzaIncremented, pizzaDecremented, pizzaDeleted } from "../cart/cartSlice";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cartItems = useSelector(store=>store.cart)
  const currPizzaQte = cartItems.filter(item => item.pizzaId === id).at(0)?.quantity

  const dispatch = useDispatch(store=>store.cart)


  function handleAddPizza() {
    const newPizza = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1
    }


    dispatch(pizzaAdded(newPizza))
  }

  function handleIncPizza() {
    console.log(currPizzaQte)
    dispatch(pizzaIncremented(id))
  }
 
  function handleDecPizza() {
    dispatch(pizzaDecremented(id))
  }

  function handleDeletePizza() {
    dispatch(pizzaDeleted(id))
  }

  return (
    <li className="flex gap-2 p-2">
      <img
        src={imageUrl}
        alt={name}
        className={`w-40 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col py-1">
        <p>{name}</p>
        <p>{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className={`${soldOut ? "text-stone-500" : ""}`}>Sold out</p>
          )}
          {(!soldOut && !currPizzaQte)&& <Button type={"small"} onClick={handleAddPizza}>Add To Cart</Button>}
          {
            currPizzaQte > 0 && <div className="flex items-center gap-3 text-sm">

            <UpdateQuantity pizzaId={id} pizzaQuantity={currPizzaQte} /> 
            <Button type={"small"} onClick={handleDeletePizza}>Delete</Button>
            </div>
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
