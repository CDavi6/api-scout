// cartActions.js

import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './cartActionTypes';

export const addToCart = (productId, amount, price) => ({
  type: ADD_TO_CART,
  payload: {
    id: productId,
    amount: amount,
    price,
  },
});

export const removeFromCart = (productId, amount, price) => ({
  type: REMOVE_FROM_CART,
  payload: {
    id: productId,
    amount: amount,
    price,
  },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});