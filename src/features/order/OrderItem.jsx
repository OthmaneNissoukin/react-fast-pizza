import { formatCurrency } from "../../utils/helpers";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className=" py-1">
      <div className="flex items-center justify-between ">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500">{isLoadingIngredients ? "Loading..." : ingredients?.join(", ")}</p>
    </li>
  );
}

export default OrderItem;
