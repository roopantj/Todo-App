import { createSlice } from "@reduxjs/toolkit";

const initialState = { uid: null };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUID(state, action) {
      state.uid = action.payload;
    },
    clearUID(state) {
      state.uid = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
