import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
  fullName: "",
  nationalID: "",
  createdAt: "",
}

const customerSlice = createSlice(
{
  name: "customer",
  initialState,
  reducers:
  {
    CreateCustomer: 
    {
      prepare(fullName, nationalID)
      {
        return{
          payload:
          {
            fullName, 
            nationalID, 
            createdAt: new Date().toISOString(),
          }
        }
      },
      reducer(state, action)
      {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      }
    },
    UpdateName(state, action)
    {
      state.fullName = action.payload;
    }
  }
});

export const {CreateCustomer, UpdateName} = customerSlice.actions;

export default customerSlice.reducer;

/*
export default function CustomerReducer(state = initialStateCustomer, action)
{
  switch(action.type)
  {
    case "customer/createCustomer": 
    return {
      ...state, 
      fullName:action.payload.fullName, 
      nationalID: action.payload.nationalID, 
      createdAt: action.payload.createdAt
    };

    case "customer/updateName":
    return{
      ...state, 
      fullName: action.payload
    };

    default: return state;
  }
}

export function CreateCustomer(fullName, nationalID)
{
  return {
    type: "customer/createCustomer", 
    payload: 
    {
      fullName, 
      nationalID, 
      createdAt: new Date().toISOString()
    }
  }
}

export function UpdateName(fullName)
{
  return {type: "customer/updateName", payload: fullName};
}
*/