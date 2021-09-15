/** @format */

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import Root_Reducer from "./root_reducer";

const initialState = [];

const middleware = [thunk];

const store = createStore(
  Root_Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;



