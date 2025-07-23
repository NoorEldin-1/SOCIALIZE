import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dialogReducer from "./features/dialogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
  },
});
