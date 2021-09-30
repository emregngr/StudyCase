import { configureStore } from "@reduxjs/toolkit";
import addLinkPageReducer from "../Redux/AddLinkPage/addLinkPageSlice";
import listPageReducer from "../Redux/ListPage/listPageSlice";

export default configureStore({
  reducer: {
    addLinkPage: addLinkPageReducer,
    listPage: listPageReducer,
  },
});