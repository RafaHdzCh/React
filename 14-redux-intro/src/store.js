import { thunk } from "redux-thunk"; 
import AccountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customers/customerSlice";
import {legacy_createStore as CreateStore, applyMiddleware, combineReducers} from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers(
{
  account: AccountReducer,
  customer: CustomerReducer
})
  
const store = CreateStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;