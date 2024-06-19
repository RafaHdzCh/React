import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{
  cart: []
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

      if(item.quantity === 0) cartSlice.caseReducers.DeleteItem(state, action);
    },
    ClearCart(state) 
    {
      state.cart = [];
    },
  }
})

export const {AddItem, DeleteItem, IncreaseItemQuantity, DecreaseItemQuantity, ClearCart} = cartSlice.actions;
export default cartSlice.reducer;

export const GetCart = state => state.cart.cart;
export const GetTotalCartQuantity = state=>state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const GetTotalCartPrice = state=>state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
export const GetCurrentQuantityById = id => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0