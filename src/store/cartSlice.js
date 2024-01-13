import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // complete style
    addCart: {
      reducer(state, action) {
        // payload = product object
        state.cart.push(action.payload);
      },
    },

    // simplified style
    removeCart(state, action) {
      // payload = productId
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    addQuantity(state, action) {
      // payload = productId
      const item = state.cart.find((item) => item.id === action.payload);
      console.log(state.cart.item);
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },

    minusQuantity(state, action) {
      // payload = productId
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.price;

      if (item.quantity === 0) {
        cartSlice.caseReducers.removeCart(state, action);
      }
    },
  },
});

export default cartSlice.reducer;

export const { addCart, removeCart, addQuantity, minusQuantity } =
  cartSlice.actions;

export const selectCart = (state) => state.cart;

export const totalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, curr) => {
    return sum + curr.quantity;
  }, 0);

export const totalCartPrice = (state) => {
  // 注意这个return要写，上面是会因为没加{}
  return state.cart.cart
    .reduce((sum, curr) => {
      return sum + curr.totalPrice;
    }, 0)
    .toFixed(2);
};

export const getCurrQuantityById = (id) => (state) => {
  return state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
};
