// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher()

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu")
  }, [fetcher])

  return (
    <div className="px-2 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-bold">
        <h2>Order ${id} status</h2>

        <div className="space-x-1 text-sm">
          {priority && (
            <span className="rounded-full  bg-red-500 px-4 py-1 text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-4 py-1  text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="item-center mb-3 flex flex-wrap justify-between bg-stone-300 p-4 text-sm">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div className="mb-4">
        <ul className="divide-y-2 divide-stone-300">
          {cart.map((order, index) => (
            <OrderItem item={order} key={index} ingredients={fetcher?.data?.find(item => item.id===order.pizzaId)?.ingredients || []} 
            isLoadingIngredients={fetcher.state === "loading"}
            />
          ))}
        </ul>
      </div>

      <div className="bg-stone-300 p-4">
        <p className="text-sm font-medium">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  const orderData = await getOrder(params.orderId);
  return orderData;
}

export default Order;
