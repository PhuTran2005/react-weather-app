// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../features/location/locationSlice";

const store = configureStore({
  reducer: {
    location: locationReducer, // key này dùng trong useSelector
  },
});

export default store;
