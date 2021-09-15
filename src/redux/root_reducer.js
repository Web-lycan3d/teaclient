/** @format */
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import alert from "./alert/alert.reducer";
import user from "./user/user.reducer";
import cart from "./cart/cart.reducer";
import { favReducer } from "./fav/fav.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['cart']
  }

const rootReducer = combineReducers({
  alert,
  user,
  cart,
  fav: favReducer,
});

export default persistReducer(persistConfig , rootReducer)