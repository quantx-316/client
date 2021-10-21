import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/actionTypes";
import { MessageActionTypes } from "../actions/actionTypes";

const initialState = {};

export default function (state = initialState, action: MessageActionTypes) {

  switch (action.type) {
    case SET_MESSAGE:
      return { message: action.payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}