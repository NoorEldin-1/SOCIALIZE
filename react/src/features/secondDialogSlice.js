import { createSlice } from "@reduxjs/toolkit";

const secondDialogSlice = createSlice({
  name: "secondDialog",
  initialState: "no dialog",
  reducers: {
    showSecondDialog: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { showSecondDialog } = secondDialogSlice.actions;
export default secondDialogSlice.reducer;
