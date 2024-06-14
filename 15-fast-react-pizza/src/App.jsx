import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import {RouterProvider, createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/menu", element: <Menu /> },
    { path: "/cart", element: <Cart /> },
    { path: "/order/:orderId", element: <Order /> },
    { path: "/order/new", element: <CreateOrder /> },
  ])

export default function App() 
{
  return <RouterProvider router={router} />;
}