import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dialogReducer from "./features/dialogSlice";
import secondDialogReducer from "./features/secondDialogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    secondDialog: secondDialogReducer,
  },
});
