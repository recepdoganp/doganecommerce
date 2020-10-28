// import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addCart = (id, qty) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/products/${id}`);

  const data = getState().productDetails.product;
  console.log(data);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    },
  });

  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartItems));
};
