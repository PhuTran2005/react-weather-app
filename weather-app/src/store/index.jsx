// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../features/location/locationSlice";
import weatherReducer from "../features/Weather/weatherSlice";

const store = configureStore({
  reducer: {
    location: locationReducer, // key này dùng trong useSelector
    weather: weatherReducer,
  },
});

export default store;
