import { ActionTypes } from "../actions/actionTypes";

const initialState = { otherFeature: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_OTHER_FEATURE: {
      return { ...state };
    }
    case ActionTypes.GET_OTHER_FEATURE_SUCCESS: {
      return { ...state, otherFeature: action.payload };
    }

    default:
      return state;
  }
};
