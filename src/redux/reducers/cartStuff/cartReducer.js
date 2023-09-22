// cartReducer.js

import cartInitialState from './cartInitialState';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './cartActionTypes';

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingCartItemIndex !== -1) {
        // If the item is already in the cart, update its amount
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex].amount += action.payload.amount;

        return {
          ...state,
          items: updatedItems,
          total: state.total + (action.payload.price * action.payload.amount),
        };
      } else {
        // If the item is not in the cart, add it with the specified amount
        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload, amount: action.payload.amount }, // Set amount to the added amount
          ],
          total: state.total + (action.payload.price * action.payload.amount),
        };
      }

    case REMOVE_FROM_CART:
      // Find the item to remove
      const itemToRemoveIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (itemToRemoveIndex !== -1) {
        const itemToRemove = state.items[itemToRemoveIndex];

        // If the item is found, decrease its amount or remove it if the amount is 1
        if (itemToRemove.amount === 1) {
          return {
            ...state,
            items: [
              ...state.items.slice(0, itemToRemoveIndex),
              ...state.items.slice(itemToRemoveIndex + 1),
            ],
            total: state.total - (itemToRemove.price * itemToRemove.amount),
          };
        } else {
          const updatedItems = [...state.items];
          updatedItems[itemToRemoveIndex].amount -= 1;

          return {
            ...state,
            items: updatedItems,
            total: state.total - itemToRemove.price,
          };
        }
      }
      return state;

    case CLEAR_CART:
      // Reset the cart to its initial state
      return cartInitialState;

    default:
      return state;
  }
};

export default cartReducer;
