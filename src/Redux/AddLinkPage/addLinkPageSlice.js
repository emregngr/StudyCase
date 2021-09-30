import { createSlice } from "@reduxjs/toolkit";

const addLinkPageSlice = createSlice({
  name: "addLinkPageSlice",

  initialState: {
    addLinkResult: [],
  },

  reducers: {
    addLinkSuccess: (state, action) => {
      state.addLinkResult =  [...state.addLinkResult,
       {linkName: action.payload.linkName, linkUrl: action.payload.linkUrl}];
    },

    removeLinkSuccess: (state, action) => {
      (function () {
        const temporaryAddLinkResult = state.addLinkResult;
        const filteredList = state.addLinkResult.filter(
          (addLinkResultItem) => addLinkResultItem.linkName === action.payload.linkName
        )
        state.addLinkResult = temporaryAddLinkResult.filter(item => !filteredList.includes(item))
      })()
    },

    upVoteSuccess: (state, action) => {
      state.addLinkResult =  [...state.addLinkResult,
       {linkName: action.payload.linkName, linkUrl: action.payload.linkUrl}];
    },

    downVoteSuccess: (state, action) => {
      (function () {
        const temporaryAddLinkResult = state.addLinkResult;
        temporaryAddLinkResult.splice(
          state.addLinkResult.findIndex(
            (addLinkResultItem) => addLinkResultItem.linkName === action.payload.linkName
          ),
          1
        );
        state.addLinkResult =  temporaryAddLinkResult
      })()
    },
  },
});

export const {
    addLinkSuccess,
    removeLinkSuccess,
    upVoteSuccess,
    downVoteSuccess
} = addLinkPageSlice.actions;

export default addLinkPageSlice.reducer;