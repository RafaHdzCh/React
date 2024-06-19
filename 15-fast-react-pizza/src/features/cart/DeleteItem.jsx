import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { DeleteItem as DeleteItemFromCart} from "./cartSlice";

export default function DeleteItem({pizzaId})
{
  const dispatch = useDispatch();

  return <Button type="small" onClick={() => dispatch(DeleteItemFromCart(pizzaId))}>Delete</Button>
}