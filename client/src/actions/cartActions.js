import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { getProduct } from "../services/services.js";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const data = await getProduct(id);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
