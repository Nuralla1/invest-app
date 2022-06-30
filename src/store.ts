import { configureStore } from "@reduxjs/toolkit";
import cardsSliceReducer from "./features/cards/cardsSlice";

const store = configureStore({
  reducer: {
    cards: cardsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["cards/fetchChartInfo.fulfilled"],
        ignoredActionPaths: ["payload.prices"],
        ignoredPaths: ["cards.chartInfo"],
        ignoreActions: false,
      },
    }),
});

export default store;
