import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App()
{
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="product" element={<Product />}/>
      <Route path="pricing" element={<Pricing />}/>
      
      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  </BrowserRouter>);
}