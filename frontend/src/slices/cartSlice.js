import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal', contractDetails: {} }; // Add contractDetails to initial state

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // NOTE: we don't need user, rating, numReviews or reviews
      // in the cartz
      const {
        user,
        rating,
        numReviews,
        reviews,
        ...item  // Spread the rest of the properties into item
      } = action.payload;
    
      const existItem = state.cartItems.find((x) => x._id === item._id);
    
      if (existItem) {
        // If the item already exists in the cart, update it
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartItems = [...state.cartItems, item];
      }
    
      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveContractDetails: (state, action) => {
      const { policy, startDate, endDate, theftProtection, price } = action.payload;

      // Create a new contract object based on the structure
      const contract = {
        policy,
        startDate,
        endDate,
        theftProtection,
        price, // Include the price in the contract details
      };

      // Update the contract details in the state
      state.contractDetails = contract;

      // Update the local storage, stringifying only contract details
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  saveContractDetails, // Add saveContractDetails
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
