/** @format */

import { TOGGLE_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM } from "./cart.types";
import { addItem, removeItem } from "./cart.utils";

const initialState = {
  hidden: true,
  cartitems: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case ADD_ITEM:
      console.log(payload)
      localStorage.setItem("cartItem", {"pid" : payload.id, "name" : payload.name , "price" : payload.price , "imageUrl" : payload.imageUrl})
      return {
        ...state,
        cartitems: addItem(state.cartitems, payload)
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cartitems: removeItem(state.cartitems, payload)
      }
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartitems: state.cartitems.filter(cartItem => cartItem.id !== payload.id)
      }
    default:
      return state;
  }
};
