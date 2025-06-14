import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  // counterSlice.js

  name: "weather", // Tên slice (dùng trong Redux DevTools, action types,...)

  initialState: {
    value: null, // State ban đầu (có thể là object, array, số,...)
  },

  reducers: {
    setWeatherData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// 👉 Xuất action creators

// 👉 Xuất reducer chính
export const { setWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
