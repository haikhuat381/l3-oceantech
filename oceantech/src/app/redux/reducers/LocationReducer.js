import { ActionTypes } from "../actions/actionTypes";

const initialState = { location: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LIST_LOCATION: {
      return { ...state };
    }
    case ActionTypes.GET_LIST_LOCATION_SUCCESS: {
      return { ...state, location: action.payload };
    }

    default:
      return state;
  }
};
