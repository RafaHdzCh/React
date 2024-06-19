import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddItem, GetCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) 
{
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentCuantity = useSelector(GetCurrentQuantityById(id))
  const isInCart = currentCuantity > 0;

  function HandleAddToCart()
  {
    console.log(id);
    const newItem = 
      {
        pizzaId: id, 
        name, 
        quantity: 1, 
        unitPrice,
        totalPrice:  unitPrice * 1,
      };
      dispatch(AddItem(newItem))
  }

  return (
    <li className="
      flex 
      gap-4
      py-2
      "
    >
      <img 
        src={imageUrl} 
        alt={name} 
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        
      />
      <div className="
        flex 
        flex-col
        grow
        pt-0.5
        "
      >
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex item-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          
          {isInCart && <DeleteItem pizzaId={id} />}

          {!soldOut && !isInCart && <Button type="small" onClick={HandleAddToCart}> Add to cart </Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
