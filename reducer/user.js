import { combineReducers } from "redux";
import user from "./index";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";
const reducer = combineReducers({
  user: user,
  cart: cartReducer,
});

export default reducer;
export const store = configureStore({ reducer: reducer });
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
