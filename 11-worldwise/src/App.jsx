import Login from "./pages/Login.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App()
{
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="app" element={<AppLayout />}/>
      <Route path="product" element={<Product />}/>
      <Route path="pricing" element={<Pricing />}/>
      <Route path="login" element={<Login />}/>

      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  </BrowserRouter>);
}