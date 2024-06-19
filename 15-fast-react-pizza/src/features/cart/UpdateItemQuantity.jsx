import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { DecreaseItemQuantity, IncreaseItemQuantity } from "./cartSlice";

export default function UpdateItemQuantity({pizzaId, currentQuantity})
{
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 items-center md:gap-3">
      <Button type="round" onClick={() => dispatch(DecreaseItemQuantity(pizzaId))}>-</Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round"onClick={() => dispatch(IncreaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}