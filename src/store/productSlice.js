import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = StatusCode.SUCCESS;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = StatusCode.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { fetchProducts } = productSlice.actions;

export default productSlice.reducer;

export const getProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  }
);

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const res = await fetch("https://fakestoreapi.com/products");
//     const data = await res.json();
//     dispatch(fetchProducts(data));
//     console.log(getState())
//   };
// }

export const getAllProducts = (state) => state.product;
