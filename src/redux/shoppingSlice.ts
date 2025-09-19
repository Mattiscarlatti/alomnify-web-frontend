import { createSlice } from "@reduxjs/toolkit";
import { Flora } from "../../type";

interface StoreState {
  floraData: Flora[];
}

const initialState: StoreState = {
  floraData: [],
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingPlant = state.floraData.find(
        (item: Flora) => item._id === action.payload._id
      );
      if (existingPlant) {
      } else {
        state.floraData.push(action.payload);
      }
    },
    deletePlant: (state, action) => {
      state.floraData = state.floraData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.floraData = [];
    },
  },
});

export const {
  addToCart,
  deletePlant,
  resetCart,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;