/** @format */

import { TOGGLE_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM } from "./cart.types"


export const togglecartHidden = () => dispatch => {
  dispatch({ type: TOGGLE_HIDDEN })
}

export const addItemtoCart = (item) => dispatch => {
  dispatch({
    type: ADD_ITEM,
    payload: item
  })
};

export const removeItemFromCart = item => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: item
  })
}

export const clearItemFromCart = (item) => dispatch => {
  dispatch({
    type: CLEAR_ITEM_FROM_CART,
    payload: item
  })
};
