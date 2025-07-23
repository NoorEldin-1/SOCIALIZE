import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: "no dialog",
  reducers: {
    showDialog: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { showDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
