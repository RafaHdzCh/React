import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetTotalCartPrice, GetTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() 
{
  const totalCartCuantity = useSelector(GetTotalCartQuantity);
  const totalCartPrice = useSelector(GetTotalCartPrice);

  if(!totalCartCuantity) return null;

  return (
    <div 
      className="
      bg-stone-800 
      text-stone-200 
      uppercase 
      text-sm 
      px-4 
      py-4 
      sm:px-6 
      md:text-base
      flex
      items-center
      justify-between"
    >
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalCartCuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
