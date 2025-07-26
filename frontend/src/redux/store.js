import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { sellerReducer } from "./reducers/seller.js";
import { productReducer } from "./reducers/product.js";
import { eventReducer } from "./reducers/event.js";
import { cartReducer } from "./reducers/cart.js";
import wishlistReducer from "./reducers/wishlist.js";

// Load cart from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) return undefined;
    return { cart: JSON.parse(serializedState) };
  } catch (err) {
    return undefined;
  }
};

// Save cart to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem("cartState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

// Create store with loaded cart state
const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: loadState(), // load cart from localStorage
});

// Save cart to localStorage on every state change
Store.subscribe(() => {
  saveState(Store.getState());
});

export default Store;
