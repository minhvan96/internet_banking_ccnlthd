import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./slices/user";

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer,
});

export default store;
