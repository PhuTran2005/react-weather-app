import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  // counterSlice.js

  name: "location", // Tên slice (dùng trong Redux DevTools, action types,...)

  initialState: {
    value: null, // State ban đầu (có thể là object, array, số,...)
  },

  reducers: {},
});

// 👉 Xuất action creators

// 👉 Xuất reducer chính
export default locationSlice.reducer;
