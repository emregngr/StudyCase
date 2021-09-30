import {
    addLinkSuccess,
    removeLinkSuccess,
    upVoteSuccess,
    downVoteSuccess
  } from "./addLinkPageSlice";
  
  export const addLink = (item, notify) => {
    return dispatch => {
      dispatch(addLinkSuccess(item));
      notify()
    };
  };

  export const removeLink = (item, notify) => {
    return dispatch => {
      dispatch(removeLinkSuccess(item));
      notify()
    };
  };

  export const upVote = (item) => {
    return dispatch => {
      dispatch(upVoteSuccess(item));
    };
  };

  export const downVote = (item) => {
    return dispatch => {
      dispatch(downVoteSuccess(item));
    };
  };