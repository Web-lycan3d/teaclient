/** @format */

import axios from "axios";
import api from "../../apiUrl/api";
import { FAV, PRODUCTS, UN_FAV } from "./fav.types";
const backendUrl = api();

export const addFav = (itemData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(backendUrl + "/api/user/fav", itemData);
    dispatch({ type: FAV, payload: data.favProducts });
  } catch (error) {
    console.log(error);
  }
};

export const productsTeaWare = () => async (dispatch) => {
  try {
    const { data } = await axios.get(backendUrl + "/api/user/data");

    dispatch({
      type: PRODUCTS,
      payload: data.favProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unFav = (itemData) => async (dispatch) => {
  console.log(itemData);
  try {
    const { data } = await axios.patch(
      backendUrl + "/api/user/unfav",
      itemData
    );

    dispatch({ type: UN_FAV, payload: data.favProducts });
  } catch (error) {
    console.log(error);
  }
};
