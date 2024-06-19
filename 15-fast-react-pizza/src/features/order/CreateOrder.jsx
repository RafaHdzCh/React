import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, GetCart, GetTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart" 
import store from "../../store.js"
import {formatCurrency} from "../../utils/helpers.js"
import { fetchAddress } from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export default function CreateOrder() {

  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch();

  const formErrors = useActionData();
  const 
  {
    username, 
    status: addressStatus, 
    position, 
    address,
    error: errorAddress
  } = useSelector(state=>state.user);
  const isLoadingAddress = addressStatus === "loading"

  const cart = useSelector(GetCart);
  const totalCartPrice = useSelector(GetTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order?</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input 
              type="text" 
              name="customer" 
              required 
              className="input w-full"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input 
              type="tel" 
              name="phone"
              required 
              className="input w-full"
            />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md p-2">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input 
              type="text" 
              name="address" 
              disabled={isLoadingAddress}
              defaultValue={address}
              required 
              className="input w-full"
            />
            
            {
              !position.latitude && !position.longitude &&
              <span className="absolute right-1 mt-0.5 z-50">
                <Button disabled={isLoadingAddress} type="small" onClick={(event) => 
                  {
                    event.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  GetPosition
                </Button>
              </span>
            }
            {addressStatus === "error" && <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md p-2">{errorAddress}</p>}
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="
              h-6
              w-6
              accent-yellow-400
              focus:outline-none    
              focus:ring
              focus:ring-offset-1
              focus:ring-yellow-400
            "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label 
            className="font-medium" 
            htmlFor="priority"
          >
            Want to yo give your order priority?
            </label>
        </div>

        <div>
          <input 
            type="hidden" 
            name="cart" 
            value={JSON.stringify(cart)}
          />
          <input 
            type="hidden" 
            name="position" 
            value=
              {
                position.latitude && position.longitude ? 
                `${position.latitude},$}${position.longitude}` : ""
              } 
          />
          <Button 
            disabled={isSubmitting || isLoadingAddress} 
            type="primary"
          >
            {isSubmitting ? "Placing order..." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function Action({ request }) 
{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = 
  {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  }

  const errors = {};
  if(!isValidPhone(order.phone)) errors.phone = "Please give us your correct phone number. We might need it to contact you."
  if(Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(ClearCart());
  return redirect(`/order/${newOrder.id}`);
}