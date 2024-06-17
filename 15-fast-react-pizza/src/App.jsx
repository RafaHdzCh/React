import Home from "./ui/Home";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import Menu, {MenuLoader} from "./features/menu/Menu";
import Order, { OrderLoader } from "./features/order/Order";
import CreateOrder, {Action as CreateOrderAction} from "./features/order/CreateOrder";
import {RouterProvider, createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter(
[
  { 
    element: <AppLayout />, 
    errorElement: <Error />,
    children: 
    [
      { 
        path: "/", 
        element: <Home />
      },
      { 
        path: "/menu", 
        element: <Menu />, 
        loader:MenuLoader, 
        errorElement: <Error />
      },
      { 
        path: "/cart", 
        element: <Cart /> 
      },
      { 
        path: "/order/new", 
        element: <CreateOrder />,
        action: CreateOrderAction
      },
      { 
        path: "/order/:orderId", 
        element: <Order />, 
        loader: OrderLoader,
        errorElement: <Error />
      }
    ]
  },
]);

export default function App() 
{
  return <RouterProvider router={router} />;
}