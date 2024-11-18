import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    cart: [],
  },
  reducers: {
    // Add new data in cart
    setCartData: (state, action) => {
      if(state.cart.length === 0){
        state.cart.push(action.payload);
        return;
      }
      const isItem = state.cart.some((item)=>item.id === action.payload.id);   //some() give boolean for checking item is available or not
      if(!isItem){
        state.cart.push(action.payload);
      }
    },
    // remove specific data from cart 
    removeCartData: (state, action) => {
      const removeDataID = action.payload;
      state.cart = state.cart.filter((item) => item.id !== removeDataID);
    },
    // increment cart items qwantity  
    addCartItemCount: (state, action) => {
      const id = action.payload;
      const item = state.cart.find(item => item.id === id);
    if (item) {
        item.count += 1; // Increment the qwantity
    }},
    // decrement cart item qwantity
    removeCartItemCount: (state, action) => {
      const id = action.payload;
      const item = state.cart.find(item => item.id === id);
      if(item.count <= 1){
        state.cart = state.cart.filter((item) => item.id !== id);
      }else{
        item.count -= 1 ;  //decrement the qwantity
      }},
      // clear all data from cart
      clearCartItem:(state,action)=>{
        console.log(action.payload);
        state.cart=action.payload
      }
    },
  });

export const {
  setCartData,
  removeCartData,
  addCartItemCount,
  removeCartItemCount,
  clearCartItem
} = dataSlice.actions;
export default dataSlice.reducer;