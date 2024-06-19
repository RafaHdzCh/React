import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{
  //cart: [],

  cart: 
  [
    {
      pizzaId: 12, 
      name: "Mediterranean", 
      quantity: 2, 
      unitPrice: 16,
      totalPrice: 32
    }
  ]
};

const cartSlice = createSlice(
{
  name: "cart",
  initialState,
  reducers:
  {
    AddItem(state, action) 
    {
      //payload = newItem
      state.cart.push(action.payload);
    },
    DeleteItem(state, action) 
    {
      //payload = id
      state.cart = state.cart.filter(item=>item.pizzaId !== action.payload)
    },
    IncreaseItemQuantity(state, action) 
    {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    DecreaseItemQuantity(state, action) 
    {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    ClearCart(state) 
    {
      state.cart = [];
    },
  }
})

export const {AddItem, DeleteItem, IncreaseItemQuantity, DecreaseItemQuantity, ClearCart} = cartSlice.actions;
export default cartSlice.reducer;