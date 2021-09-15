/** @format */
import { FAV, PRODUCTS, UN_FAV } from "./fav.types";
const initialState = {
  fav: null,
};
export const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAV:
      return { ...state, fav: action.payload };
    case PRODUCTS:
      return { ...state, fav: action.payload };
    case UN_FAV:
      return { ...state, fav: action.payload };
    default:
      return state;
  }
};
