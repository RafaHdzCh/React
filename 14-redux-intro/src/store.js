import AccountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customers/customerSlice";
import {legacy_createStore as CreateStore, combineReducers} from "redux";


const rootReducer = combineReducers(
{
  account: AccountReducer,
  customer: CustomerReducer
})
  
const store = CreateStore(rootReducer);

export default store;