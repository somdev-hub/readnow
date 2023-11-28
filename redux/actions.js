import { POST_DATA } from "./actionTypes";

export const postData = (data) => ({
  type: POST_DATA,
  payload: data
});
