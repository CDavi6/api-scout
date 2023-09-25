// cartReducer.js

import cartInitialState from "./cartInitialState";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./cartActionTypes";

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart for ADD_TO_CART
      const existingCartItemIndexAdd = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingCartItemIndexAdd !== -1) {
        // If the item is already in the cart, update its amount for ADD_TO_CART
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndexAdd].amount += action.payload.amount;

        return {
          ...state,
          items: updatedItems,
          total: (state.total += action.payload.amount),
        };
      } else {
        // If the item is not in the cart, add it with the specified amount for ADD_TO_CART
        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload, amount: action.payload.amount }, // Set amount to the added amount
          ],
          total: (state.total += action.payload.amount),
        };
      }

    case REMOVE_FROM_CART:
      const { id, amount } = action.payload;
      const existingCartItemIndexRemove = state.items.findIndex(
        (item) => item.id === id
      );

      if (existingCartItemIndexRemove !== -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingCartItemIndexRemove];

        if (existingItem.amount >= amount) {
          // If the item quantity in the cart is greater than or equal to the specified amount, reduce the quantity
          existingItem.amount -= amount;
        }

        const updatedTotal = state.total - amount;

        return {
          ...state,
          items: updatedItems,
          total: updatedTotal,
        };
      } else {
        // If the item is not in the cart, return the current state for REMOVE_FROM_CART
        return state;
      }

    case CLEAR_CART:
      // Reset the cart to its initial state
      return {
        ...state,
        items: [],
        total: 0,
      }

    default:
      return state;
  }
};

export default cartReducer;
