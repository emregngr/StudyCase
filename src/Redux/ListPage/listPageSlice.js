import { createSlice } from "@reduxjs/toolkit";

const listPageSlice = createSlice({
  name: "listPageSlice",

  initialState: {
    listResult: [],
  },

  reducers: {
    listSuccess: (state, action) => {
      state.listResult = action.payload;
    },
  },
});

export const {
    listSuccess,
} =  listPageSlice.actions;

export default  listPageSlice.reducer;