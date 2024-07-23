import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {formatCurrency} from "../../utils/helpers"
import store from "../../store"
import { getTotalCartPrice, pizzaCleared } from "../cart/cartSlice";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart"
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {username, error: addressError, status: addressStatus, address: userAddress, position} = useSelector(store=>store.user)
  const cart = useSelector(store=>store.cart);
  const dispatch = useDispatch()

  const formError = useActionData();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const totalCartPrice = useSelector(getTotalCartPrice)
  const totalPrice = withPriority ?totalCartPrice + totalCartPrice * 0.2 : totalCartPrice

  if (!cart.length) return <EmptyCart />

  return (
    <div className="p-4">
      <h2 className="mb-4 font-bold">Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="shrink-0 pb-1 sm:basis-36">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            className="input grow"
            required
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="shrink-0 pb-1 sm:basis-36">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-300 p-1 text-xs">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="shrink-0 pb-1 sm:basis-36">Address</label>
          <div className="grow relative">
            <input
              type="text"
              name="address"
              className="input w-full"
              defaultValue={userAddress}
              disabled={addressStatus === "loading"}
              required
            />
  
            {!userAddress && <span className="absolute right-0">
                <Button 
                    type="small"
                    disabled={addressStatus === "loading"}
                    onClick={(e)=>{
                      e.preventDefault()
                      dispatch(fetchAddress())
                    }}>{addressStatus === "loading" ? `Searching...` : `get position`}</Button>
            </span> }
            
            {addressError && (
              <p className="mt-2 rounded-md bg-red-300 p-1 text-xs">
                {addressError}
              </p>
            )}

          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="accent-yellow-700"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-4">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input 
              type="hidden" 
              name="position" 
              value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ""} 
          />
          <Button disabled={isLoading} type={"primary"}>
            {isLoading ? `Processing...` : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let errors = {};
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please provide a valid phone number! We might need to contact you.";
  }

  // If errors exists
  if (Object.keys(errors).length > 0) return errors;

  const res = await createOrder(order);


  store.dispatch(pizzaCleared())
  return redirect(`/order/${res.id}`);

}

export default CreateOrder;
