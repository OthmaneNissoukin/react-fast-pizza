import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import CreateOrder, { action as newOrderAction } from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import {action as actionUpdate} from "./features/order/UpdateOrder"
import OrderItem from "./features/order/OrderItem";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import Error from "./ui/Error";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/cart", element: <Cart /> },
            { path: "/menu", loader: menuLoader, element: <Menu />, errorElement: <Error /> },
            { path: "/order/new", action: newOrderAction, element: <CreateOrder /> },
            { path: "/order/:orderId", loader: orderLoader, action: actionUpdate, element: <Order />, errorElement: <Error /> },
            { path: "/order", element: <OrderItem /> },
        ],
    },
    {
        basename: "/react-fast-pizza"
    }
]);

function App() {
    return <RouterProvider  router={router} ></RouterProvider>;
}

export default App;
