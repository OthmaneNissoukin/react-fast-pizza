import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { pizzaDecremented, pizzaIncremented } from "./cartSlice";

function UpdateQuantity({pizzaId, pizzaQuantity}) {
    const dispatch = useDispatch()
    return <div className="flex items-center gap-1 sm:gap-3 font-semibold">
        <Button type={"control"} onClick={() => dispatch(pizzaDecremented(pizzaId))}>-</Button>
        <span>{pizzaQuantity}</span>
        <Button type={"control"} onClick={() => dispatch(pizzaIncremented(pizzaId))}>+</Button>
    </div>
}

export default UpdateQuantity;