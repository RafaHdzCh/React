import Home from "./ui/Home";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import Menu, {MenuLoader} from "./features/menu/Menu";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import {RouterProvider, createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter(
[
  { 
    element: <AppLayout />, 
    errorElement: <Error />,
    children: 
    [
      { path: "/", element: <Home />},
      { path: "/menu", element: <Menu />, loader:MenuLoader, errorElement: <Error />,},
      { path: "/cart", element: <Cart /> },
      { path: "/order/:orderId", element: <Order /> },
      { path: "/order/new", element: <CreateOrder /> },
    ]
  },
]);

export default function App() 
{
  return <RouterProvider router={router} />;
}