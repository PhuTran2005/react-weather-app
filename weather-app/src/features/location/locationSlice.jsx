import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

const locationSlice = createSlice({
  // counterSlice.js

  name: "location", // Tên slice (dùng trong Redux DevTools, action types,...)

  initialState: {
    data: null, // State ban đầu (có thể là object, array, số,...)
  },

  reducers: {
    setWeatherData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// 👉 Xuất action creators

// 👉 Xuất reducer chính
export default locationSlice.reducer;
