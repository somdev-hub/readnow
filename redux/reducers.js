import { POST_DATA } from "./actionTypes";
import { combineReducers } from "redux";

const shouldPostData = {
  data: false
};

const shouldPostDataReducer = (state = shouldPostData, action) => {
  switch (action.type) {
    case POST_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  shouldPostDataReducer
});

export default rootReducer;
