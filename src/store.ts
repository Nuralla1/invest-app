import { configureStore } from "@reduxjs/toolkit";
import cardsSliceReducer from "./features/cards/cardsSlice";

const store = configureStore({
  reducer: {
    cards: cardsSliceReducer,
  },
});

export default store;
