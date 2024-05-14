// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import pollsReducer from "../features/polls/pollsSlice";

export const store = configureStore({
  reducer: {
    polls: pollsReducer,
  },
});
