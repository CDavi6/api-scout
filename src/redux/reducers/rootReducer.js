import { combineReducers } from "redux";
import cartReducer from "./cartStuff/cartReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
});

export default rootReducer;