import cartInitialState from "./cartInitialState";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./cartActionTypes";

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingCartItemIndexAdd = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingCartItemIndexAdd !== -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingCartItemIndexAdd];
        existingItem.amount += action.payload.amount;

        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.amount,
          price: state.price + action.payload.price * action.payload.amount,
        };
      } else {
        const newItem = {
          id: action.payload.id,
          title: action.payload.title,
          category: action.payload.category,
          price: action.payload.price,
          image: action.payload.image,
          amount: action.payload.amount,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + action.payload.amount,
          price: state.price + action.payload.price * action.payload.amount,
        };
      }

    case REMOVE_FROM_CART:
      const existingCartItemIndexRemove = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingCartItemIndexRemove !== -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingCartItemIndexRemove];
        existingItem.amount -= action.payload.amount;

        return {
          ...state,
          items: updatedItems,
          total: state.total - action.payload.amount,
          price: state.price - action.payload.price * action.payload.amount,
        };
      } else {
        return state;
      }

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        price: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
